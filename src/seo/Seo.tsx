import { skipToken, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";
import type { Sneaker } from "../types/sneaker";
import { getPageMetadata } from "./metadata";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function Seo() {
  const { pathname } = useLocation();
  const match = useMatch("/sneaker/:styleID");
  const { data, error } = useQuery<Sneaker>({ queryKey: ["sneakerPrices", match?.params.styleID], queryFn: skipToken });
  const missing = axios.isAxiosError(error) && error.response?.status === 404;
  const metadata = getPageMetadata(pathname, match ? data : undefined, missing);
  const structuredData = metadata.structuredData ? JSON.stringify(metadata.structuredData).replace(/</g, "\\u003c") : "";

  useEffect(() => {
    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", metadata.robots);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Sneaker Spotter");
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", metadata.canonical);
    setMeta("property", "og:image", metadata.image);
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", metadata.image);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = metadata.canonical;
    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (structuredData) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seoJsonld = "true";
        document.head.appendChild(script);
      }
      script.textContent = structuredData;
    } else script?.remove();
  }, [metadata.title, metadata.description, metadata.robots, metadata.canonical, metadata.image, structuredData]);

  return null;
}
