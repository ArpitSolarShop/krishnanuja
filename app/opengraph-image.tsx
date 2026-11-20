import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/config";

export const runtime = "edge";
export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#064e3b",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #047857 0%, #064e3b 100%)",
          padding: "60px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ☀️
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.5px" }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#34d399",
            }}
          >
            PM Surya Ghar Yojana • Authorized EPC Partner
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            Power Your Future With Clean Solar Energy
          </h1>
          <p style={{ fontSize: 24, color: "#d1fae5", margin: 0, lineHeight: 1.4 }}>
            Up to ₹1,08,000 Government Subsidy • 25-Year Performance Warranty
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "24px",
            fontSize: 20,
            color: "#a7f3d0",
          }}
        >
          <span>krishnanuja.com</span>
          <span>Varanasi & Eastern UP Hub</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
