import { useEffect } from "react";
import styled from "styled-components";
import { socket } from "./socket";
import { Aside } from "./components/aside";


const Main = styled.main`
  grid-area: main;
`;

function App() {


  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.off("connect", () => {
        console.log("disconnected");
      });
    }
  }, [])

  return (
    <>
      <Aside></Aside>
      <Main></Main>
    </>
  )
}

export default App
