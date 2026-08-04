import Link from "next/link";
import { Header } from "@/components/Header";
import { CategorySidebar } from "@/components/plp/CategorySidebar";
import { ProductCard } from "@/components/plp/ProductCard";
import {
  CATEGORIES,
  DEFAULT_SUB_CATEGORY,
  getMajorLabel,
  getSubCategory,
} from "@/lib/categories";
import { getProductsBySub } from "@/lib/products";
import type { SubCategoryId } from "@/lib/types";

const VALID_SUBS = new Set(
  CATEGORIES.flatMap((m) => m.children.map((c) => c.id))
);

type PageProps = {
  searchParams: { sub?: string };
};

export default function CategoryPage({ searchParams }: PageProps) {
  const raw = searchParams.sub ?? DEFAULT_SUB_CATEGORY;
  const subId = (VALID_SUBS.has(raw as SubCategoryId)
    ? raw
    : DEFAULT_SUB_CATEGORY) as SubCategoryId;
  const cat = getSubCategory(subId);
  const products = getProductsBySub(subId);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="mx-auto min-h-screen max-w-[1256px] bg-white shadow-[0_0_0_1px_var(--line)]">
        <Header />
        <div className="grid md:grid-cols-[230px_1fr]">
          <CategorySidebar activeSub={subId} />
          <main className="px-7 pb-[60px] pt-6">
            <p className="mb-3.5 text-[12.5px] text-[var(--ink-faint)]">
              가구 › {cat ? getMajorLabel(cat.major.id) : ""} ›{" "}
              <b className="font-semibold text-[var(--ink-soft)]">{cat?.sub.label}</b>
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {CATEGORIES.flatMap((m) => m.children).map((sub) => (
                <Link
                  key={sub.id}
                  href={`/store/category?sub=${sub.id}`}
                  className={`rounded-full border px-[15px] py-2 text-[13px] ${
                    sub.id === subId
                      ? "border-[var(--blue)] bg-[var(--blue-soft)] font-extrabold text-[var(--blue)]"
                      : "border-[var(--line-2)] bg-white text-[var(--ink-soft)]"
                  }`}
                >
                  {sub.label}
                </Link>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-xl font-extrabold">{cat?.sub.label}</h1>
              <button
                type="button"
                className="cursor-default rounded-lg border border-[var(--line-2)] px-3 py-1.5 text-[12.5px] text-[var(--ink-faint)]"
                disabled
              >
                인기순 ▾
              </button>
            </div>
            <p className="mb-4 text-[12.5px] text-[var(--ink-faint)]">
              상품 {products.length}개 · MVP 고정 목록
            </p>

            <div className="grid grid-cols-2 gap-[18px] md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
