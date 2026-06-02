"use client";
import { motion } from "motion/react";
import { products } from "@/content/workflow/products";
import { phases } from "@/content/workflow/phases";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useWorkflowPlatform } from "@/hooks/use-workflow-platform";
import { useWorkflowProduct } from "@/hooks/use-workflow-product";
import type { WorkflowProduct } from "@/types/workflow";
import { ChapterConceptualize } from "./chapter-conceptualize";
import { ChapterDevelop } from "./chapter-develop";
import { ChapterEnvironment } from "./chapter-environment";
import { ChapterShip } from "./chapter-ship";
import { ChapterSpec } from "./chapter-spec";
import { PhaseChapter } from "./phase-chapter";
import { PlatformTabs } from "./platform-tabs";
import { ProductTabs } from "./product-tabs";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function Workflow() {
  const [product, setProduct] = useWorkflowProduct("brief");
  const productMeta = products[product];
  const [platform, setPlatform] = useWorkflowPlatform(productMeta.defaultPlatform);
  const reduced = useReducedMotion();
  const activePhases = phases[product];

  return (
    <div className="relative">
      {/* Sticky product + platform bar under the global nav. Mobile collapses
          the labels to keep the bar slim; desktop keeps the label/control pair. */}
      <div className="sticky top-[64px] z-30 -mx-6 border-y border-white/[0.06] bg-[var(--color-canvas)]/85 px-6 py-2 backdrop-blur-xl sm:py-3">
        <div className="container-site flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center gap-3 sm:justify-between">
            <p className="hidden font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase sm:block">
              Sample product
            </p>
            <div className="no-scrollbar -mx-2 flex min-w-0 flex-1 overflow-x-auto px-2 sm:flex-initial">
              <ProductTabs product={product} onChange={setProduct} />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:justify-between">
            <p className="hidden font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase sm:block">
              Building for
            </p>
            <div className="no-scrollbar -mx-2 flex min-w-0 flex-1 overflow-x-auto px-2 sm:flex-initial">
              <PlatformTabs platform={platform} onChange={setPlatform} />
            </div>
          </div>
        </div>
      </div>

      {/* Screen-reader summary mirroring the visual chapters for the active product. */}
      <ol className="sr-only">
        {activePhases.map((p) => (
          <li key={p.id}>
            <strong>
              Phase {p.number}: {p.title}
            </strong>{" "}
            {p.summary}
          </li>
        ))}
      </ol>

      <motion.section
        key={product}
        className="px-6 py-32 sm:py-40"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-eyebrow" style={{ color: productMeta.accentColor }}>
            {"// How we ship"}
          </p>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl">
            <span className="text-display text-[var(--color-ink)]">Idea</span>
            <span className="text-[var(--color-ink-dim)]"> → </span>
            <span className="text-display text-[var(--color-ink)]">spec</span>
            <span className="text-[var(--color-ink-dim)]"> → </span>
            <span className="text-display" style={{ color: productMeta.accentColor }}>
              shipped.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[var(--color-ink-dim)] sm:text-lg">
            Five phases of our vibecoding workflow, threaded through{" "}
            <span className="text-[var(--color-ink)]">{productMeta.name}</span> —{" "}
            {productMeta.tagline.replace(/\.$/, "")}. Toggle the product tab to compare workflows
            across three sample products; toggle the platform tab to see how each phase shifts when
            we build for the web, Android, Windows, or iOS.
          </p>
        </div>
      </motion.section>

      {activePhases.map((phase, i) => (
        <PhaseChapter
          key={`${product}-${phase.id}`}
          phase={phase}
          platform={platform}
          index={i}
          scene={renderScene(phase.id, product, platform, phase.platformNotes[platform])}
        />
      ))}
    </div>
  );
}

function renderScene(
  phaseId: string,
  product: WorkflowProduct,
  platform: string,
  note: { title: string; body: string },
) {
  switch (phaseId) {
    case "conceptualize":
      return <ChapterConceptualize product={product} />;
    case "spec":
      return <ChapterSpec product={product} />;
    case "environment":
      return <ChapterEnvironment note={note} platformKey={platform} />;
    case "develop":
      return <ChapterDevelop />;
    case "ship":
      return <ChapterShip />;
    default:
      return null;
  }
}
