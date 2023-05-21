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
    <li style={{ position: "relative" }}>
      <img
        src={user?.photoURL}
        onClick={() => setVisible(!visible)}
        style={{ width: "40px", borderRadius: "50%", cursor: "pointer" }}
      />
      <button
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "-10px",
          fontSize: "3px",
          visibility: visible ? "visible" : "hidden",
        }}
        onClick={logout}
      >
        ログアウト
      </button>
    </li>
  );
}
