// components/seo/GlobalSchema.tsx

import JsonLd from "./JsonLd";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo/schema";

export default function GlobalSchema() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <JsonLd id="organization-schema" data={organizationSchema} />
      <JsonLd id="website-schema" data={websiteSchema} />
    </>
  );
}
