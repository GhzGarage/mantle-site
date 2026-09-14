const jsonLd = { "@context": "https://schema.org", "@type": "Organization", name: "Mantle", url: "https://mantleplatform.com/", parentOrganization: { "@type": "Organization", name: "QBCore Studios" }, description: "A platform where creators publish Unreal Engine 5 multiplayer worlds and players join instantly." };

export default function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}
