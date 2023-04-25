import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export function AccountInfo({ user }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <li id="account">
      <img src={user?.photoURL} onClick={() => setVisible(!visible)} />
      <button
        className="logout"
        onClick={logout}
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        ログアウト
      </button>
    </li>
  );
}
