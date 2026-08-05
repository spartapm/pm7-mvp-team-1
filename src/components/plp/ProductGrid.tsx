"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/plp/ProductCard";

const SORTS = ["인기순", "낮은가격순", "높은가격순", "최신순"] as const;

export function ProductGrid({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) {
  const [sort, setSort] = useState<(typeof SORTS)[number]>("인기순");
  const [open, setOpen] = useState(false);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "낮은가격순") list.sort((a, b) => a.price - b.price);
    else if (sort === "높은가격순") list.sort((a, b) => b.price - a.price);
    else if (sort === "최신순") list.reverse();
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        {title ? <h1 className="text-xl font-extrabold">{title}</h1> : <div />}
        <div className="relative">
          <button
            type="button"
            className="rounded-lg border border-[var(--line-2)] px-3 py-1.5 text-[12.5px] text-[var(--ink-soft)]"
            onClick={() => setOpen((v) => !v)}
          >
            {sort} ▾
          </button>
          {open ? (
            <div className="absolute right-0 top-[calc(100%+6px)] z-20 min-w-[120px] overflow-hidden rounded-lg border border-[var(--line-2)] bg-white shadow-lg">
              {SORTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`block w-full px-3 py-2 text-left text-[12.5px] hover:bg-[var(--paper)] ${
                    s === sort ? "font-bold text-[var(--blue)]" : "text-[var(--ink-soft)]"
                  }`}
                  onClick={() => {
                    setSort(s);
                    setOpen(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <p className="mb-4 text-[12.5px] text-[var(--ink-faint)]">
        상품 {sorted.length}개 · MVP 고정 목록
      </p>
      <div className="grid grid-cols-2 gap-[18px] md:grid-cols-3 lg:grid-cols-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
