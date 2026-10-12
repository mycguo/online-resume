import { ImageResponse } from "next/og";
import { profile, projects } from "@/data/portfolio";

export const alt = `${profile.name} — Ideas, turned into useful things.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f7f8f3",
        padding: "65px 80px",
        color: "#283c30",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px", fontSize: 22 }}>
        <span style={{ fontSize: 46, letterSpacing: "-3px" }}>{profile.initials}·</span>
        <span>{profile.name} / builds & experiments</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: "-4px",
          lineHeight: 1.12,
          marginTop: 65,
        }}
      >
        <span>Ideas, turned into</span>
        <span style={{ color: "#627b4f" }}>useful things.</span>
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 46, fontSize: 22, color: "#75816a" }}>
        <span>{projects.length} projects</span>
        <span>·</span>
        <span>AI · developer tools · automation</span>
      </div>
    </div>,
    size,
  );
}
