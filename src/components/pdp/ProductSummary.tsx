"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

export function ProductSummary({
  product,
  onToast,
}: {
  product: Product;
  onToast?: (message: string) => void;
}) {
  const thumbs = [
    product.thumbnailUrl,
    ...product.detailImages.slice(0, 3).map((d) => d.src),
  ];
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className="grid gap-8 px-7 pb-6 pt-4 md:grid-cols-[minmax(0,480px)_1fr]">
      <div className="grid grid-cols-[56px_1fr] gap-3">
        <div className="flex flex-col gap-2">
          {thumbs.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActiveThumb(i)}
              className={`aspect-square overflow-hidden rounded-md bg-[var(--ph)] ${
                i === activeThumb
                  ? "outline outline-2 outline-[var(--ink)] outline-offset-[-2px]"
                  : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="eager"
                decoding="sync"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--ph)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbs[activeThumb] ?? product.thumbnailUrl}
            alt={product.name}
            loading="eager"
            decoding="sync"
            className="h-full w-full object-cover"
          />
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

        <div className="mb-2 flex items-baseline gap-2">
          {product.discountPercent ? (
            <span className="text-[22px] font-extrabold text-[var(--red)]">
              {product.discountPercent}%
            </span>
          ) : null}
          {product.originalPrice ? (
            <span className="text-sm text-[var(--ink-faint)] line-through tabular-nums">
              {formatPrice(product.originalPrice)}원
            </span>
          ) : null}
        </div>
        <div className="mb-4 flex items-baseline gap-2">
          <b className="text-[26px] font-extrabold tabular-nums">
            {formatPrice(product.price)}
          </b>
          <span className="text-sm">원</span>
          <span className="rounded bg-[var(--red)] px-1.5 py-0.5 text-[10px] font-extrabold text-white">
            쿠폰
          </span>
        </div>

        <div className="mb-4 rounded-lg bg-[#fef3c7] px-3 py-2.5 text-xs text-[#92700e]">
          카카오페이 결제 시 최대 3% 즉시 할인 ›
        </div>

        <div className="mb-4 flex items-center justify-between px-0.5 text-[13px] text-[var(--ink-soft)]">
          <span>추정금액</span>
          <b className="text-lg text-[var(--ink)] tabular-nums">
            {formatPrice(product.price)}원
          </b>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="relative flex-1 rounded-lg border border-[var(--line-2)] bg-white py-3.5 text-[15px] font-extrabold text-[var(--ink-soft)]"
            onClick={() => onToast?.("장바구니에 담았어요 (프로토타입)")}
          >
            장바구니
          </button>
          <button
            type="button"
            className="relative flex-1 rounded-lg bg-[var(--blue)] py-3.5 text-[15px] font-extrabold text-white"
            onClick={() => onToast?.("구매 화면은 준비 중이에요 (프로토타입)")}
          >
            바로 구매
          </button>
        </div>

        {product.pageUrl ? (
          <a
            href={product.pageUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-[12.5px] text-[var(--ink-faint)] underline"
          >
            원본 오늘의집 상품 페이지 ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}
