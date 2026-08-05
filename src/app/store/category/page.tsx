import { Header } from "@/components/Header";
import { CategorySidebar } from "@/components/plp/CategorySidebar";
import { ProductGrid } from "@/components/plp/ProductGrid";
import {
  getSubCategory,
  parseSubParam,
} from "@/lib/categories";
import { getProductsBySub } from "@/lib/products";

type PageProps = {
  searchParams: { sub?: string };
};

export default function CategoryPage({ searchParams }: PageProps) {
  const subId = parseSubParam(searchParams.sub);
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
