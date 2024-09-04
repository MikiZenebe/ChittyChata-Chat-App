import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  // "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  // "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  // "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  // "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
  "bg-gradient-to-r from-[#712c4a57] to-[#ff006e] text-red-100 border-[1px] border-[#712c4a57]",
  "bg-gradient-to-r from-[#ffd60a2a] to-[#ffd60a] text-yellow-50 border-[1px] border-[#ffd60a2a]",
  "bg-gradient-to-r from-[#06d6a02a] to-[#06d6a0] text-green-100 border-[1px] border-[#06d6a02a]",
  "bg-gradient-to-r from-[#4cc9f02a] to-[#4cc9f0] text-blue-50 border-[1px] border-[#4cc9f02a]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};

export const animationDefaultOption = {
  loop: true,
  autoplay: true,
  animationData,
};
