import type { CSSProperties } from "react";

type Sticker = {
  id: number;
  symbol: "star" | "heart" | "wishbone";
  className: string;
  style: CSSProperties;
};

const stickers: Sticker[] = [
  {
    id: 1,
    symbol: "star",
    className: "left-[8%] top-[16%] text-blue-100/70",
    style: {
      "--sticker-delay": "-1s",
      "--sticker-duration": "12s",
      "--sticker-drift-x": "22px",
      "--sticker-opacity": "0.72",
      "--sticker-rotate-start": "-8deg",
      "--sticker-rotate-mid": "9deg",
      "--sticker-rotate-end": "-5deg",
    } as CSSProperties,
  },
  {
    id: 2,
    symbol: "heart",
    className: "right-[10%] top-[22%] text-rose-200/60",
    style: {
      "--sticker-delay": "-4s",
      "--sticker-duration": "15s",
      "--sticker-drift-x": "-18px",
      "--sticker-opacity": "0.58",
      "--sticker-rotate-start": "10deg",
      "--sticker-rotate-mid": "-8deg",
      "--sticker-rotate-end": "12deg",
    } as CSSProperties,
  },
  {
    id: 3,
    symbol: "wishbone",
    className: "left-[14%] bottom-[20%] text-violet-100/55",
    style: {
      "--sticker-delay": "-7s",
      "--sticker-duration": "17s",
      "--sticker-drift-x": "16px",
      "--sticker-opacity": "0.54",
      "--sticker-rotate-start": "-14deg",
      "--sticker-rotate-mid": "5deg",
      "--sticker-rotate-end": "-10deg",
    } as CSSProperties,
  },
  {
    id: 4,
    symbol: "star",
    className: "right-[18%] bottom-[18%] text-slate-100/55",
    style: {
      "--sticker-delay": "-9s",
      "--sticker-duration": "14s",
      "--sticker-drift-x": "-24px",
      "--sticker-opacity": "0.62",
      "--sticker-rotate-start": "6deg",
      "--sticker-rotate-mid": "-12deg",
      "--sticker-rotate-end": "7deg",
    } as CSSProperties,
  },
  {
    id: 5,
    symbol: "heart",
    className: "left-[24%] top-[68%] text-blue-200/45",
    style: {
      "--sticker-delay": "-11s",
      "--sticker-duration": "18s",
      "--sticker-drift-x": "28px",
      "--sticker-opacity": "0.5",
      "--sticker-rotate-start": "-4deg",
      "--sticker-rotate-mid": "11deg",
      "--sticker-rotate-end": "-9deg",
    } as CSSProperties,
  },
  {
    id: 6,
    symbol: "wishbone",
    className: "right-[26%] top-[62%] text-rose-100/45",
    style: {
      "--sticker-delay": "-3s",
      "--sticker-duration": "19s",
      "--sticker-drift-x": "-14px",
      "--sticker-opacity": "0.46",
      "--sticker-rotate-start": "14deg",
      "--sticker-rotate-mid": "-4deg",
      "--sticker-rotate-end": "10deg",
    } as CSSProperties,
  },
];

function WishboneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-9 w-9"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        d="M24 41c0-12 0-17-7-24-3.5-3.5-4.5-7.5-1.5-10 3.5 1 6 4 8.5 10 2.5-6 5-9 8.5-10 3 2.5 2 6.5-1.5 10-7 7-7 12-7 24Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function StickerSymbol({ symbol }: { symbol: Sticker["symbol"] }) {
  if (symbol === "wishbone") {
    return <WishboneIcon />;
  }

  return (
    <span className="block text-3xl leading-none">
      {symbol === "heart" ? "♥" : "✦"}
    </span>
  );
}

export default function StickerFloat() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/10 blur-3xl sticker-float-soft" />
      <div className="absolute left-[12%] top-[12%] h-28 w-28 rounded-full bg-rose-200/10 blur-2xl sticker-float-soft" />
      <div className="absolute bottom-[10%] right-[12%] h-32 w-32 rounded-full bg-violet-200/10 blur-2xl sticker-float-soft" />

      {stickers.map((sticker) => (
        <div
          className={`sticker-float absolute drop-shadow-[0_0_18px_rgba(191,219,254,0.36)] ${sticker.className}`}
          key={sticker.id}
          style={sticker.style}
        >
          <div className="rounded-full border border-white/10 bg-white/[0.04] p-2 shadow-lg shadow-blue-950/30 backdrop-blur-sm">
            <StickerSymbol symbol={sticker.symbol} />
          </div>
        </div>
      ))}
    </div>
  );
}
