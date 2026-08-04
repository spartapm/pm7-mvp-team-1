import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘의집 MVP · 상품 상세정보 AI 탐색",
  description:
    "목적형 사용자가 상세정보 탭·호버 메뉴로 핵심 정보에 빠르게 도달하는 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
