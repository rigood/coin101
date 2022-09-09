import { HashRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path=":coinId/*" element={<Coin />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default Router;
