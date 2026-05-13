// Inline GLSL for the hero flow-field shader.
// TODO(debt): migrate to `shaders/*.glsl` files with Turbopack `?raw` imports
// once the loader path is verified. Tracked in BACKLOG.md.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;

  varying vec2 vUv;

  // Simplex 2D noise — Ashima Arts, MIT license.
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
     -0.577350269189626,
      0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                       + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // Cursor warp: pull the field gently toward the cursor.
    vec2 mouse = uMouse * 0.5 * vec2(aspect, 1.0);
    float mouseDist = length(p - mouse);
    float warpAmt = exp(-mouseDist * 3.0) * 0.14;
    p -= (p - mouse) * warpAmt;

    // Slow time drift.
    float t = uTime * 0.06;

    // Layered noise (flow field).
    float n1 = snoise(p * 1.8 + vec2(t, t * 0.7));
    float n2 = snoise(p * 4.2 - vec2(t * 1.3, t * 0.4));
    float n3 = snoise(p * 9.5 + vec2(t * 0.5, -t * 0.8));
    float field = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;
    float fieldN = field * 0.5 + 0.5;

    // Brand palette.
    vec3 canvas   = vec3(0.027, 0.043, 0.078); // #070B14
    vec3 deepTeal = vec3(0.020, 0.345, 0.408); // mid-tone toward accent-deep
    vec3 accent   = vec3(0.031, 0.851, 0.839); // #08D9D6
    vec3 hot      = vec3(0.216, 0.953, 1.000); // #37F3FF

    vec3 col = canvas;
    col = mix(col, deepTeal, smoothstep(0.40, 0.85, fieldN));
    col = mix(col, accent,   smoothstep(0.65, 0.95, fieldN) * 0.55);
    col = mix(col, hot,      smoothstep(0.85, 1.00, fieldN) * 0.30);

    // Soft glow toward bottom-center.
    float glow = 1.0 - smoothstep(0.0, 0.6, distance(uv, vec2(0.5, 0.12)));
    col += accent * glow * 0.08;

    // Vignette.
    float vig = smoothstep(1.05, 0.40, distance(uv, vec2(0.5)));
    col *= vig * 0.94 + 0.06;

    // Structural dot-grid overlay — evokes block structure beneath the field.
    vec2 cell = fract(uv * vec2(aspect, 1.0) * 60.0) - 0.5;
    float dotMask = 1.0 - smoothstep(0.02, 0.07, length(cell));
    col += accent * dotMask * 0.05;

    // Subtle grain.
    float grain = snoise(uv * 800.0 + t * 10.0) * 0.015;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;
