import type { Metadata } from "next";
import LegacyDocument from "@/components/LegacyDocument";
import { readStaticDocument } from "@/lib/static-document";

const serverTerms = readStaticDocument("server-terms.html");
export const metadata: Metadata = { title: "Community Server Operator Terms", description: "Mantle Community Server Operator Terms", alternates: { canonical: "/server-terms/" } };
export default function ServerTerms() { return <LegacyDocument {...serverTerms} />; }
