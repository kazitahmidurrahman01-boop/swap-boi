import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBDT(amount?: number | null): string {
  if (amount === undefined || amount === null) return '৳0';
  return `৳${Number(amount).toLocaleString('en-IN')}`;
}

export function formatDistance(distanceKm?: number): string {
  if (distanceKm === undefined || distanceKm === null) return 'Nearby';
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m away`;
  }
  return `${distanceKm.toFixed(1)} km away`;
}

export function getConditionBadge(condition: string) {
  switch (condition) {
    case 'new':
      return { label: 'Brand New', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    case 'like_new':
      return { label: 'Like New', color: 'bg-green-100 text-green-800 border-green-200' };
    case 'good':
      return { label: 'Good', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    case 'acceptable':
      return { label: 'Acceptable', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    default:
      return { label: condition, color: 'bg-gray-100 text-gray-800 border-gray-200' };
  }
}

export function getListingTypeBadge(type: string) {
  switch (type) {
    case 'sell':
      return { label: 'Sell', bg: 'bg-emerald-600 text-white', text: 'text-emerald-700' };
    case 'exchange':
      return { label: 'Exchange', bg: 'bg-emerald-700 text-white', text: 'text-emerald-800' };
    case 'rent':
      return { label: 'Rent', bg: 'bg-teal-700 text-white', text: 'text-teal-800' };
    case 'donate':
      return { label: 'Donate (Free)', bg: 'bg-green-600 text-white', text: 'text-green-700' };
    default:
      return { label: type, bg: 'bg-gray-600 text-white', text: 'text-gray-700' };
  }
}
