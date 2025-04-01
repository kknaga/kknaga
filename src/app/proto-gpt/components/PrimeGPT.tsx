/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ChatBox from "./Chatbox";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletion {
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface MLCEngine {
  reload: (model: string) => Promise<void>;
  chat: {
    completions: {
      create: (options: {
        messages: ChatMessage[];
        temperature?: number;
        max_tokens?: number;
        stream?: boolean;
      }) => Promise<ChatCompletion | AsyncGenerator<any>>;
    };
  };
  getMessage: () => Promise<string>;
  interruptGenerate: () => void;
}

export default function PrimeGPT() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "You are PrimeGPT, the most advanced AI in the ProtoGPT learning platform. Users have progressed through BarelyGPT (basic token randomization), BetaGPT (token positions and structured predictions), and AttendGPT (self-attention mechanisms) before reaching you. You represent the culmination of the learning journey, demonstrating how all these concepts combine into a fully-functional transformer model. Explain concepts like tokenization, embeddings, attention mechanisms, and neural network training when relevant. Keep responses educational, brief, and clear to help users understand how modern language models actually work.",
    },
  ]);
  const [displayMessages, setDisplayMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [inProgressMessage, setInProgressMessage] = useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Loading model...");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const engineRef = useRef<MLCEngine | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeWebLLM = async () => {
      try {
        const webllm = await import("@mlc-ai/web-llm");

        if (!isMounted) return;

        setLoadingStatus("Initializing language model...");

        const modelName = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

        const engine = await webllm.CreateMLCEngine(modelName, {
          initProgressCallback: (report) => {
            if (!isMounted) return;
            const { progress = 0, text = "" } = report;
            setLoadingProgress(progress * 100);
            setLoadingStatus(text || "Loading model...");
          },
        });

        if (!isMounted) return;

        engineRef.current = engine as MLCEngine;
        setIsModelReady(true);
        setLoadingStatus("Model ready!");
        setLoadingProgress(100);
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to initialize WebLLM:", error);
        setLoadingStatus("Failed to load model. Using fallback mode.");
        setIsModelReady(true);
      }
    };

    initializeWebLLM();

    return () => {
      isMounted = false;
    };
  }, []);

  const generateResponse = useCallback(async () => {
    if (!engineRef.current || messages.length === 0) return;

    setIsGenerating(true);

    try {
      const chatMessages = [...messages];

      const chunks = (await engineRef.current.chat.completions.create({
        messages: chatMessages,
        temperature: 0.7,
        stream: true,
      })) as AsyncGenerator<any>;

      let generatedText = "";
      for await (const chunk of chunks) {
        const content = chunk.choices[0]?.delta?.content || "";
        generatedText += content;
        setInProgressMessage(generatedText);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: generatedText },
      ]);

      setDisplayMessages((current) => [...current, generatedText]);

      setInProgressMessage(null);
    } catch (error) {
      console.error("Error generating response:", error);

      const fallbackResponse =
        "I'm having trouble generating a response right now. This could be due to browser limitations or model loading issues. You can try a simpler question or reload the page.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallbackResponse },
      ]);

      setDisplayMessages((current) => [...current, fallbackResponse]);
    } finally {
      setIsGenerating(false);
    }
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!userInput.trim() || isGenerating) return;

    const userMessage = { role: "user" as const, content: userInput };

    setMessages((prev) => [...prev, userMessage]);
    setDisplayMessages((current) => [...current, userInput]);

    setUserInput("");
  }, [userInput, isGenerating]);

  useEffect(() => {
    if (
      isModelReady &&
      messages.length > 1 &&
      messages[messages.length - 1].role === "user"
    ) {
      generateResponse();
    }
  }, [messages, isModelReady, generateResponse]);

  return (
    <div>
      <div className="chat-full">
        {!isModelReady ? (
          <div
            className="loading-container"
            style={{ padding: "20px", textAlign: "center" }}
          >
            <h3>{loadingStatus}</h3>
            <div
              className="progress-bar"
              style={{
                height: "20px",
                width: "100%",
                backgroundColor: "#f5e6b8",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${loadingProgress}%`,
                  backgroundColor: "#8C6E54",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              Loading a language model directly in your browser. This may take a
              moment...
            </p>
          </div>
        ) : (
          <ChatBox
            botId={4}
            messages={displayMessages}
            inProgressMessage={inProgressMessage}
          />
        )}

        <div className="input">
          <input
            type="text"
            value={userInput}
            placeholder={
              isModelReady ? "Chat with PrimeGPT..." : "Loading model..."
            }
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={!isModelReady || isGenerating}
          />
          <button
            className="btn"
            onClick={handleSend}
            disabled={!isModelReady || !userInput.trim() || isGenerating}
          >
            Send
          </button>
        </div>
      </div>

      <div className="example">
        <h3>About PrimeGPT</h3>
        <p>
          PrimeGPT showcases a fully functional transformer language model
          running directly in your browser. Unlike the simpler models in
          previous levels, PrimeGPT uses WebLLM to run an actual neural network
          on your device's GPU through WebGPU.
        </p>
        <ul>
          <li>
            Runs a compact but powerful language model directly in the browser
          </li>
          <li>
            Uses attention mechanisms to understand context and relationships
          </li>
          <li>
            Processes your input using the same principles as large commercial
            AI systems
          </li>
          <li>
            Demonstrates the culmination of the concepts taught in previous
            levels
          </li>
        </ul>
        <p>
          Try asking PrimeGPT questions about how language models work, or have
          a conversation about any topic to see transformer models in action!
        </p>
      </div>
    </div>
  );
}
