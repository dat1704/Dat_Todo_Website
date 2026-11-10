import Reveal from './Reveal.jsx'

export default function Intro() {
  return (
    <section className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="max-w-2xl text-2xl font-light leading-snug text-accent md:text-[2.5rem] md:leading-[1.2]">
            Ghi lại một việc chỉ mất một giây. Đánh dấu hoàn thành bằng một cú chạm. Theo dõi tiến độ mà không cần bảng
            tính, không thông báo phiền, không thứ gì thừa.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-2xl font-light md:text-[2.5rem]">Tất cả trong một danh sách.</p>
        </Reveal>
      </div>
    </section>
  )
}
