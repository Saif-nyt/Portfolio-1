import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#060F0C",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(101,232,224,0.30), transparent 55%), radial-gradient(circle at 12% 88%, rgba(49,190,182,0.18), transparent 55%)",
          color: "#F4F8F5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            color: "#8FF2EC",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: "1px solid rgba(101,232,224,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            TS
          </div>
          Web Development · Digital Growth · Tracking
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Building Digital Experiences Beyond the Ordinary.
          </div>
          <div style={{ fontSize: 30, color: "#C3D4CE", display: "flex" }}>
            {SITE.name} — {SITE.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#96ABA4",
          }}
        >
          <div>100+ WordPress Websites Completed · 1.5 Years of Experience</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#8FF2EC",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#65E8E0",
              }}
            />
            Let&apos;s work together
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
