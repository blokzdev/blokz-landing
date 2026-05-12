export function BuildTunnelFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(8, 217, 214, 0.18) 0%, transparent 60%)",
      }}
    >
      <svg
        viewBox="0 0 320 120"
        className="w-full max-w-md opacity-70"
        fill="none"
        stroke="currentColor"
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const x = 30 + i * 65;
          const opacity = 0.4 + (i / 4) * 0.55;
          return (
            <g key={i} style={{ color: `rgba(8, 217, 214, ${opacity})` }}>
              <ellipse cx={x} cy={60} rx={28} ry={36} strokeWidth={1.2} />
              <ellipse cx={x} cy={60} rx={18} ry={24} strokeWidth={0.8} opacity={0.6} />
            </g>
          );
        })}
        <line
          x1={28}
          y1={60}
          x2={290}
          y2={60}
          strokeWidth={0.5}
          stroke="rgba(8, 217, 214, 0.3)"
          strokeDasharray="3 4"
        />
      </svg>
    </div>
  );
}
