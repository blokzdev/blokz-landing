"use client";
import { AnimatePresence, motion } from "motion/react";
import type { PlatformNote } from "@/types/workflow";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface Props {
  note: PlatformNote;
  platformKey: string;
}

/** Parse the "·"-separated command list out of the platform note body. */
function parseCommands(body: string): ReadonlyArray<string> {
  return body
    .split(/[·•]/)
    .map((c) => c.trim().replace(/\.$/, ""))
    .filter((c) => c.length > 0);
}

export function ChapterEnvironment({ note, platformKey }: Readonly<Props>) {
  const reduced = useReducedMotion();
  const commands = parseCommands(note.body);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#050811] shadow-2xl ring-1 ring-white/[0.08] ring-inset">
      <header className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <p className="ml-2 font-mono text-[10px] tracking-[0.16em] text-[var(--color-ink-dim)] uppercase">
          ~/blokz-receipt · zsh
        </p>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ol
          key={platformKey}
          className="flex flex-col gap-2.5 px-5 py-5 font-mono text-xs leading-relaxed"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
        >
          {commands.map((cmd, i) => (
            <motion.li
              key={`${platformKey}-${i}`}
              className="flex items-start gap-2.5"
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                ease: EASE_OUT_EXPO,
                delay: reduced ? 0 : i * 0.08,
              }}
            >
              <span aria-hidden className="text-[var(--color-accent)] select-none">
                ${" "}
              </span>
              <span className="text-[var(--color-ink)]">{cmd}</span>
            </motion.li>
          ))}
          <motion.li
            className="flex items-center gap-2.5"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : commands.length * 0.08 + 0.15 }}
          >
            <span aria-hidden className="text-[var(--color-accent)]">
              ${" "}
            </span>
            <span
              aria-hidden
              className="inline-block h-3.5 w-1.5 bg-[var(--color-accent)] motion-safe:animate-pulse"
            />
          </motion.li>
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}
