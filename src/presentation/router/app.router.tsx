import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSmartComponent from "../pages/modules/home/home-smart/home-smart.component";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSmartComponent/>}/>
      </Routes>
    </BrowserRouter>
  )
}