import "libs/polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "context/Theme";
import { OptionsProvider } from "context/Options";
import { TodoProvider } from "context/Todo";
import Todo from "components/Todo";
import TodoContainer from "components/TodoContainer";
import browser from "webextension-polyfill";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 14px;
    min-height: 300px;
  }
`;
const Popup = () => {
browser.runtime.sendMessage({ greeting: "getTabInfo" });
browser.runtime.onMessage.addListener((msg) => {
  if (msg.greeting === 'sendTabInfo') {
    const { tabs } = msg.payload;
    console.log('Popup:msg:', msg);
    console.log('Popup:msg.tabs:', tabs);
    // let tabs_min = [];
    // tabs.forEach((tab) => {
    //   tabs_min.push({
    //     'id': tab.id,
    //     'text': tab.title,
    //     'isDone': false,
    //     'active': tab.active,
    //     'added': new Date().toDateString()
    //   });
    // });
    // console.log('Popup:tabs_min:', tabs_min);
    // console.log('Popup:Number of tabs:', tabs.length);
    // dispatch({ type: INIT, payload: tabs_min });
  }
  return true;
});

  return (<div/>
    // <OptionsProvider>
    //   <ThemeProvider>
    //     <GlobalStyle />
    //     <TodoProvider>
    //       <TodoContainer>
    //         <Todo />
    //       </TodoContainer>
    //     </TodoProvider>
    //   </ThemeProvider>
    // </OptionsProvider>
  );
};
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Popup />, root);

  // initRef.current = true;
