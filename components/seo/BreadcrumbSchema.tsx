// components/seo/BreadcrumbSchema.tsx

import JsonLd from "./JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = generateBreadcrumbSchema(items);
  return <JsonLd data={schema} />;
}
