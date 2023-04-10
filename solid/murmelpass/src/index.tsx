/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import MainPage from "./components/pages/main";

render(() => <MainPage />, document.getElementById("root") as HTMLElement);
