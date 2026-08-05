import Link from "next/link";
import { Header } from "@/components/Header";
import { categoryHref } from "@/lib/categories";
import type { StubPage } from "@/lib/stubs";

export function StubShell({
  page,
  activeNav,
}: {
  page: StubPage;
  activeNav?: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="mx-auto min-h-screen max-w-[1256px] bg-white shadow-[0_0_0_1px_var(--line)]">
        <Header activeNav={activeNav} />
        <main className="px-7 py-10">
          <p className="mb-2 text-[12.5px] font-extrabold text-[var(--blue)]">프로토타입</p>
          <h1 className="mb-3 text-[28px] font-extrabold tracking-tight">{page.title}</h1>
          <p className="mb-6 max-w-[560px] text-[15px] leading-relaxed text-[var(--ink-soft)]">
            {page.description}
          </p>
          {page.bullets?.length ? (
            <ul className="mb-8 list-disc space-y-1.5 pl-5 text-[13.5px] text-[var(--ink-soft)]">
              {page.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-[var(--ph-line)] bg-[var(--ph)] text-xs text-[var(--ink-faint)]"
              >
                {page.title} 카드 {i}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={categoryHref("침대프레임")}
              className="rounded-lg bg-[var(--blue)] px-4 py-2.5 text-[13.5px] font-extrabold text-white"
            >
              카테고리로 가기
            </Link>
            <Link
              href="/goods/2352818"
              className="rounded-lg border border-[var(--line-2)] px-4 py-2.5 text-[13.5px] font-bold text-[var(--ink-soft)]"
            >
              샘플 상품 보기
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
