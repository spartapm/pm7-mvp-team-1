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

/** 쿼리용 서브카테고리 인코딩 (+ → %2B) */
export function categoryHref(subId: SubCategoryId | string) {
  return `/store/category?sub=${encodeURIComponent(subId)}`;
}

/** searchParams.sub 정규화 (+가 공백으로 온 경우 복구) */
export function parseSubParam(raw: string | undefined): SubCategoryId {
  const valid = new Set(
    CATEGORIES.flatMap((m) => m.children.map((c) => c.id as string))
  );
  if (raw && valid.has(raw)) return raw as SubCategoryId;

  // application/x-www-form-urlencoded 관례로 + → 공백 디코딩된 경우
  if (raw) {
    const plusRestored = raw.replace(/ /g, "+");
    if (valid.has(plusRestored)) return plusRestored as SubCategoryId;
  }

  return DEFAULT_SUB_CATEGORY;
}
