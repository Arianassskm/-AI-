import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupViewport } from "./utils/viewport";

// 设置移动端视口
setupViewport();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
