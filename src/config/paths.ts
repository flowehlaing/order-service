export function normalizeBasePath(value: string | undefined, fallback = "") {
  const raw = (value || fallback).trim();

  if (!raw || raw === "/") {
    return "";
  }

  return `/${raw.replace(/^\/+|\/+$/g, "")}`;
}

export function toGlobalPrefix(basePath: string) {
  return normalizeBasePath(basePath).replace(/^\/+/, "");
}

export function joinUrl(baseUrl: string, path: string) {
  const url = baseUrl.trim().replace(/\/+$/g, "");
  return `${url}${normalizeBasePath(path)}`;
}
