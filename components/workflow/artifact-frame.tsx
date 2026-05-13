import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlowOrb } from "@/components/effects/glow-orb";
import { ARTIFACT_TYPE_LABELS, type ArtifactMeta } from "@/content/workflow/artifacts";
import { products } from "@/content/workflow/products";

interface Props {
  artifact: ArtifactMeta;
  children: React.ReactNode;
}

export function ArtifactFrame({ artifact, children }: Readonly<Props>) {
  const product = products[artifact.product];
  return (
    <div className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-40">
      <GlowOrb
        className="-top-24 left-1/2 -translate-x-1/2"
        size={680}
        color={product.accentColor}
        opacity={0.07}
      />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href={`/workflow#product=${artifact.product}`}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase transition-colors hover:text-[var(--color-ink)]"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to workflow
        </Link>

        <header className="mt-10">
          <p className="text-eyebrow" style={{ color: product.accentColor }}>
            {product.name} · {ARTIFACT_TYPE_LABELS[artifact.type]}
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl">
            <span className="text-display text-[var(--color-ink)]">{artifact.title}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--color-ink-dim)] sm:text-lg">
            {artifact.description}
          </p>
        </header>

        <article className="mt-12 rounded-3xl bg-white/[0.03] p-8 ring-1 ring-white/[0.06] ring-inset sm:p-12">
          {children}
        </article>
      </div>
    </div>
  );
}
