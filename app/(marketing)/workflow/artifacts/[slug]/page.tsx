import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtifactFrame } from "@/components/workflow/artifact-frame";
import { artifacts, getArtifact, loadArtifact } from "@/content/workflow/artifacts";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return artifacts.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artifact = getArtifact(slug);
  if (!artifact) {
    return buildMetadata({ title: "Not found", path: `/workflow/artifacts/${slug}` });
  }
  return buildMetadata({
    title: artifact.title,
    description: artifact.description,
    path: `/workflow/artifacts/${artifact.slug}`,
  });
}

export default async function ArtifactPage({ params }: PageProps) {
  const { slug } = await params;
  const artifact = getArtifact(slug);
  if (!artifact) notFound();
  const Content = await loadArtifact(slug);
  if (!Content) notFound();

  return (
    <ArtifactFrame artifact={artifact}>
      <Content />
    </ArtifactFrame>
  );
}
