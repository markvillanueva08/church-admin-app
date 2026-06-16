export function resolveImageSrc(src: any): string {
  if (!src) return "";
  if (typeof src === "string") return src;
  if (typeof src === "object") {
    return (src.src || src.default || src.url || "").toString();
  }
  return String(src);
}
