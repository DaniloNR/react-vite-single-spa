import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import singleSpaReact from "single-spa-react";

export const { bootstrap, mount, unmount } = singleSpaReact({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  React /* @ts-ignore */,
  ReactDOM: ReactDOMClient,
  rootComponent: App,
  renderType: "createRoot",
  errorBoundary(err, errInfo, props) {
    console.log("====================================");
    console.error(err);
    console.info(errInfo);
    console.log(props);
    console.log("====================================");

    return <h1>An error has occurred {props.error.message}</h1>;
  },
});

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
