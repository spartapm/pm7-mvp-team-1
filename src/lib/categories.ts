import raw from "@/data/data.json";
import type { SubCategoryId } from "./types";

type RawSub = {
  id: string;
  name: string;
  productIds: string[];
};

type RawMajor = {
  id: string;
  main: string;
  subs: RawSub[];
};

export type SubCategory = {
  id: SubCategoryId;
  label: string;
  majorId: string;
  majorLabel: string;
  productIds: string[];
};

export type MajorCategory = {
  id: string;
  label: string;
  enabled: boolean;
  children: SubCategory[];
};

export const SIDEBAR_DISABLED = [
  "오늘의집 Only",
  "테이블·식탁·책상",
  "소파",
  "서랍·수납장",
  "거실장·TV장",
  "의자",
  "행거·옷장",
  "유아동가구",
] as const;

export const CATEGORIES: MajorCategory[] = (
  raw.categories as RawMajor[]
).map((major) => ({
  id: major.id,
  label: major.main,
  enabled: true,
  children: major.subs.map((sub) => ({
    id: sub.id as SubCategoryId,
    label: sub.name,
    majorId: major.id,
    majorLabel: major.main,
    productIds: sub.productIds,
  })),
}));

export const DEFAULT_SUB_CATEGORY: SubCategoryId =
  ((raw as { defaultMain?: string }).defaultMain === "침대"
    ? "침대프레임"
    : CATEGORIES[0]?.children[0]?.id) ?? "침대프레임";

export function getSubCategory(id: SubCategoryId) {
  for (const major of CATEGORIES) {
    const found = major.children.find((c) => c.id === id);
    if (found) return { major, sub: found };
  }
  return null;
}

export function getMajorLabel(majorId: string) {
  return CATEGORIES.find((c) => c.id === majorId)?.label ?? majorId;
}
