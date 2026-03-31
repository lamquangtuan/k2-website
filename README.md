# K2 Homestay Website

Website public chính thức cho Homestay K2, xây dựng bằng Next.js, Tailwind CSS và TypeScript.

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Cấu trúc thư mục

- `src/app`: App Router pages và layout
- `src/components`: UI component dùng chung cho website
- `src/lib`: dữ liệu nội dung và helper nhẹ
- `public`: tài nguyên tĩnh

## Biến môi trường

Copy `.env.example` thành `.env.local` rồi chỉnh lại theo thông tin thật.

## Deploy

Project sẵn sàng để deploy lên Vercel hoặc Cloudflare Pages sau khi `npm install` và cấu hình biến môi trường.
