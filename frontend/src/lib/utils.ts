import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeDifference(referenceTimeString: string) {
  const referenceTime = new Date(referenceTimeString);
  const now = new Date();
  //@ts-ignore
  const timeDiff = now - referenceTime; // Difference in milliseconds
  const hours = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours

  return Math.floor(hours);
}