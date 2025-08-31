import { BENEFITS } from "@/data/data";

export const BENEFITS_MAP = Object.fromEntries(BENEFITS.map(b => [b.value, b.display]));