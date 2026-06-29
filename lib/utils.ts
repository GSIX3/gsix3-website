import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSectionId(
  id: string,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(id);
  if (!element) return;

  const navHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 64;

  const top =
    element.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({ top: Math.max(0, top), behavior });
}

export function getHashFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  return href.slice(hashIndex + 1);
}

export function getPathFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  return path || "/";
}

export function handleSectionNavClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
  onNavigate?: () => void,
) {
  const hash = getHashFromHref(href);
  if (!hash) return;

  const path = getPathFromHref(href);
  if (path !== "/" || pathname !== "/") return;

  event.preventDefault();
  onNavigate?.();
  scrollToSectionId(hash, "auto");
  window.history.pushState(null, "", `/#${hash}`);
}
