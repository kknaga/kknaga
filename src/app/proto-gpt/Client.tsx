import Image from "next/image";
import ProtoGPT from "@/app/proto-gpt/components/ProtoGPT";
import { defaultCorpus } from "./constants";
import BarelyGPT from "@/app/proto-gpt/components/BarelyGPT";
import { tokenize } from "@/app/proto-gpt/tokenize";
import Corpus from "@/app/proto-gpt/components/Corpus";
import Embeddings from "@/app/proto-gpt/components/Embeddings";
import Tokenization from "@/app/proto-gpt/components/Tokenization";
import QueryKeyValue from "@/app/proto-gpt/components/QueryKeyValue";
import AttendGPTIntegration from "@/app/proto-gpt/components/AttendGPTIntegration";
import TrainingLoopVisualization from "@/app/proto-gpt/components/Training";
import PredictionsLoss from "@/app/proto-gpt/components/Loss";
import WeightedOutput from "@/app/proto-gpt/components/WeightedOutput";
import AttentionMapsIntegration from "@/app/proto-gpt/components/AttentionMapsIntegration";
import PrimeGPT from "@/app/proto-gpt/components/PrimeGPT";
import Link from "next/link";
import ProtoGPTDemo from "./components/ProtoGPTDemo";

export default function Home({ stepId = "levels-gpt" }: { stepId?: string }) {
  const tokens = tokenize(defaultCorpus);
  const steps = [
    {
      id: "levels-gpt",
      image: "/logo.png",
      headingType: 1,
      heading: "ProtoGPT",
      text: "Learn by building and interacting with the four ProtoGPT bots",
      component: <ProtoGPT />,
    },
    {
      id: "corpus",
      heading: "Corpus",
      text: "The words the chatbot learns from.",
      component: <Corpus defaultCorpus={defaultCorpus} />,
    },
    {
      id: "tokens",
      heading: "Tokens",
      text: "Breaking corpus into building blocks.",
      component: <Tokenization corpus={defaultCorpus} />,
    },
    {
      id: "random-gpt",
      image: "/1.png",
      headingType: 2,
      heading: "BarelyGPT",
      text: "Chat with BarelyGPT",
      component: <BarelyGPT tokens={tokenize(defaultCorpus)} />,
    },
    {
      id: "embeddings",
      heading: "Embeddings",
      text: "Tokens as vectors in space.",
      component: <Embeddings tokens={[]} />,
    },
    {
      id: "qkv",
      heading: "Query, Key, Value",
      text: "Projecting information into separate roles.",
      component: <QueryKeyValue />,
    },
    {
      id: "proto-gpt",
      image: "/2.png",
      headingType: 2,
      heading: "BetaGPT",
      text: "Chat with BetaGPT",
      component: <ProtoGPTDemo />,
    },
    {
      id: "attention-map",
      heading: "Attention Maps",
      text: "Tokens influencing each other.",
      component: <AttentionMapsIntegration />,
    },
    {
      id: "weighted-output",
      heading: "Weighted Output",
      text: "New meaning based on context.",
      component: <WeightedOutput />,
    },
    {
      id: "attend-gpt",
      image: "/3.png",
      headingType: 2,
      heading: "AttendGPT",
      text: "Chat with AttendGPT",
      component: <AttendGPTIntegration tokens={tokens} />,
    },
    {
      id: "training",
      heading: "Training Loop",
      text: "Forward, backward, learn.",
      component: <TrainingLoopVisualization />,
    },
    {
      id: "prediction",
      heading: "Predictions & Loss",
      text: "Did it get it right?",
      component: <PredictionsLoss />,
    },
    {
      id: "prime-gpt",
      image: "/4.png",
      headingType: 2,
      heading: "PrimeGPT",
      text: "Chat with PrimeGPT",
      component: <PrimeGPT />,
    },
  ];
  const activeStep = steps.find((s) => s.id === stepId) || steps[0];
  const nextStep = steps[steps.findIndex((s) => s.id === activeStep.id) + 1];
  const prevStep = steps[steps.findIndex((s) => s.id === activeStep.id) - 1];

  return (
    <div>
      <Link href="/proto-gpt" className="header">
        <div className="timelineImage">
          <Image
            src={steps[0].image || "/dot.png"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div>
          <h1>{steps[0].heading}</h1>
          <p>{steps[0].text}</p>
        </div>
      </Link>
      <div className="sides">
        <div className="timeline">
          {steps.slice(1).map((step, i) => (
            <Link
              href={`/proto-gpt/${step.id}`}
              key={i}
              className={`timelineItem ${
                activeStep.id === step.id ? "active" : ""
              }`}
            >
              <div className="timelineImage">
                <Image
                  src={step.image ? step.image : "/dot.png"}
                  width={step.headingType === 2 ? 100 : 60}
                  height={step.headingType === 2 ? 100 : 60}
                  alt=""
                />
              </div>
              <div className="timelineText">
                {step.headingType === 2 ? (
                  <h2>{step.heading}</h2>
                ) : (
                  <h3>{step.heading}</h3>
                )}
                <p>{step.text}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="activeStep">
          <div className="flex side-header">
            {activeStep.headingType === 2 && (
              <Image
                src={activeStep.image ? activeStep.image : "/dot.png"}
                width={100}
                height={100}
                alt=""
              />
            )}
            <div>
              {activeStep.id === "levels-gpt" ? (
                <h2>Introduction</h2>
              ) : (
                <>
                  <h2>{activeStep.heading}</h2>
                  <p>{activeStep.text}</p>
                </>
              )}
            </div>
          </div>
          <>{activeStep.component}</>

          <div className="stepper">
            <div>
              {prevStep && (
                <Link className="btn" href={`/proto-gpt/${prevStep.id}`}>
                  <div>Previous</div>
                  <p>
                    {prevStep.id === "levels-gpt"
                      ? "Introduction"
                      : prevStep.heading}
                  </p>
                </Link>
              )}
            </div>

            <div>
              {nextStep && (
                <Link className="btn" href={`/proto-gpt/${nextStep.id}`}>
                  <div>Next</div>
                  <p>{nextStep.heading}</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
