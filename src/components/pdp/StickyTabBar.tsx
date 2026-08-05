"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageInfoTag, InfoTagKey, Product } from "@/lib/types";
import { INFO_TAG_KEYS } from "@/lib/types";

const TAB_HEIGHT = 52;
const HOVER_HEIGHT = 48;
const SCROLL_GAP = 14;
const CLOSE_DELAY_MS = 300;

type TabId = "desc" | "detail" | "review" | "inquiry" | "shipping" | "recommend";

type StickyTabBarProps = {
  product: Product;
  onScrollFail: () => void;
};

export function StickyTabBar({ product, onScrollFail }: StickyTabBarProps) {
  const [hoverOpen, setHoverOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("desc");
  const [expandedKey, setExpandedKey] = useState<InfoTagKey | null>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openHover = () => {
    clearCloseTimer();
    setHoverOpen(true);
    setActiveTab("detail");
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setHoverOpen(false);
      setExpandedKey(null);
      setTooltipOpen(false);
      setActiveTab((prev) => (prev === "detail" ? "desc" : prev));
    }, CLOSE_DELAY_MS);
  };

  const closeNow = () => {
    clearCloseTimer();
    setHoverOpen(false);
    setExpandedKey(null);
    setTooltipOpen(false);
  };

  useEffect(() => () => clearCloseTimer(), []);

  const scrollWithOffset = (el: HTMLElement | null, withHover = false) => {
    if (!el) {
      onScrollFail();
      return;
    }
    // PDP-TAB-003: 섹션 상단이 호버 메뉴 바로 아래에 오도록
    // offset = -(탭바 + 호버메뉴 + 여백) → 목표좌표 = 섹션Y + offset
    const offset = -(
      TAB_HEIGHT +
      (withHover || hoverOpen ? HOVER_HEIGHT : 0) +
      SCROLL_GAP
    );
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
    el.classList.remove("flash-target");
    void el.offsetWidth;
    el.classList.add("flash-target");
  };

  const scrollToNotice = () => {
    openHover();
    scrollWithOffset(document.getElementById("sec-notice"), true);
  };

  const scrollToSection = (id: string, tab: TabId) => {
    closeNow();
    setActiveTab(tab);
    scrollWithOffset(document.getElementById(id), false);
  };

  const scrollToLocation = (file: string, yRatio: number) => {
    const img = document.querySelector<HTMLElement>(
      `[data-detail-file="${CSS.escape(file)}"]`
    );
    if (!img) {
      onScrollFail();
      return;
    }
    // 메뉴 항목 스크롤도 동일: 목표좌표 = (이미지Y + height*yRatio) + offset
    const offset = -(TAB_HEIGHT + HOVER_HEIGHT + SCROLL_GAP);
    const y =
      img.getBoundingClientRect().top +
      window.scrollY +
      img.offsetHeight * yRatio +
      offset;
    window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
    img.classList.remove("flash-target");
    void img.offsetWidth;
    img.classList.add("flash-target");
  };

  const handleItemClick = (key: InfoTagKey, tag: ImageInfoTag) => {
    if (tag.locationCount === 0) return;
    if (tag.locationCount === 1) {
      const loc = tag.locations[0];
      scrollToLocation(loc.file, loc.yRatio);
      return;
    }
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  const tabs: {
    id: TabId;
    label: string;
    num?: string;
    sectionId?: string;
  }[] = [
    { id: "desc", label: "상품 설명", sectionId: "sec-desc" },
    { id: "detail", label: "상세정보" },
    {
      id: "review",
      label: "리뷰",
      num: product.reviewCount.toLocaleString("ko-KR"),
      sectionId: "sec-review",
    },
    {
      id: "inquiry",
      label: "문의",
      num: product.inquiryCount.toLocaleString("ko-KR"),
      sectionId: "sec-inquiry",
    },
    { id: "shipping", label: "배송·환불", sectionId: "sec-shipping" },
    { id: "recommend", label: "추천", sectionId: "sec-recommend" },
  ];

  return (
    <div className="sticky top-0 z-[600] overflow-visible bg-white shadow-[0_1px_0_var(--line)]">
      <div className="relative mx-auto flex h-[52px] max-w-[1256px] items-stretch px-7">
        {tabs.map((tab) => {
          const isDetail = tab.id === "detail";
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`relative flex items-center gap-1.5 whitespace-nowrap border-b-2 px-[18px] text-[14.5px] ${
                active
                  ? "border-[var(--blue)] font-extrabold text-[var(--blue)]"
                  : isDetail
                    ? "border-transparent font-bold text-[var(--ink)]"
                    : "border-transparent text-[var(--ink-soft)]"
              }`}
              onMouseEnter={() => {
                if (isDetail) openHover();
              }}
              onMouseLeave={() => {
                if (isDetail) scheduleClose();
              }}
              onClick={() => {
                if (isDetail) {
                  scrollToNotice();
                  return;
                }
                if (tab.id === "desc") {
                  closeNow();
                  setActiveTab("desc");
                  scrollWithOffset(document.getElementById("sec-desc"), false);
                  return;
                }
                if (tab.sectionId) {
                  scrollToSection(tab.sectionId, tab.id);
                }
              }}
            >
              {tab.label}
              {tab.num ? (
                <span className="text-xs text-[var(--ink-faint)]">{tab.num}</span>
              ) : null}
              {isDetail ? (
                <span className="absolute right-0 top-2 rounded-[3px] bg-[var(--new)] px-[3px] text-[8px] font-extrabold tracking-wide text-white">
                  NEW
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className={`absolute left-0 right-0 top-[52px] z-[601] ${
          hoverOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseEnter={openHover}
        onMouseLeave={scheduleClose}
      >
        <div
          className={`mx-auto flex h-12 max-w-[1256px] items-center gap-2 border-b border-[var(--blue-line)] bg-[var(--blue-soft)] px-7 transition-opacity ${
            hoverOpen
              ? "opacity-100"
              : "pointer-events-none h-0 overflow-hidden opacity-0 border-0"
          }`}
          style={hoverOpen ? undefined : { height: 0 }}
        >
          <div
            className="relative mr-0.5 flex items-center gap-1 whitespace-nowrap text-[11.5px] font-extrabold text-[var(--blue-strong)]"
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
          >
            <span>AI가 찾은 위치</span>
            <span className="rounded-[3px] bg-[var(--new)] px-[3px] text-[8px] font-extrabold text-white">
              NEW
            </span>
            {tooltipOpen ? (
              <div className="absolute left-0 top-[calc(100%+8px)] z-[630] w-[360px] whitespace-normal break-keep rounded-lg border border-[var(--blue-line)] bg-white px-3.5 py-3 text-[12px] font-normal leading-[1.65] text-[var(--ink-soft)] shadow-[0_8px_24px_rgba(0,0,0,.12)]">
                상세페이지 이미지를 AI가 분석해 각 정보의 위치를 찾아 연결했습니다. 항목을 누르면
                해당 위치로 이동합니다. 위치가 정확하지 않을 수 있습니다.
              </div>
            ) : null}
          </div>

          <div className="flex gap-[7px]">
            {INFO_TAG_KEYS.map((key) => {
              const tag = product.imageInfoTags[key];
              const n = tag.locationCount;
              const disabled = n === 0;
              const multi = n >= 2;
              const expanded = expandedKey === key;

              return (
                <div key={key} className="relative">
                  <button
                    type="button"
                    disabled={disabled}
                    className={`flex items-center gap-1.5 rounded-full border px-[13px] py-[7px] text-[13px] ${
                      disabled
                        ? "cursor-not-allowed border-[var(--line-2)] bg-[#f2f3f4] text-[var(--ink-faint)]"
                        : expanded
                          ? "border-[var(--blue)] bg-[var(--blue)] text-white"
                          : "border-[var(--blue-line)] bg-white text-[var(--ink)]"
                    }`}
                    onClick={() => handleItemClick(key, tag)}
                  >
                    {key}
                    {multi ? (
                      <span
                        className={`text-[10px] font-extrabold ${
                          expanded ? "text-white" : "text-[var(--blue-strong)]"
                        }`}
                      >
                        {n}
                      </span>
                    ) : null}
                    {multi ? (
                      <span
                        className={`text-[9px] ${expanded ? "text-white" : "text-[var(--blue-strong)]"}`}
                      >
                        ▾
                      </span>
                    ) : null}
                  </button>

                  {expanded && multi ? (
                    <div className="absolute left-0 top-[calc(100%+7px)] z-[620] max-h-[240px] w-[180px] overflow-y-auto rounded-[10px] border border-[var(--blue-line)] bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,.14)]">
                      {tag.locations.map((loc, idx) => (
                        <button
                          key={`${loc.title}-${idx}`}
                          type="button"
                          className="flex w-full items-center justify-between gap-3.5 border-b border-[var(--line)] px-3 py-2.5 text-left text-[13px] last:border-b-0 hover:bg-[var(--blue-soft)]"
                          onClick={() => scrollToLocation(loc.file, loc.yRatio)}
                        >
                          <span>{loc.title}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
