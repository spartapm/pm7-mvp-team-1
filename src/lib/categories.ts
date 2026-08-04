import type { MajorCategoryId, SubCategoryId } from "./types";

export type SubCategory = {
  id: SubCategoryId;
  label: string;
  majorId: MajorCategoryId;
};

export type MajorCategory = {
  id: MajorCategoryId;
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

export const CATEGORIES: MajorCategory[] = [
  {
    id: "bed",
    label: "침대",
    enabled: true,
    children: [
      { id: "bed-frame", label: "침대프레임", majorId: "bed" },
      { id: "bed-mattress", label: "침대+매트리스", majorId: "bed" },
      { id: "bed-accessory", label: "침대부속가구", majorId: "bed" },
    ],
  },
  {
    id: "mattress",
    label: "매트리스·토퍼",
    enabled: true,
    children: [
      { id: "mattress", label: "매트리스", majorId: "mattress" },
      { id: "topper", label: "토퍼", majorId: "mattress" },
    ],
  },
];

export const DEFAULT_SUB_CATEGORY: SubCategoryId = "bed-frame";

export function getSubCategory(id: SubCategoryId) {
  for (const major of CATEGORIES) {
    const found = major.children.find((c) => c.id === id);
    if (found) return { major, sub: found };
  }
  return null;
}

export function getMajorLabel(id: MajorCategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? "";
}
