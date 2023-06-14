import '../App.scss';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Mypage } from './Mypage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Mypage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
