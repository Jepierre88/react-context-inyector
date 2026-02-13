import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSmartComponent from "../pages/modules/home/home-smart/home-smart.component";
import StrategySmartComponent from "../pages/modules/strategy/strategy-smart/strategy-smart.component";
import NavHeader from "@/shared/components/nav-header.component";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/" element={<HomeSmartComponent/>}/>
        <Route path="/strategy" element={<StrategySmartComponent/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}