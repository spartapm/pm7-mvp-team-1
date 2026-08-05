import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/goods/${product.id}`} className="group block">
      <div className="relative mb-2.5 aspect-square overflow-hidden rounded-lg bg-[var(--ph)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          loading="eager"
          decoding="sync"
          className="h-full w-full object-cover transition group-hover:brightness-[0.98]"
        />
      </div>
      <p className="mb-0.5 text-xs text-[var(--ink-faint)]">{product.brand}</p>
      <p className="mb-1.5 line-clamp-2 min-h-[37px] text-[13.5px] leading-snug text-[var(--ink)]">
        {product.name}
      </p>
      <p className="text-base font-extrabold tabular-nums">
        {product.discountPercent ? (
          <span className="mr-1.5 text-[var(--red)]">{product.discountPercent}%</span>
        ) : null}
        {formatPrice(product.price)}원
      </p>
    </Link>
  );
}
