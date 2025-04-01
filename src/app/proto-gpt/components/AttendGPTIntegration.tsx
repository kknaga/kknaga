import React from "react";
import AttendGPT from "@/app/proto-gpt/components/AttendGPT";
import AttendGPTExplanation from "@/app/proto-gpt/components/AttendGPTExplanation";

const AttendGPTIntegration: React.FC<{ tokens: string[] }> = ({ tokens }) => {
  return (
    <div>
      <AttendGPTExplanation />
      <AttendGPT tokens={tokens} />
    </div>
  );
};

export default AttendGPTIntegration;
