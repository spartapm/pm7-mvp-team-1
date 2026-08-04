import type {
  ImageInfoTag,
  InfoTagKey,
  Product,
  ProductInfoDisclosureItem,
  SubCategoryId,
} from "./types";
import { INFO_TAG_KEYS } from "./types";

type Seed = {
  id: string;
  brand: string;
  name: string;
  price: number;
  subCategory: SubCategoryId;
  colors: string[];
  sizes: string[];
  /** 0=disabled, 1=single, 2+=multi for each tag in order */
  tagPattern: number[];
};

const SEEDS: Seed[] = [
  // 침대프레임 × 5
  {
    id: "bf-01",
    brand: "모던슬립",
    name: "내추럴 베니어 플랫폼 저상형 침대프레임 Q 2colors",
    price: 259000,
    subCategory: "bed-frame",
    colors: ["오크", "월넛"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [1, 2, 1, 0, 1],
  },
  {
    id: "bf-02",
    brand: "벨벳홈",
    name: "스테이 호텔식 패브릭 침대프레임 SS/Q/K",
    price: 432000,
    subCategory: "bed-frame",
    colors: ["크림 아이보리", "차콜 그레이"],
    sizes: ["SS", "Q", "K", "LK"],
    tagPattern: [2, 2, 1, 1, 1],
  },
  {
    id: "bf-03",
    brand: "루미너스",
    name: "원목 수납형 침대프레임 세트 Q",
    price: 198000,
    subCategory: "bed-frame",
    colors: ["화이트", "내추럴"],
    sizes: ["SS", "Q"],
    tagPattern: [1, 1, 1, 0, 1],
  },
  {
    id: "bf-04",
    brand: "어반디자인",
    name: "LED 수납 화이트 플랫폼 침대프레임",
    price: 315900,
    subCategory: "bed-frame",
    colors: ["화이트"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [0, 2, 1, 1, 1],
  },
  {
    id: "bf-05",
    brand: "우드라떼",
    name: "고무나무 원목 슬랫 헤드보드 침대프레임",
    price: 560000,
    subCategory: "bed-frame",
    colors: ["내추럴", "월넛"],
    sizes: ["Q", "K"],
    tagPattern: [1, 2, 2, 1, 1],
  },
  // 침대+매트리스 × 5
  {
    id: "bm-01",
    brand: "슬립앤코",
    name: "프레임+본넬스프링 매트리스 패키지 SS/Q",
    price: 389000,
    subCategory: "bed-mattress",
    colors: ["그레이", "베이지"],
    sizes: ["SS", "Q"],
    tagPattern: [1, 2, 1, 1, 1],
  },
  {
    id: "bm-02",
    brand: "쿨타임 홈",
    name: "저상형 침대+메모리폼 매트리스 세트",
    price: 459000,
    subCategory: "bed-mattress",
    colors: ["화이트", "오크"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [1, 2, 1, 0, 1],
  },
  {
    id: "bm-03",
    brand: "데일리리빙",
    name: "패브릭 호텔식 침대+매트리스 풀세트",
    price: 529000,
    subCategory: "bed-mattress",
    colors: ["크림", "차콜"],
    sizes: ["Q", "K"],
    tagPattern: [2, 1, 1, 1, 1],
  },
  {
    id: "bm-04",
    brand: "미니멀홈",
    name: "철제 로우베드+토퍼 포함 세트 SS",
    price: 279000,
    subCategory: "bed-mattress",
    colors: ["블랙", "화이트"],
    sizes: ["SS", "Q"],
    tagPattern: [1, 1, 0, 1, 1],
  },
  {
    id: "bm-05",
    brand: "우드모아",
    name: "원목 수납침대+독립스프링 매트리스",
    price: 648000,
    subCategory: "bed-mattress",
    colors: ["오크"],
    sizes: ["Q", "K"],
    tagPattern: [0, 2, 1, 1, 1],
  },
  // 침대부속가구 × 5
  {
    id: "ba-01",
    brand: "모던슬립",
    name: "침대 사이드 테이블 세트 2colors",
    price: 89000,
    subCategory: "bed-accessory",
    colors: ["오크", "화이트"],
    sizes: ["기본"],
    tagPattern: [1, 0, 1, 1, 1],
  },
  {
    id: "ba-02",
    brand: "벨벳홈",
    name: "패브릭 침대 벤치 스툴",
    price: 129000,
    subCategory: "bed-accessory",
    colors: ["베이지", "그레이"],
    sizes: ["W1200", "W1400"],
    tagPattern: [1, 2, 1, 0, 1],
  },
  {
    id: "ba-03",
    brand: "어반디자인",
    name: "LED 헤드보드 패널 교체형",
    price: 159000,
    subCategory: "bed-accessory",
    colors: ["화이트", "블랙"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [1, 2, 1, 1, 0],
  },
  {
    id: "ba-04",
    brand: "우드라떼",
    name: "원목 침대 발판 스텝스툴",
    price: 69000,
    subCategory: "bed-accessory",
    colors: ["내추럴"],
    sizes: ["기본"],
    tagPattern: [0, 1, 1, 1, 1],
  },
  {
    id: "ba-05",
    brand: "쿨타임 홈",
    name: "언더베드 수납박스 2P 세트",
    price: 49000,
    subCategory: "bed-accessory",
    colors: ["그레이", "아이보리"],
    sizes: ["기본"],
    tagPattern: [1, 0, 1, 1, 1],
  },
  // 매트리스 × 5
  {
    id: "mt-01",
    brand: "슬립앤코",
    name: "하이브리드 독립스프링 매트리스 25cm",
    price: 329000,
    subCategory: "mattress",
    colors: ["화이트"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [0, 2, 1, 1, 1],
  },
  {
    id: "mt-02",
    brand: "쿨타임 홈",
    name: "메모리폼 롤팩 매트리스 22cm",
    price: 249000,
    subCategory: "mattress",
    colors: ["화이트", "그레이"],
    sizes: ["SS", "Q"],
    tagPattern: [1, 2, 1, 0, 1],
  },
  {
    id: "mt-03",
    brand: "데일리리빙",
    name: "라텍스 탑퍼블 매트리스 28cm",
    price: 489000,
    subCategory: "mattress",
    colors: ["아이보리"],
    sizes: ["Q", "K", "LK"],
    tagPattern: [0, 2, 2, 1, 1],
  },
  {
    id: "mt-04",
    brand: "모던슬립",
    name: "본넬스프링 가성비 매트리스 20cm",
    price: 159000,
    subCategory: "mattress",
    colors: ["화이트"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [0, 2, 1, 1, 1],
  },
  {
    id: "mt-05",
    brand: "미니멀홈",
    name: "하드타입 포켓스프링 매트리스 26cm",
    price: 379000,
    subCategory: "mattress",
    colors: ["화이트"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [0, 1, 1, 1, 1],
  },
  // 토퍼 × 5
  {
    id: "tp-01",
    brand: "슬립앤코",
    name: "고밀도 메모리폼 토퍼 7cm",
    price: 99000,
    subCategory: "topper",
    colors: ["화이트"],
    sizes: ["SS", "Q", "K"],
    tagPattern: [0, 2, 1, 1, 1],
  },
  {
    id: "tp-02",
    brand: "쿨타임 홈",
    name: "쿨링젤 토퍼 5cm 사계절용",
    price: 129000,
    subCategory: "topper",
    colors: ["블루", "그레이"],
    sizes: ["SS", "Q"],
    tagPattern: [1, 2, 1, 0, 1],
  },
  {
    id: "tp-03",
    brand: "데일리리빙",
    name: "라텍스 토퍼 6cm 천연",
    price: 189000,
    subCategory: "topper",
    colors: ["아이보리"],
    sizes: ["Q", "K"],
    tagPattern: [0, 1, 1, 1, 1],
  },
  {
    id: "tp-04",
    brand: "모던슬립",
    name: "접이식 3단 토퍼 매트 8cm",
    price: 79000,
    subCategory: "topper",
    colors: ["네이비", "그레이"],
    sizes: ["SS", "Q"],
    tagPattern: [1, 2, 1, 1, 0],
  },
  {
    id: "tp-05",
    brand: "벨벳홈",
    name: "호텔식 다운필 토퍼 4cm",
    price: 149000,
    subCategory: "topper",
    colors: ["화이트", "베이지"],
    sizes: ["Q", "K"],
    tagPattern: [1, 1, 1, 0, 1],
  },
];

const SIZE_DIM: Record<string, string> = {
  SS: "W1100 × D2100 × H320mm",
  Q: "W1500 × D2100 × H320mm",
  K: "W1600 × D2100 × H320mm",
  LK: "W1800 × D2100 × H320mm",
  CK: "W2000 × D2200 × H320mm",
  기본: "상세 치수 참조",
  W1200: "W1200 × D400 × H450mm",
  W1400: "W1400 × D400 × H450mm",
};

function emptyTag(): ImageInfoTag {
  return { locationCount: 0, locations: [] };
}

function buildTags(seed: Seed): Record<InfoTagKey, ImageInfoTag> {
  const tags = Object.fromEntries(
    INFO_TAG_KEYS.map((k) => [k, emptyTag()])
  ) as Record<InfoTagKey, ImageInfoTag>;

  INFO_TAG_KEYS.forEach((key, i) => {
    const n = seed.tagPattern[i] ?? 0;
    if (n <= 0) return;

    if (key === "크기" && n >= 2) {
      const locs = seed.sizes.slice(0, Math.min(n + 1, seed.sizes.length)).map(
        (size, idx) => ({
          title: size,
          file: `detail_size_${idx + 1}.jpg`,
          yRatio: 0.25,
        })
      );
      tags[key] = { locationCount: locs.length, locations: locs };
      return;
    }

    if (key === "색상" && n >= 2) {
      const locs = seed.colors.map((color, idx) => ({
        title: color,
        file: `detail_color_${idx + 1}.jpg`,
        yRatio: 0.3,
      }));
      tags[key] = { locationCount: locs.length, locations: locs };
      return;
    }

    if (key === "주요 소재" && n >= 2) {
      tags[key] = {
        locationCount: 2,
        locations: [
          { title: "프레임 소재", file: "detail_material_1.jpg", yRatio: 0.2 },
          { title: "헤드보드 소재", file: "detail_material_2.jpg", yRatio: 0.35 },
        ],
      };
      return;
    }

    const fileMap: Record<InfoTagKey, string> = {
      색상: "detail_color_1.jpg",
      크기: "detail_size_1.jpg",
      "주요 소재": "detail_material_1.jpg",
      구성품: "detail_parts.jpg",
      "배송·설치비용": "detail_delivery.jpg",
    };

    tags[key] = {
      locationCount: 1,
      locations: [{ title: key, file: fileMap[key], yRatio: 0.28 }],
    };
  });

  return tags;
}

function buildDetailImages(seed: Seed) {
  const images: Product["detailImages"] = [
    { file: "detail_mood_1.jpg", label: "연출 이미지 · 인테리어 무드컷", height: 420 },
    { file: "detail_mood_2.jpg", label: "연출 이미지 · 공간 활용", height: 360 },
  ];

  seed.colors.forEach((color, idx) => {
    images.push({
      file: `detail_color_${idx + 1}.jpg`,
      label: `색상 옵션 · ${color}`,
      height: 320,
    });
  });

  images.push({
    file: "detail_material_1.jpg",
    label: "주요 소재 · E0 등급 MDF / 원목 마감",
    height: 340,
  });

  if ((seed.tagPattern[2] ?? 0) >= 2) {
    images.push({
      file: "detail_material_2.jpg",
      label: "헤드보드 소재 · 패브릭 / 원목",
      height: 300,
    });
  }

  seed.sizes.forEach((size, idx) => {
    images.push({
      file: `detail_size_${idx + 1}.jpg`,
      label: `${size} 도면 · ${SIZE_DIM[size] ?? size}`,
      height: 380,
    });
  });

  images.push(
    {
      file: "detail_parts.jpg",
      label: "구성품 · 프레임 / 슬랫 / 조립나사",
      height: 300,
    },
    {
      file: "detail_delivery.jpg",
      label: "배송·설치 · 기본배송 무료 / 설치 안내",
      height: 320,
    }
  );

  return images;
}

function buildDisclosure(seed: Seed): ProductInfoDisclosureItem[] {
  const sizeText = seed.sizes
    .map((s) => `${s} ${SIZE_DIM[s]?.split("×")[0]?.trim() ?? ""}`)
    .join(" / ");

  return [
    {
      itemName: "품명 및 모델명",
      value: seed.name,
      source: "seller",
    },
    {
      itemName: "KC 인증정보",
      value: "수령 후 확인",
      source: "seller",
    },
    {
      itemName: "색상",
      value: seed.colors.join(" / "),
      source: seed.tagPattern[0] > 0 ? "image" : "seller",
      originalText: seed.tagPattern[0] > 0 ? "상세페이지 참조" : undefined,
    },
    {
      itemName: "크기",
      value: `${sizeText} (mm, 가로 기준)`,
      source: "image",
      originalText: "상세페이지 참조",
    },
    {
      itemName: "주요 소재",
      value: "E0 등급 MDF, 원목 마감",
      source: seed.tagPattern[2] > 0 ? "image" : "seller",
      originalText: seed.tagPattern[2] > 0 ? "상세페이지 참조" : undefined,
    },
    {
      itemName: "구성품",
      value: seed.tagPattern[3] > 0 ? "본체 프레임 / 슬랫 / 조립나사" : null,
      source: seed.tagPattern[3] > 0 ? "image" : undefined,
      originalText: seed.tagPattern[3] > 0 ? "상세페이지 참조" : undefined,
    },
    {
      itemName: "제조국",
      value: "대한민국",
      source: "seller",
    },
    {
      itemName: "배송·설치비용",
      value: "기본배송 무료 / 설치 30,000원",
      source: seed.tagPattern[4] > 0 ? "image" : "seller",
      originalText: seed.tagPattern[4] > 0 ? "상세페이지 참조" : undefined,
    },
    {
      itemName: "AS 책임자 / 전화",
      value: "1544-0000",
      source: "seller",
    },
  ];
}

function majorOf(sub: SubCategoryId) {
  return sub === "mattress" || sub === "topper" ? "mattress" : "bed";
}

export const PRODUCTS: Product[] = SEEDS.map((seed, index) => ({
  id: seed.id,
  brand: seed.brand,
  name: seed.name,
  price: seed.price,
  majorCategory: majorOf(seed.subCategory) as Product["majorCategory"],
  subCategory: seed.subCategory,
  rating: 4.5 + (index % 5) * 0.1,
  reviewCount: 1200 + index * 437,
  inquiryCount: 300 + index * 89,
  colors: seed.colors,
  sizes: seed.sizes,
  thumbnailLabel: "대표 상품 이미지",
  detailImages: buildDetailImages(seed),
  imageInfoTags: buildTags(seed),
  productInfoDisclosure: buildDisclosure(seed),
}));

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsBySub(sub: SubCategoryId) {
  return PRODUCTS.filter((p) => p.subCategory === sub);
}

export function formatPrice(price: number) {
  return price.toLocaleString("ko-KR");
}
