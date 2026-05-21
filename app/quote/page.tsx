import ConversationalForm from "@/components/ConversationalForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote - Krishnanuja Renewables",
  description: "Get a customized solar energy quote from Krishnanuja Renewables.",
};

export default function QuotePage() {
  return <ConversationalForm />;
}
