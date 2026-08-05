"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { getSubCategory } from "@/lib/categories";
import { Header } from "@/components/Header";
import { Toast } from "@/components/Toast";
import { StickyTabBar } from "@/components/pdp/StickyTabBar";
import { ProductSummary } from "@/components/pdp/ProductSummary";
import { DetailImages } from "@/components/pdp/DetailImages";
import { ProductNotice } from "@/components/pdp/ProductNotice";
import { ExtraSections } from "@/components/pdp/ExtraSections";

export function ProductDetail({ product }: { product: Product }) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("정보를 불러오지 못했어요");
  const cat = getSubCategory(product.subCategory);

  const showToast = useCallback((message = "정보를 불러오지 못했어요") => {
    setToastMessage(message);
    setToastOpen(true);
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 2500);
    return () => clearTimeout(t);
  }, [toastOpen]);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
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
          가구 › {cat?.major.label ?? product.majorCategory} › {cat?.sub.label}
        </p>
        <ProductSummary product={product} onToast={showToast} />
        <StickyTabBar product={product} onScrollFail={() => showToast()} />
        <div className="px-7 pb-[90px] pt-6">
          <div id="sec-desc" className="scroll-mt-[70px]">
            <DetailImages product={product} />
          </div>
          <div className="mt-8">
            <ProductNotice product={product} />
          </div>
          <ExtraSections product={product} />
        </div>
      </div>
      <Toast open={toastOpen} message={toastMessage} onClose={() => setToastOpen(false)} />
    </div>
  );
}
