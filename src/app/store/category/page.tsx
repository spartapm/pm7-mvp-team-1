import { Header } from "@/components/Header";
import { CategorySidebar } from "@/components/plp/CategorySidebar";
import { ProductGrid } from "@/components/plp/ProductGrid";
import {
  CATEGORIES,
  DEFAULT_SUB_CATEGORY,
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
            <ProductGrid products={products} title={cat?.sub.label} />
          </main>
        </div>
      </div>
    </div>
  );
}
