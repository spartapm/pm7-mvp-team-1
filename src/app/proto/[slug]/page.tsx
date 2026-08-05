import { notFound } from "next/navigation";
import { StubShell } from "@/components/StubShell";
import { STUB_PAGES } from "@/lib/stubs";

const NAV_BY_SLUG: Record<string, string> = {
  home: "쇼핑홈",
  best: "베스트",
  deal: "오늘의딜",
  exclusive: "단독상품",
  omart: "오마트",
  delivery: "원하는날도착",
  showroom: "오!쇼룸",
  exhibition: "기획전",
};

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(STUB_PAGES).map((slug) => ({ slug }));
}

export default function ProtoPage({ params }: PageProps) {
  const page = STUB_PAGES[params.slug];
  if (!page) notFound();
  return <StubShell page={page} activeNav={NAV_BY_SLUG[params.slug]} />;
}
