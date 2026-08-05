import Link from "next/link";
import type { Product } from "@/lib/types";
import { PRODUCTS, formatPrice } from "@/lib/products";

const FAKE_REVIEWS = [
  {
    user: "자취러오늘",
    stars: 5,
    date: "2026.06.12",
    text: "사이즈 찾기 편해서 골랐어요. 원룸에 딱 맞습니다.",
  },
  {
    user: "신혼집준비중",
    stars: 4,
    date: "2026.05.28",
    text: "조립은 조금 손봤지만 마감이 깔끔해요. 배송도 빨랐습니다.",
  },
  {
    user: "가구고르는중",
    stars: 5,
    date: "2026.04.03",
    text: "색상 옵션이 사진이랑 비슷해서 만족. 추천합니다.",
  },
];

export function ExtraSections({ product }: { product: Product }) {
  const recommends = PRODUCTS.filter(
    (p) => p.subCategory === product.subCategory && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <section id="sec-review" className="mt-10 scroll-mt-[70px] border-t border-[var(--line)] pt-6">
        <h3 className="mb-1 text-[15px] font-extrabold">리뷰</h3>
        <p className="mb-4 text-[12.5px] text-[var(--ink-faint)]">
          ★ {product.rating.toFixed(1)} · {product.reviewCount.toLocaleString("ko-KR")}개 · 프로토타입
          샘플
        </p>
        <div className="space-y-0">
          {FAKE_REVIEWS.map((r) => (
            <article key={r.user} className="border-t border-[var(--line)] py-3.5 first:border-t-0">
              <div className="mb-1.5 flex items-center gap-2 text-[12.5px] text-[var(--ink-soft)]">
                <span className="tracking-wide text-[#ffb400]">{"★".repeat(r.stars)}</span>
                <b className="text-[var(--ink)]">{r.user}</b>
                <span className="ml-auto text-[var(--ink-faint)]">{r.date}</span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-[var(--ink)]">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sec-inquiry" className="mt-10 scroll-mt-[70px] border-t border-[var(--line)] pt-6">
        <h3 className="mb-3 text-[15px] font-extrabold">문의</h3>
        <div className="space-y-3">
          {[
            ["Q. 매트리스 따로 사야 하나요?", "A. 프레임 단독 구성입니다. 매트리스는 별도 구매해 주세요."],
            ["Q. 설치비 포함인가요?", "A. 기본배송은 무료이고, 설치는 별도 30,000원입니다."],
            ["Q. 킹 사이즈 재고 있나요?", "A. 옵션 선택 화면에서 확인 가능합니다. (프로토타입)"],
          ].map(([q, a]) => (
            <div key={q} className="rounded-lg border border-[var(--line-2)] px-4 py-3">
              <p className="mb-1 text-[13.5px] font-bold">{q}</p>
              <p className="text-[13px] text-[var(--ink-soft)]">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sec-shipping" className="mt-10 scroll-mt-[70px] border-t border-[var(--line)] pt-6">
        <h3 className="mb-3 text-[15px] font-extrabold">배송·환불</h3>
        <div className="overflow-hidden rounded-[10px] border border-[var(--line-2)] text-[13px]">
          {[
            ["배송", "기본배송 무료 · 희망일 배송 가능(지역별 상이)"],
            ["설치", "유료 설치 30,000원 · 기사 방문 일정 협의"],
            ["교환/환불", "제품 하자 시 7일 이내 교환·환불 가능"],
            ["주의", "조립·사용 흔적이 있으면 단순 변심 환불이 어려울 수 있어요"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[120px_1fr] border-t border-[var(--line)] first:border-t-0"
            >
              <div className="bg-[#fafbfc] px-3.5 py-3 font-semibold text-[var(--ink-soft)]">{k}</div>
              <div className="px-3.5 py-3 text-[var(--ink)]">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="sec-recommend" className="mt-10 scroll-mt-[70px] border-t border-[var(--line)] pt-6">
        <h3 className="mb-3 text-[15px] font-extrabold">함께 보면 좋은 상품</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {recommends.map((p) => (
            <Link key={p.id} href={`/goods/${p.id}`} className="group block">
              <div className="mb-2 aspect-square overflow-hidden rounded-lg bg-[var(--ph)] group-hover:brightness-[0.98]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnailUrl}
                  alt={p.name}
                  loading="eager"
                  decoding="sync"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xs text-[var(--ink-faint)]">{p.brand}</p>
              <p className="line-clamp-2 min-h-[36px] text-[13px] leading-snug">{p.name}</p>
              <p className="mt-1 text-[15px] font-extrabold tabular-nums">
                {formatPrice(p.price)}원
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
