import type { Metadata } from "next";
import LegacyDocument from "@/components/LegacyDocument";
import { readStaticDocument } from "@/lib/static-document";

const terms = readStaticDocument("terms.html");
export const metadata: Metadata = { title: "Terms of Service", description: "Mantle Terms of Service", alternates: { canonical: "/terms/" } };
export default function Terms() { return <LegacyDocument {...terms} />; }
