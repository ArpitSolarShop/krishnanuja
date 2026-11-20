// lib/seo/metadata.ts

import type { Metadata } from "next";
import { siteConfig } from "./config";

export interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path,
  keywords,
  image = siteConfig.ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  // Ensure path is formatted cleanly without trailing slashes unless root
  const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  const canonicalUrl = cleanPath;

  const imageUrl = image.startsWith("http")
    ? image
    : image.startsWith("/")
    ? image
    : `/${image}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_IN",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [siteConfig.name],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@krishnanuja",
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };

  return metadata;
}
