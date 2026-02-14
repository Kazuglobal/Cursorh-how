import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像最適化設定
  // AVIF フォーマットを優先し、WebP を次の選択肢として設定
  // これにより、モダンブラウザではより小さいファイルサイズを実現
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // コンパイラ設定
  compiler: {
    // 本番環境で console.log を削除し、バンドルサイズを削減
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // 実験的機能
  experimental: {
    // CSS 最適化により、未使用のスタイルを削除
    optimizeCss: true,
    // パッケージのインポートを最適化
    optimizePackageImports: [
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
  },

  // Sitemapキャッシュ設定
  staticPageGenerationTimeout: 60,

  // ターボパック有効化（高速開発ビルド）
  // turbo が本番ビルドで使用可能になったら有効化
  // turbo: {
  //   loaders: {},
  // },
};

export default nextConfig;
