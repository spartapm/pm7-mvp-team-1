import raw from "@/data/data.json";
import { CATEGORIES } from "./categories";
import type {
  ImageInfoTag,
  InfoTagKey,
  Product,
  ProductInfoDisclosureItem,
  RawTagKey,
  SubCategoryId,
} from "./types";
import { INFO_TAG_KEYS, TAG_KEY_MAP } from "./types";

type RawLocation = {
  basename: string;
  title: string;
  yRatio: number;
};

type RawTag = {
  label: string;
  locationCount: number;
  locations: RawLocation[];
};

type RawDisclosure = {
  key: string;
  label: string;
  value: string | null;
  source: string;
  originalText?: string | null;
};

type RawProduct = {
  id: string;
  productName: string;
  brand: string;
  mainCategory: string;
  subCategory: string;
  pageUrl?: string;
  price: {
    salePrice: number;
    originalPrice?: number;
    discountPercent?: number;
  };
  representativeImage: string;
  detailImages: { basename: string; path: string }[];
  imageInfoTags: Partial<Record<RawTagKey, RawTag>>;
  productInfoDisclosure: RawDisclosure[];
};

/** GitHub blob URL(?raw=true) → raw.githubusercontent.com */
export function toRawImageUrl(url: string) {
  if (!url) return url;
  const match = url.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+?)(?:\?.*)?$/
  );
  if (!match) return url.replace(/\?raw=true$/, "");
  const [, owner, repo, branch, path] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

function emptyTag(label: InfoTagKey): ImageInfoTag {
  return { label, locationCount: 0, locations: [] };
}

function mapTags(
  tags: Partial<Record<RawTagKey, RawTag>> | undefined
): Record<InfoTagKey, ImageInfoTag> {
  const mapped = Object.fromEntries(
    INFO_TAG_KEYS.map((k) => [k, emptyTag(k)])
  ) as Record<InfoTagKey, ImageInfoTag>;

  if (!tags) return mapped;

  (Object.keys(TAG_KEY_MAP) as RawTagKey[]).forEach((rawKey) => {
    const uiKey = TAG_KEY_MAP[rawKey];
    const tag = tags[rawKey];
    if (!tag) return;
    mapped[uiKey] = {
      label: tag.label || uiKey,
      locationCount: tag.locationCount ?? tag.locations?.length ?? 0,
      locations: (tag.locations ?? []).map((loc) => ({
        title: loc.title,
        file: loc.basename,
        yRatio: loc.yRatio ?? 0,
      })),
    };
  });

  return mapped;
}

function mapDisclosure(items: RawDisclosure[] | undefined): ProductInfoDisclosureItem[] {
  return (items ?? []).map((item) => {
    const source =
      item.source === "image" || item.source === "page" || item.source === "none"
        ? item.source
        : undefined;
    return {
      itemName: item.label,
      value: item.value,
      source,
      originalText: item.originalText ?? undefined,
    };
  });
}

function hashNum(id: string, salt: number) {
  let h = salt;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function adaptProduct(rawProduct: RawProduct): Product {
  const rating = 4.4 + (hashNum(rawProduct.id, 7) % 6) / 10;
  const reviewCount = 800 + (hashNum(rawProduct.id, 13) % 12000);
  const inquiryCount = 120 + (hashNum(rawProduct.id, 29) % 2000);

  return {
    id: rawProduct.id,
    brand: rawProduct.brand,
    name: rawProduct.productName,
    price: rawProduct.price.salePrice,
    originalPrice: rawProduct.price.originalPrice,
    discountPercent: rawProduct.price.discountPercent,
    majorCategory: rawProduct.mainCategory,
    subCategory: rawProduct.subCategory as SubCategoryId,
    pageUrl: rawProduct.pageUrl,
    rating: Number(rating.toFixed(1)),
    reviewCount,
    inquiryCount,
    thumbnailUrl: toRawImageUrl(rawProduct.representativeImage),
    detailImages: (rawProduct.detailImages ?? []).map((img) => ({
      file: img.basename,
      src: toRawImageUrl(img.path),
    })),
    imageInfoTags: mapTags(rawProduct.imageInfoTags),
    productInfoDisclosure: mapDisclosure(rawProduct.productInfoDisclosure),
  };
}

const productMap = raw.products as unknown as Record<string, RawProduct>;

export const PRODUCTS: Product[] = Object.values(productMap).map(adaptProduct);

export function getProduct(id: string) {
  const rawProduct = productMap[id];
  return rawProduct ? adaptProduct(rawProduct) : undefined;
}

export function getProductsBySub(sub: SubCategoryId) {
  const cat = CATEGORIES.flatMap((m) => m.children).find((c) => c.id === sub);
  if (!cat) return [];
  return cat.productIds
    .map((id) => getProduct(id))
    .filter((p): p is Product => Boolean(p));
}

export function formatPrice(price: number) {
  return price.toLocaleString("ko-KR");
}
