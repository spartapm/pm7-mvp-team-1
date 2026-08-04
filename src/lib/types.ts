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

export type InfoLocation = {
  title: string;
  file: string;
  yRatio: number;
};

export type ImageInfoTag = {
  locationCount: number;
  locations: InfoLocation[];
};

export type ProductInfoDisclosureItem = {
  itemName: string;
  value: string | null;
  source?: "image" | "seller";
  originalText?: string;
};

export type MajorCategoryId = "bed" | "mattress";
export type SubCategoryId =
  | "bed-frame"
  | "bed-mattress"
  | "bed-accessory"
  | "mattress"
  | "topper";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  majorCategory: MajorCategoryId;
  subCategory: SubCategoryId;
  rating: number;
  reviewCount: number;
  inquiryCount: number;
  colors: string[];
  sizes: string[];
  thumbnailLabel: string;
  detailImages: { file: string; label: string; height: number }[];
  imageInfoTags: Record<InfoTagKey, ImageInfoTag>;
  productInfoDisclosure: ProductInfoDisclosureItem[];
};
