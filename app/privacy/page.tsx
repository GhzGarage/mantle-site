import type { Metadata } from "next";
import LegacyDocument from "@/components/LegacyDocument";
import { readStaticDocument } from "@/lib/static-document";

const privacy = readStaticDocument("privacy.html");
export const metadata: Metadata = { title: "Privacy Policy", description: "Mantle privacy policy", alternates: { canonical: "/privacy/" } };
export default function Privacy() { return <LegacyDocument {...privacy} />; }
