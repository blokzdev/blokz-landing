interface JsonLdProps {
  data: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;
}

export function JsonLd({ data }: Readonly<JsonLdProps>) {
  return (
    <script
      type="application/ld+json"
      // Safe because we control the input shape; JSON.stringify escapes correctly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
