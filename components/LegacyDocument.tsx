type LegacyDocumentProps = { body: string; styles: string };

/** Renders approved marketing markup during the gradual React migration. */
export default function LegacyDocument({ body, styles }: LegacyDocumentProps) {
  return <><style dangerouslySetInnerHTML={{ __html: styles }} /><div dangerouslySetInnerHTML={{ __html: body }} /></>;
}
