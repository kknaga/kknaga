"use client";
import { useCallback, useEffect, useState } from "react";
import ChatBox from "./Chatbox";

export default function BarelyGPT({ tokens }: { tokens: string[] }) {
  const [messages, setMessages] = useState<string[]>([]);
  const isUserTurn = messages.length % 2 === 0;
  const [userInput, setUserInput] = useState("");
  const [inProgressMessage, setInProgressMessage] = useState<string | null>(
    null
  );

  const send = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!userInput) return;

      setUserInput("");
      setMessages((prev) => prev.concat(userInput));
    },
    [userInput]
  );

  useEffect(() => {
    (async () => {
      if (isUserTurn) {
        return;
      }
      const msg: string[] = [];

      let shouldStop = Math.random() < 0.1;
      do {
        const nextToken = tokens[Math.floor(Math.random() * tokens.length)];
        msg.push(nextToken);
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 1000)
        );
        setInProgressMessage(msg.join(" "));
        shouldStop = Math.random() < 0.1;
      } while (!shouldStop);
      setMessages((m) => m.concat(msg.join(" ")));
      setInProgressMessage(null);
    })();
  }, [isUserTurn]);

  return (
    <div>
      <div className="chat-full">
        <ChatBox
          botId={1}
          messages={messages}
          inProgressMessage={inProgressMessage}
        />

        <form className="input" onSubmit={send}>
          <input
            type="text"
            value={userInput}
            placeholder="Type something..."
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => send()}
            disabled={!isUserTurn || !userInput}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
