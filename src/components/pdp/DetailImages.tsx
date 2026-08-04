import type { Product } from "@/lib/types";

const PALETTE = [
  "#e8f1fb",
  "#f3eee6",
  "#ece8f5",
  "#e7f3ea",
  "#f7ebe8",
  "#e9eef5",
];

export function DetailImages({ product }: { product: Product }) {
  return (
    <div className="space-y-3.5">
      {product.detailImages.map((img, idx) => (
        <div
          key={img.file}
          data-detail-file={img.file}
          className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-[var(--ph-line)] text-[13px] text-[var(--ink-soft)]"
          style={{
            height: img.height,
            background: `repeating-linear-gradient(-45deg, transparent 0 11px, rgba(0,0,0,.03) 11px 22px), ${PALETTE[idx % PALETTE.length]}`,
          }}
        >
          <div className="rounded-md bg-white/80 px-3 py-2 text-center shadow-sm">
            <div className="text-xs text-[var(--ink-faint)]">{img.file}</div>
            <div className="mt-1 font-semibold text-[var(--ink)]">{img.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
