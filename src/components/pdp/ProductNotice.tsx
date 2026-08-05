import type { Product, ProductInfoDisclosureItem } from "@/lib/types";

function NoticeRow({ item }: { item: ProductInfoDisclosureItem }) {
  const isAi = item.source === "image";
  const displayValue =
    item.value === null || item.value === undefined || item.value === ""
      ? "해당사항없음"
      : item.value;
  const showOriginal =
    isAi &&
    item.originalText &&
    item.originalText !== item.value;

  return (
    <div className="grid grid-cols-[180px_1fr] border-t border-[var(--line)] text-[12.5px] first:border-t-0">
      <div className="flex items-center gap-1.5 border-r border-[var(--line)] bg-[#fafbfc] px-3.5 py-3 text-[var(--ink-soft)]">
        <span>{item.itemName}</span>
        {isAi ? (
          <span className="inline-flex items-center rounded bg-[var(--blue)] px-1.5 py-px text-[9.5px] font-extrabold tracking-wide text-white">
            AI 추출
          </span>
        ) : null}
      </div>
      <div className="px-3.5 py-3">
        <span>{displayValue}</span>
        {showOriginal ? (
          <span className="mt-1 block text-[11px] text-[var(--ink-faint)]">
            셀러 원본: {item.originalText}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function ProductNotice({ product }: { product: Product }) {
  const hasAi = product.productInfoDisclosure.some((i) => i.source === "image");

  return (
    <section id="sec-notice" className="scroll-mt-[120px]">
      <h3 className="mb-3 text-[15px] font-extrabold">상품정보고시</h3>
      <div className="overflow-hidden rounded-[10px] border border-[var(--line-2)]">
        {product.productInfoDisclosure.map((item) => (
          <NoticeRow key={item.itemName} item={item} />
        ))}
        {hasAi ? (
          <div className="border-t border-[var(--blue-line)] bg-[var(--blue-soft)] px-3.5 py-2.5 text-[11.5px] leading-relaxed text-[#0b63c4]">
            셀러가 입력하지 않은 항목으로, 이미지에서 AI가 추출한 정보입니다. 실제와 다를 수 있으니
            상세페이지를 함께 확인해 주세요.
          </div>
        ) : null}
      </div>
    </section>
  );
}
