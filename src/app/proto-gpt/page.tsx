import Page from "./Client";

export default async function Server({
  params,
}: {
  params: Promise<{ step?: string }>;
}) {
  const { step } = await params;

  return <Page stepId={step} />;
}
