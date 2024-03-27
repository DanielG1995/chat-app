import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { PrivateRoute } from "./PrivateRoute"
import { Register } from "../pages/Register"
import { Chat } from "../pages/Chat"
import { EmptyPage } from "../pages/EmptyPage"

export const RouterApp = () => {
  return (
    <Router >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<PrivateRoute element={<EmptyPage />} />} />
        <Route path='/chat' element={<PrivateRoute element={<Chat />} />} />
      </Routes>
    </Router>
  )
}
