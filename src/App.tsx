import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { socket } from "./socket";
import { Aside } from "./components/aside";
import { Input } from "./components/input";
import { Message as MessageType } from "../types";
import { Message } from "./components/message";

const Main = styled.main`
  grid-area: main;
  display: flex;
  flex-direction: column;
  color: var(--text);
  overflow-y: auto;
  justify-content: space-between;

  h1 {
    padding: 1rem;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text);

    span {

      cursor: pointer;
      font-weight: bold;
    }
  }

  & > div {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin: 0;
    flex: 1;

  }
`;

function App() {
  const divRef = useRef<HTMLDivElement>(null);
  const [id, setId] = useState<string>("")
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    socket.on("connect", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const room = urlParams.get('c') || socket.id;

      window.history.replaceState(null, "", `?c=${room}`);

      setId(room);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);

      setTimeout(() => {
        divRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    }
  }, [])

  const handleOnClick = () => {
    const URL = `${window.location.origin}?c=${id}`;
    navigator.clipboard.writeText(URL)
  }

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const keyCode = event.code;

    if (keyCode === "Enter") {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      const message = input.value;

      if (message) {
        socket.emit("message", message);
        input.value = "";
      }
    }
  };

  return (
    <>
      <Aside></Aside>
      <Main>
        <h1># <span onClick={handleOnClick}>{id}</span></h1>
        <div>
          {messages.map((message, index) => (
            <Message
              index={message.username.length}
              key={index}
              message={message.message}
              time={message.time}
              userID={message.userID}
              username={message.username}
            ></Message>
          ))}
          <div ref={divRef}></div>
        </div>
        <Input onKeyDown={handleOnKeyDown} placeholder="Tell my your secrets..." />
      </Main>
    </>
  )
}

export default App
