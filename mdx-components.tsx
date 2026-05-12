import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children, ...rest }) => (
      <h1
        className="text-display mt-12 mb-6 text-4xl text-[var(--color-ink)]"
        {...(rest as HTMLAttributes<HTMLHeadingElement>)}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...rest }) => (
      <h2
        className="text-display mt-12 mb-4 text-2xl text-[var(--color-ink)]"
        {...(rest as HTMLAttributes<HTMLHeadingElement>)}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...rest }) => (
      <h3
        className="mt-8 mb-3 font-mono text-[11px] tracking-[0.16em] text-[var(--color-accent)] uppercase"
        {...(rest as HTMLAttributes<HTMLHeadingElement>)}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...rest }) => (
      <h4
        className="mt-6 mb-2 text-base font-medium text-[var(--color-ink)]"
        {...(rest as HTMLAttributes<HTMLHeadingElement>)}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...rest }) => (
      <p
        className="my-4 text-base leading-relaxed text-[var(--color-ink-dim)]"
        {...(rest as HTMLAttributes<HTMLParagraphElement>)}
      >
        {children}
      </p>
    ),
    a: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isInternal = typeof href === "string" && href.startsWith("/");
      const className =
        "text-[var(--color-accent)] underline underline-offset-4 transition-colors hover:text-[var(--color-accent-hot)]";
      if (isInternal && href) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={className} {...rest}>
          {children}
        </a>
      );
    },
    ul: ({ children, ...rest }) => (
      <ul
        className="my-4 list-disc space-y-1.5 pl-6 text-[var(--color-ink-dim)] marker:text-[var(--color-accent)]/40"
        {...(rest as HTMLAttributes<HTMLUListElement>)}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...rest }) => (
      <ol
        className="my-4 list-decimal space-y-1.5 pl-6 text-[var(--color-ink-dim)] marker:font-mono marker:text-[var(--color-accent)]/60"
        {...(rest as HTMLAttributes<HTMLOListElement>)}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...rest }) => (
      <li className="leading-relaxed" {...(rest as HTMLAttributes<HTMLLIElement>)}>
        {children}
      </li>
    ),
    code: ({ children, ...rest }) => (
      <code
        className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--color-accent)]"
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...rest }) => (
      <pre
        className="my-6 overflow-x-auto rounded-2xl bg-[#050811] p-5 font-mono text-xs leading-relaxed ring-1 ring-white/[0.08] ring-inset"
        {...(rest as HTMLAttributes<HTMLPreElement>)}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...rest }) => (
      <blockquote
        className="my-6 border-l-2 border-[var(--color-accent)] pl-4 text-[var(--color-ink)] italic"
        {...(rest as HTMLAttributes<HTMLQuoteElement>)}
      >
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-12 border-white/[0.08]" />,
    table: ({ children, ...rest }) => (
      <div className="my-6 overflow-x-auto rounded-2xl ring-1 ring-white/[0.06] ring-inset">
        <table
          className="w-full border-collapse text-sm"
          {...(rest as HTMLAttributes<HTMLTableElement>)}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...rest }) => (
      <th
        className="border-b border-white/[0.08] bg-white/[0.03] px-4 py-2 text-left font-mono text-[10px] tracking-[0.08em] text-[var(--color-ink-dim)] uppercase"
        {...(rest as HTMLAttributes<HTMLTableCellElement>)}
      >
        {children}
      </th>
    ),
    td: ({ children, ...rest }) => (
      <td
        className="border-b border-white/[0.04] px-4 py-2 align-top text-sm text-[var(--color-ink-dim)]"
        {...(rest as HTMLAttributes<HTMLTableCellElement>)}
      >
        {children}
      </td>
    ),
    strong: ({ children, ...rest }) => (
      <strong
        className="font-medium text-[var(--color-ink)]"
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        {children}
      </strong>
    ),
  };
}
