"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { getMajorLabel, getSubCategory } from "@/lib/categories";
import { Header } from "@/components/Header";
import { Toast } from "@/components/Toast";
import { StickyTabBar } from "@/components/pdp/StickyTabBar";
import { ProductSummary } from "@/components/pdp/ProductSummary";
import { DetailImages } from "@/components/pdp/DetailImages";
import { ProductNotice } from "@/components/pdp/ProductNotice";

export function ProductDetail({ product }: { product: Product }) {
  const [toastOpen, setToastOpen] = useState(false);
  const cat = getSubCategory(product.subCategory);

  const showToast = useCallback(() => {
    setToastOpen(true);
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 2500);
    return () => clearTimeout(t);
  }, [toastOpen]);

  useEffect(() => {
    const onDocClick = () => {
      if (toastOpen) setToastOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [toastOpen]);

  return (
    <div className="min-h-screen bg-[var(--paper)]" onClick={() => toastOpen && setToastOpen(false)}>
      <div className="mx-auto min-h-screen max-w-[1256px] bg-white shadow-[0_0_0_1px_var(--line)]">
        <Header />
        <div className="border-b border-[var(--line)] px-7 py-2.5">
          <Link
            href={`/store/category?sub=${product.subCategory}`}
            className="inline-flex rounded-lg border border-[var(--line-2)] bg-white px-3.5 py-1.5 text-[12.5px] text-[var(--ink-soft)]"
          >
            ← 카테고리로
          </Link>
        </div>
        <p className="px-7 pb-1 pt-4 text-[12.5px] text-[var(--ink-faint)]">
          가구 › {getMajorLabel(product.majorCategory)} › {cat?.sub.label}
        </p>
        <ProductSummary product={product} />
        <StickyTabBar product={product} onScrollFail={showToast} />
        <div className="px-7 pb-[90px] pt-6">
          <DetailImages product={product} />
          <div className="mt-8">
            <ProductNotice product={product} />
          </div>
          <div className="mt-10 border-t border-[var(--line)] pt-6">
            <h3 className="mb-3 text-[15px] font-extrabold text-[var(--ink-faint)]">
              리뷰 (MVP 표시만)
            </h3>
            <div className="rounded-lg border border-dashed border-[var(--ph-line)] bg-[var(--ph)] px-4 py-8 text-center text-[13px] text-[var(--ink-faint)]">
              리뷰 영역 · ★{product.rating.toFixed(1)} · 동작 미구현
            </div>
          </div>
        </div>
      </div>
      <Toast
        open={toastOpen}
        message="정보를 불러오지 못했어요"
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
