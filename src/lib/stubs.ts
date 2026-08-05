export type StubPage = {
  slug: string;
  title: string;
  description: string;
  bullets?: string[];
};

export const STUB_PAGES: Record<string, StubPage> = {
  home: {
    slug: "home",
    title: "쇼핑홈",
    description: "오늘의집 쇼핑 홈 프로토타입 화면이에요. 실제 피드 대신 안내만 보여줍니다.",
    bullets: ["인기 카테고리로 이동해 상품을 둘러볼 수 있어요", "핵심 플로우는 카테고리 → 상품 상세입니다"],
  },
  community: {
    slug: "community",
    title: "집구경",
    description: "집들이·콘텐츠 영역 플레이스홀더입니다.",
  },
  interior: {
    slug: "interior",
    title: "인테리어·생활",
    description: "시공·생활용품 진입 화면 플레이스홀더입니다.",
  },
  best: {
    slug: "best",
    title: "베스트",
    description: "베스트 상품 랭킹 플레이스홀더입니다.",
  },
  deal: {
    slug: "deal",
    title: "오늘의딜",
    description: "타임특가 딜 목록 플레이스홀더입니다.",
  },
  exclusive: {
    slug: "exclusive",
    title: "단독상품",
    description: "오늘의집 단독 상품 모음 플레이스홀더입니다.",
  },
  omart: {
    slug: "omart",
    title: "오마트",
    description: "오마트 카테고리 플레이스홀더입니다.",
  },
  delivery: {
    slug: "delivery",
    title: "원하는날도착",
    description: "희망일 배송 상품 모음 플레이스홀더입니다.",
  },
  showroom: {
    slug: "showroom",
    title: "오!쇼룸",
    description: "쇼룸 콘텐츠 플레이스홀더입니다.",
  },
  exhibition: {
    slug: "exhibition",
    title: "기획전",
    description: "기획전 목록 플레이스홀더입니다.",
  },
  cart: {
    slug: "cart",
    title: "장바구니",
    description: "장바구니가 비어 있어요. (프로토타입 — 실제 담기 로직 없음)",
    bullets: ["상품 상세에서 장바구니 버튼을 누르면 토스트만 뜹니다"],
  },
  login: {
    slug: "login",
    title: "로그인",
    description: "로그인 화면 플레이스홀더입니다. 소셜/이메일 폼은 생략했어요.",
  },
  signup: {
    slug: "signup",
    title: "회원가입",
    description: "회원가입 화면 플레이스홀더입니다.",
  },
  search: {
    slug: "search",
    title: "검색",
    description: "검색 결과는 이번 MVP 범위 밖이라, 안내 페이지만 띄워 둡니다.",
    bullets: ["왼쪽 카테고리에서 침대·매트리스를 골라보세요"],
  },
  write: {
    slug: "write",
    title: "글쓰기",
    description: "집들이/노하우 작성 화면 플레이스홀더입니다.",
  },
  only: {
    slug: "only",
    title: "오늘의집 Only",
    description: "Only 카테고리 플레이스홀더입니다. MVP에선 침대·매트리스만 구현돼 있어요.",
  },
  sofa: {
    slug: "sofa",
    title: "소파",
    description: "소파 카테고리는 MVP 범위 밖이에요. 표시용으로만 열어 둔 화면입니다.",
  },
  table: {
    slug: "table",
    title: "테이블·식탁·책상",
    description: "테이블 카테고리 플레이스홀더입니다.",
  },
  storage: {
    slug: "storage",
    title: "서랍·수납장",
    description: "수납 카테고리 플레이스홀더입니다.",
  },
  tv: {
    slug: "tv",
    title: "거실장·TV장",
    description: "거실장 카테고리 플레이스홀더입니다.",
  },
  chair: {
    slug: "chair",
    title: "의자",
    description: "의자 카테고리 플레이스홀더입니다.",
  },
  closet: {
    slug: "closet",
    title: "행거·옷장",
    description: "옷장 카테고리 플레이스홀더입니다.",
  },
  kids: {
    slug: "kids",
    title: "유아동가구",
    description: "유아동 가구 카테고리 플레이스홀더입니다.",
  },
};

export const DISABLED_CATEGORY_SLUG: Record<string, string> = {
  "오늘의집 Only": "only",
  "테이블·식탁·책상": "table",
  소파: "sofa",
  "서랍·수납장": "storage",
  "거실장·TV장": "tv",
  의자: "chair",
  "행거·옷장": "closet",
  유아동가구: "kids",
};
