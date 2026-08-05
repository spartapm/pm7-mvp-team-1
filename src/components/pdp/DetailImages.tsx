import type { Product } from "@/lib/types";

export function DetailImages({ product }: { product: Product }) {
  return (
    <div className="mx-auto max-w-[860px] space-y-0">
      {product.detailImages.map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.file}
          data-detail-file={img.file}
          src={img.src}
          alt={`${product.name} ${img.file}`}
          loading="eager"
          decoding="sync"
          className="block w-full"
        />
      ))}
    </div>
  );
}
