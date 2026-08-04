"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

export function ProductSummary({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");

  return (
    <div className="grid gap-8 px-7 pb-6 pt-4 md:grid-cols-[minmax(0,480px)_1fr]">
      <div className="grid grid-cols-[56px_1fr] gap-3">
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`aspect-square rounded-md bg-[var(--ph)] ${
                i === 0 ? "outline outline-2 outline-[var(--ink)] outline-offset-[-2px]" : ""
              }`}
            />
          ))}
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--ph)]">
          <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(-45deg,transparent_0_11px,rgba(0,0,0,.03)_11px_22px)] text-sm text-[var(--ink-faint)]">
            [대표 상품 이미지]
          </div>
          <span className="absolute left-3 top-3 rounded bg-[#111] px-2 py-0.5 text-[11px] font-extrabold text-white">
            Only
          </span>
        </div>
      </div>

      <div>
        <p className="mb-1 text-[13px] font-bold text-[var(--ink-soft)]">{product.brand}</p>
        <h1 className="mb-2.5 text-[19px] font-bold leading-snug">{product.name}</h1>
        <p className="mb-3.5 text-[12.5px] text-[var(--ink-soft)]">
          <span className="tracking-wide text-[#ffb400]">★★★★★</span>{" "}
          {product.rating.toFixed(1)} · 리뷰 {product.reviewCount.toLocaleString("ko-KR")}
        </p>
        <div className="mb-4 flex items-baseline gap-2">
          <b className="text-[26px] font-extrabold tabular-nums">{formatPrice(product.price)}</b>
          <span className="text-sm">원</span>
          <span className="rounded bg-[var(--red)] px-1.5 py-0.5 text-[10px] font-extrabold text-white">
            쿠폰
          </span>
        </div>
        <div className="mb-4 rounded-lg bg-[#fef3c7] px-3 py-2.5 text-xs text-[#92700e]">
          카카오페이 결제 시 최대 3% 즉시 할인 ›
        </div>

        <div className="mb-4 space-y-2">
          <div>
            <p className="mb-1.5 text-[13px] text-[var(--ink-soft)]">사이즈 선택</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-lg border px-3 py-2 text-[13px] ${
                    size === s
                      ? "border-[var(--blue)] bg-[var(--blue-soft)] font-bold text-[var(--blue)]"
                      : "border-[var(--line-2)] text-[var(--ink-soft)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[13px] text-[var(--ink-soft)]">색상 선택</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`rounded-lg border px-3 py-2 text-[13px] ${
                    color === c
                      ? "border-[var(--blue)] bg-[var(--blue-soft)] font-bold text-[var(--blue)]"
                      : "border-[var(--line-2)] text-[var(--ink-soft)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between px-0.5 text-[13px] text-[var(--ink-soft)]">
          <span>추정금액</span>
          <b className="text-lg text-[var(--ink)] tabular-nums">{formatPrice(product.price)}원</b>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="relative flex-1 rounded-lg border border-[var(--line-2)] bg-white py-3.5 text-[15px] font-extrabold text-[var(--ink-soft)]"
          >
            장바구니
            <span className="absolute right-1.5 top-1 text-[8.5px] font-bold text-[var(--ink-faint)]">
              UI만
            </span>
          </button>
          <button
            type="button"
            className="relative flex-1 rounded-lg bg-[var(--blue)] py-3.5 text-[15px] font-extrabold text-white"
          >
            바로 구매
            <span className="absolute right-1.5 top-1 text-[8.5px] font-bold text-white/85">
              UI만
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
