import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../pages";
import Game from "../pages/Game";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route path="/" element={<Home />} /> 
      <Route path="/game" element={<Game />} />
    </>
  )
);

export default router;