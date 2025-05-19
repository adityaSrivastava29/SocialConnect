import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./module/header"
import Home from "./Home"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Router
