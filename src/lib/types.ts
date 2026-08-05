export type InfoTagKey =
  | "색상"
  | "크기"
  | "주요 소재"
  | "구성품"
  | "배송·설치비용";

export const INFO_TAG_KEYS: InfoTagKey[] = [
  "색상",
  "크기",
  "주요 소재",
  "구성품",
  "배송·설치비용",
];

/** data.json imageInfoTags 영문 키 → UI 라벨 */
export const TAG_KEY_MAP = {
  color: "색상",
  size: "크기",
  mainMaterial: "주요 소재",
  components: "구성품",
  deliveryInstallCost: "배송·설치비용",
} as const;

export type RawTagKey = keyof typeof TAG_KEY_MAP;

export type InfoLocation = {
  title: string;
  file: string;
  yRatio: number;
};

export type ImageInfoTag = {
  label: string;
  locationCount: number;
  locations: InfoLocation[];
};

export type ProductInfoDisclosureItem = {
  itemName: string;
  value: string | null;
  source?: "image" | "page" | "none";
  originalText?: string;
};

export type SubCategoryId =
  | "침대프레임"
  | "침대+매트리스"
  | "침대부속가구"
  | "매트리스"
  | "토퍼";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  majorCategory: string;
  subCategory: SubCategoryId;
  pageUrl?: string;
  rating: number;
  reviewCount: number;
  inquiryCount: number;
  thumbnailUrl: string;
  detailImages: { file: string; src: string }[];
  imageInfoTags: Record<InfoTagKey, ImageInfoTag>;
  productInfoDisclosure: ProductInfoDisclosureItem[];
};
