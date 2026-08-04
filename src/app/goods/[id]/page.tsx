import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/pdp/ProductDetail";
import { PRODUCTS, getProduct } from "@/lib/products";

type PageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default function GoodsPage({ params }: PageProps) {
  const product = getProduct(params.id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
