import { ImageResponse } from "next/og";

export const alt = "Voltura — Premium Electronics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#6366f1" />
            <path
              d="M16 34V18l8-4 8 4v16l-8 4-8-4z"
              fill="white"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M16 18l8 4m0 0l8-4m-8 4v16"
              stroke="#a5b4fc"
              strokeWidth="1.5"
            />
          </svg>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Voltura
          </span>
        </div>
        <span
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            letterSpacing: "-0.02em",
          }}
        >
          Premium Electronics
        </span>
      </div>
    ),
    { ...size }
  );
}
