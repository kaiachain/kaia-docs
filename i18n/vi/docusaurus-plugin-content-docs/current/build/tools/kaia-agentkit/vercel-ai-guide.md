# Vercel AI SDK

## Tổng quan

Kaia Agent Kit tích hợp với một số khuôn khổ AI phổ biến, cho phép bạn xây dựng các tác nhân có khả năng sử dụng blockchain bằng các công cụ phát triển ưa thích của bạn. Trong hướng dẫn này, hãy tìm hiểu cách tạo AI Agent bằng Vercel AI SDK tích hợp Kaia Agent Kit cho các hành động trên chuỗi.

## Điều kiện tiên quyết

- Đã cài đặt [Node.js](https://nodejs.org/en/download) & [pnpm](https://pnpm.io/installation)
- [Ví Kaia](https://www.kaiawallet.io/) có khóa riêng tư đã sẵn sàng
- [Khóa API tạo ra của Google](https://ai.google.dev/gemini-api/docs/api-key)
- [Nhà cung cấp RPC](https://docs.kaia.io/references/public-en/) cho mạng Kaia
- [Khóa API Kaiascan](https://docs.kaiascan.io/account-creation)

## Bắt đầu

Trong hướng dẫn này, chúng tôi sẽ xây dựng một tác nhân AI cơ bản bằng Vercel AI SDK và Kaia Agent Kit có thể:

- Gửi token gốc, token có thể thay thế (FT) và NFT.
- Kiểm tra số dư của token gốc, FT và NFT.
- Lấy blockchain bằng (hoặc thông qua) API Kaiascan dữ liệu để lấy tóm tắt mạng, giá Kaia, số dư mã thông báo cho một địa chỉ, v.v.

Đến cuối hướng dẫn này, bạn sẽ có một tác nhân AI có chức năng tương tác với blockchain Kaia, thực hiện giao dịch và truy xuất dữ liệu quan trọng trên chuỗi khối - tất cả đều tự động.

### Hiểu về AI Agent Stack

Để xây dựng một tác nhân AI mạnh mẽ trên chuỗi, chúng ta cần những công cụ phù hợp. Hướng dẫn này tận dụng Vercel AI SDK cho khả năng AI và Kaia Agent Kit cho tương tác blockchain.

**Vercel AI SDK — Công cụ AI**

Vercel AI SDK là bộ công cụ TypeScript giúp dễ dàng xây dựng các ứng dụng và tác nhân hỗ trợ AI bằng các nền tảng như React, Next.js, Vue, Svelte và Node.js. Nó hỗ trợ nhiều mô hình AI và trong hướng dẫn này, chúng tôi sẽ sử dụng [Google Generative AI](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) làm nhà cung cấp mô hình.

**Kaia Agent Kit - Tăng cường sức mạnh cho các tác nhân AI bằng các công cụ Onchain**

Kaia Agent Kit mang đến các công cụ trên chuỗi cho các tác nhân AI, cho phép chúng tương tác liền mạch với chuỗi khối Kaia. Điều này sẽ cho phép tác nhân thực hiện các hành động trên chuỗi, lấy thông tin trên chuỗi, xác minh giao dịch và tương tác với hợp đồng thông minh một cách linh hoạt.

Tận dụng cả Vercel AI SDK và Kaia Agent Kit, chúng tôi sẽ tạo ra một tác nhân AI có khả năng suy luận, hành động và tương tác blockchain tự chủ

## Khởi tạo dự án

### Vercel AI SDK

Bắt đầu bằng cách tạo một ứng dụng Next.js mới. Lệnh này sẽ tạo một thư mục mới có tên kaia-agent-kit-vercel-ai-example và thiết lập ứng dụng Next.js cơ bản bên trong thư mục đó.

```bash
 pnpm create next-app@latest kaia-agent-kit-vercel-ai-example
```

Đối với hướng dẫn này, vui lòng nhập các giá trị bên dưới vào dấu nhắc dòng lệnh:

```bash
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

Điều hướng đến thư mục vừa tạo:

```bash
cd kaia-agent-kit-vercel-ai-example
```

### Cài đặt các phụ thuộc

Cài đặt `ai`, `@ai-sdk/react` và `@ai-sdk/google`, gói AI, React hooks của AI SDK và [nhà cung cấp AI tạo sinh] của Google (https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai) của AI SDK.

```bash
pnpm add ai @ai-sdk/react @ai-sdk/google zod dotenv
```

### Cấu hình khóa API Google Generative AI

Tạo tệp `.env` trong thư mục gốc của dự án và thêm Khóa API Google Generative AI. Khóa này được sử dụng để xác thực ứng dụng của bạn với dịch vụ Google Generative AI.

```bash
touch .env
```

Chỉnh sửa tệp .env:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxx
```

Thay thế xxxxxxxxx bằng khóa API GOOGLE_GENERATIVE_AI thực tế của bạn

### Tạo Trình xử lý tuyến đường

Tạo trình xử lý tuyến đường, `app/api/chat/route.ts` và thêm đoạn mã sau:

```typescript
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
    messages,
  });
  return result.toDataStreamResponse();
}
```

**Hướng dẫn mã:**

Mã này định nghĩa trình xử lý tuyến API (POST /api/chat) xử lý tin nhắn chatbot bằng mô hình AI Gemini của Google thông qua SDK AI của Vercel. Sau đây là những gì xảy ra:

- **Trích xuất lịch sử trò chuyện**: Trình xử lý đọc yêu cầu đến và lấy các tin nhắn có chứa lịch sử trò chuyện.
- **Tạo phản hồi AI**: Gọi streamText() bằng mô hình Gemini 1.5 Pro của Google, truyền lịch sử trò chuyện để lấy bối cảnh.
- **Truyền phát phản hồi**: Hàm trả về phản hồi được truyền phát bằng toDataStreamResponse(), cho phép tạo văn bản theo thời gian thực.
- **Giới hạn thời gian thực hiện**: Biến maxDuration đảm bảo phản hồi không vượt quá 30 giây.

Thiết lập này cho phép phản hồi do AI tạo ra theo thời gian thực trong chatbot bằng cách tận dụng Gemini AI của Google với Vercel AI SDK.

### Kết nối giao diện người dùng

Bây giờ bạn đã có Route Handler có thể truy vấn LLM, đã đến lúc thiết lập giao diện người dùng. Gói [UI](https://sdk.vercel.ai/docs/ai-sdk-ui) của AI SDK tóm tắt sự phức tạp của giao diện trò chuyện thành một hook, [useChat](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat).
Cập nhật trang gốc của bạn (app/page.tsx) bằng mã sau để hiển thị danh sách tin nhắn trò chuyện và cung cấp thông tin đầu vào cho người dùng:

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
```

**Hướng dẫn mã:**

Thành phần React này tạo ra một giao diện trò chuyện đơn giản bằng cách sử dụng hook useChat() từ Vercel AI SDK. Sau đây là những gì nó làm:

- **Quản lý trạng thái trò chuyện**: Hook useChat() cung cấp:
 - tin nhắn: Lịch sử trò chuyện (có id, vai trò và nội dung).
 - đầu vào: Đầu vào hiện tại của người dùng.
 - handleInputChange: Cập nhật trường nhập liệu khi người dùng nhập.
 - handleSubmit: Gửi tin nhắn khi biểu mẫu được gửi.
- **Hiển thị tin nhắn**: Thành phần này ánh xạ các tin nhắn, cho biết văn bản đó đến từ người dùng hay AI.
- **Xử lý dữ liệu đầu vào của người dùng**: Bao gồm một trường nhập liệu nơi người dùng có thể nhập tin nhắn, sau đó tin nhắn sẽ được gửi đi khi họ nhấn enter.

Thiết lập này cho phép tương tác thời gian thực với chatbot AI bằng cách kết nối với tuyến đường API (/api/chat) đã tạo trước đó.

### Chạy ứng dụng của bạn

Với điều đó, bạn đã xây dựng mọi thứ cần thiết cho chatbot của mình! Để bắt đầu ứng dụng của bạn, hãy sử dụng lệnh:

```bash
pnpm run dev
```

Mở trình duyệt của bạn và mở http://localhost:3000. Bạn sẽ thấy một trường nhập dữ liệu. Hãy thử bằng cách nhập tin nhắn và xem chatbot AI phản hồi theo thời gian thực! AI SDK giúp xây dựng giao diện trò chuyện AI nhanh chóng và dễ dàng bằng Next.js.

Bây giờ chúng ta đã thiết lập chatbot, hãy thêm khả năng sử dụng các công cụ trên chuỗi để thực hiện các giao dịch chuỗi khối, v.v. bằng cách sử dụng Kaia Agent Kit.

## Mở rộng Agent với Onchain Tools bằng cách sử dụng Kaia Agent Kit

Cho đến nay, chúng tôi đã xây dựng được một chatbot AI có chức năng xử lý các cuộc hội thoại và tạo phản hồi. Bây giờ, hãy cùng tăng cường khả năng của nó bằng cách sử dụng Kaia Agent Kit.  Với điều này, chatbot của chúng tôi phát triển từ AI đàm thoại đơn giản thành một tác nhân chuỗi khối mạnh mẽ có thể hoạt động trên chuỗi khối theo thời gian thực.

### Cài đặt các phụ thuộc

Cài đặt Kaia Agent Kit và các gói phụ thuộc khác để tích hợp các chức năng onchain vào tác nhân AI của chúng tôi.

```bash
pnpm add @kaiachain/kaia-agent-kit @goat-sdk/adapter-vercel-ai @goat-sdk/wallet-viem viem 
```

:::note
Kaia Agent Kit cung cấp quyền truy cập vào các công cụ để thực hiện các hành động trên chuỗi trên Kaia, trong khi các phụ thuộc khác giúp kết nối các công cụ trên chuỗi với AI SDK và xử lý việc quản lý ví.
:::

### Cấu hình môi trường

Chỉnh sửa tệp .env trong thư mục gốc của dự án và thêm nội dung sau:

```bash
WALLET_PRIVATE_KEY=0x_PRIVATE_KEY
RPC_PROVIDER_URL=https://public-en.node.kaia.io
KAIASCAN_API_KEY=your_kaiascan_api_key
```

### Đang cập nhật tệp route.ts để thực thi trên chuỗi

```typescript
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { kairos } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
// kaia-agent-kit
import { Kaia, PackagesEnum } from '@kaiachain/kaia-agent-kit';
import 'dotenv/config'
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: kairos,
});
const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [Kaia({KAIA_KAIASCAN_API_KEY: process.env.KAIASCAN_API_KEY, packages: []})]
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
// add onchain tools
    tools: tools,
    messages,
// enable multi-step calls
    maxSteps: 10,
  });
  return result.toDataStreamResponse();
}
```

**Hướng dẫn mã**

Tệp `route.ts` được cập nhật này tích hợp các chức năng blockchain vào tác nhân AI của chúng tôi bằng cách sử dụng Kaia Agent Kit, Viem và Vercel AI SDK. Sau đây là thông tin chi tiết về những gì đang diễn ra:

- **Thiết lập công cụ Blockchain và ví**
 - Nhập Viem, Kaia Agent Kit và các công cụ khác để kết nối các công cụ trên chuỗi với Vercel AI SDK.
 - Sử dụng privateKeyToAccount để tạo tài khoản ví từ biến môi trường (WALLET_PRIVATE_KEY).
 - Khởi tạo ứng dụng ví Viem để tương tác với blockchain Kaia bằng cách sử dụng nhà cung cấp RPC.
- **Đang tải công cụ Onchain**
 - Sử dụng getOnChainTools để tải các công cụ Kaia Agent Kit trên chuỗi. Xin lưu ý rằng bạn có thể hạn chế quyền truy cập của tác nhân AI vào các công cụ cụ thể bằng cách cấu hình mảng packages và truyền vào một trong các giá trị sau: PackagesEnum.WEB3, PackagesEnum.KAIASCAN, PackagesEnum.DGSWAP. Khi để trống, tất cả các gói đều được bật theo mặc định.
- **Tích hợp khả năng AI và Blockchain**
 - streamText được gọi bằng:
  - Google Gemini 1.5 Pro là mô hình LLM
  - Các công cụ trên chuỗi (công cụ) để cho phép các giao dịch chuỗi khối
  - Lịch sử trò chuyện (tin nhắn)
  - Thực hiện nhiều bước (maxSteps: 10) để xử lý các quy trình làm việc phức tạp
- **Trả về phản hồi AI được truyền phát**
 Tác nhân AI xử lý yêu cầu và truyền phát phản hồi với các khả năng tích hợp trên chuỗi.

## Kiểm tra chức năng của Agent

Để khởi động lại ứng dụng của bạn với các khả năng trên chuỗi, hãy sử dụng lệnh:

```bash
pnpm run dev 
```

Bây giờ bạn có thể tương tác với tác nhân AI của mình để thực hiện các hành động trên chuỗi trên Kaia:

```bash
Check this address:  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 KAIA balance on kairos

Send 1 KAIA to this address: 0x75Bc50a5664657c869Edc0E058d192EeEfD570eb on Kairos

Send 10 UTT tokens to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Send 1 FM NFT (0x61eaee91759adc35b4665fc589b95f885f685dab) with token id 1 to this address: 0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos

Get the balance (native, fungible, non-fungible) of this account  0xd5c0d9371F3ad9c0d348dC24e17AC691048082e0 on Kairos. Display the first 5 if there are many

What is Kaia current info?

Get me the current block number on Kairos
```

**Đầu ra**

![](/img/build/tools/kaia-agent-kit/kaia-agent-vercel-ai.gif)

## Thông tin bổ sung

- [Bộ phát triển SDK AI Vercel](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router)
- [Chat đa phương thức](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot)
- [Công cụ](https://sdk.vercel.ai/docs/foundations/tools)





