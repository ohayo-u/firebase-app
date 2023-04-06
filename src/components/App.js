import '../App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Mypage } from './Mypage';

export const App = () => {
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path={`/login/`} element={<Login />} />
          <Route path={`/`} element={<Mypage />} />
        </Routes>
        </BrowserRouter>
      </>                                  
    );
}
