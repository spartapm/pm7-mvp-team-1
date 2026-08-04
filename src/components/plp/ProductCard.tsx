import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/goods/${product.id}`} className="group block">
      <div className="relative mb-2.5 aspect-square overflow-hidden rounded-lg bg-[var(--ph)]">
        <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(-45deg,transparent_0_11px,rgba(0,0,0,.03)_11px_22px)] text-xs text-[var(--ink-faint)] transition group-hover:brightness-[0.98]">
          {product.thumbnailLabel}
        </div>
      </div>
      <p className="mb-0.5 text-xs text-[var(--ink-faint)]">{product.brand}</p>
      <p className="mb-1.5 line-clamp-2 min-h-[37px] text-[13.5px] leading-snug text-[var(--ink)]">
        {product.name}
      </p>
      <p className="text-base font-extrabold tabular-nums">{formatPrice(product.price)}원</p>
    </Link>
  );
}
