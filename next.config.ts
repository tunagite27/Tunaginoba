import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */


eslint: {
    // ビルド時にESLintのエラーがあってもビルドを成功させる設定
    // 警告: これを設定すると、ESLintエラーがある状態でも本番ビルドが成功してしまいます。
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
