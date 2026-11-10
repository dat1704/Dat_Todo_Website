// Chụp screenshot trang đang chạy bằng Edge/Chrome headless (không cần cài thêm gói).
// Dùng: npm run shot -- [url] [ten-file]
// Mặc định chụp http://localhost:5173 ở 2 khung: desktop (1440) và mobile (390).
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const url = process.argv[2] ?? 'http://localhost:5173'
const name = process.argv[3] ?? 'page'
const outDir = resolve('screenshots')
mkdirSync(outDir, { recursive: true })

const candidates = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean)
const browser = candidates.find((p) => existsSync(p))
if (!browser) {
  console.error('Không tìm thấy Edge/Chrome. Đặt biến BROWSER_PATH.')
  process.exit(1)
}

// Cửa sổ headless trên Windows không nhỏ hơn ~500px, nên khung mobile
// được render trong iframe rộng đúng 390px để có viewport thật như điện thoại.
const MOBILE_W = 390
const MOBILE_H = 7600
const wrapper = resolve(outDir, '_mobile-frame.html')
writeFileSync(
  wrapper,
  `<!doctype html><body style="margin:0;background:#e5e5ea"><iframe src="${new URL(url).pathname}" width="${MOBILE_W}" height="${MOBILE_H}" style="border:0;display:block;background:#fff"></iframe></body>`,
)
// Wrapper được Vite dev server phục vụ (cùng origin) để iframe chạy chung tiến trình,
// nhờ vậy --virtual-time-budget đợi được cả nội dung trong iframe.
const wrapperUrl = new URL('/screenshots/_mobile-frame.html', url).href

const viewports = [
  { label: 'desktop', size: '1440,5600', target: url },
  { label: 'mobile', size: `${MOBILE_W + 110},${MOBILE_H}`, target: wrapperUrl },
]

for (const { label, size, target } of viewports) {
  const file = resolve(outDir, `${name}-${label}.png`)
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${size}`,
    '--virtual-time-budget=6000',
    `--screenshot=${file}`,
    target,
  ], { stdio: 'ignore' })
  console.log('Đã lưu', file)
}
