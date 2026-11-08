import { FREE_SHADER_FAMILIES } from "@/lib/pricing";

export type ShaderMode = 0 | 1 | 2 | 3;

export type Scene = {
  id: string;
  label: string;
  mode: ShaderMode;
  colors: [string, string, string, string];
};

export type Family = {
  label: string;
  count: number;
  free: boolean;
  scenes: Scene[];
};

const family = (label: string, count: number, scenes: Scene[]): Family => ({
  label,
  count,
  free: FREE_SHADER_FAMILIES.includes(label),
  scenes,
});

export const FAMILIES: Family[] = [
  family("Gradient", 10, [
    { id: "sg-mandarin", label: "Mandarin", mode: 0, colors: ["#ff6a1a", "#c73c00", "#fd4912", "#ffb07a"] },
    { id: "sg-nighty-night", label: "Nighty Night", mode: 0, colors: ["#212121", "#606080", "#8d7dca", "#2c2a3a"] },
    { id: "sg-mint", label: "Mint", mode: 0, colors: ["#94ffd1", "#6bf5ff", "#f4f4f1", "#7fe3c0"] },
    { id: "sg-universe", label: "Universe", mode: 0, colors: ["#0a0614", "#5606ff", "#fe8989", "#120a2a"] },
  ]),
  family("Marble", 3, [
    { id: "marble-marble", label: "Marble", mode: 1, colors: ["#1a4537", "#4f8f78", "#efe7d3", "#e6c06a"] },
    { id: "marble-ink", label: "Ink", mode: 1, colors: ["#121a3a", "#2c3a7c", "#9aa6d8", "#ff5533"] },
    { id: "marble-aurora", label: "Aurora", mode: 1, colors: ["#1c0a47", "#0c9b82", "#5dffc8", "#b4ffe6"] },
  ]),
  family("Gallery", 10, [
    { id: "paper-mesh", label: "Mesh", mode: 0, colors: ["#003f5c", "#2f4b7c", "#ff7c43", "#f9c79a"] },
    { id: "paper-warp", label: "Warp", mode: 1, colors: ["#1b1530", "#5b4b8a", "#d9c8f5", "#fff4e6"] },
  ]),
  family("Liquid", 4, [
    { id: "liquid-molten", label: "Molten", mode: 3, colors: ["#14030b", "#5c0d22", "#ff4a1c", "#ffe6cc"] },
    { id: "liquid-aurora", label: "Aurora", mode: 3, colors: ["#010208", "#0a1a40", "#2bffb2", "#8a2cff"] },
  ]),
  family("Dither", 7, [
    { id: "dither-blue", label: "Signal", mode: 2, colors: ["#04060b", "#00b2ff", "#04060b", "#04060b"] },
    { id: "dither-ember", label: "Ember", mode: 2, colors: ["#120503", "#ff5a1f", "#120503", "#120503"] },
    { id: "dither-bone", label: "Bone", mode: 2, colors: ["#101010", "#efe8d8", "#101010", "#101010"] },
  ]),
];

export const HERO_SCENE = FAMILIES[2].scenes[0];

export const poster = ([a, b, c, d]: Scene["colors"]) =>
  `radial-gradient(at 18% 22%, ${c} 0, transparent 55%), radial-gradient(at 82% 30%, ${d} 0, transparent 50%), radial-gradient(at 60% 85%, ${b} 0, transparent 60%), ${a}`;
