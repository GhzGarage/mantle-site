import LegacyDocument from "@/components/LegacyDocument";
import { readStaticDocument } from "@/lib/static-document";

const home = readStaticDocument("index.html");
export default function Home() { return <LegacyDocument {...home} />; }
