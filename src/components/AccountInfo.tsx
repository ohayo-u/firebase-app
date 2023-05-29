import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface Props {
  user: any;
}

export const AccountInfo: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState<any>(false);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <li style={{ position: "relative" }}>
      <img
        src={props.user?.photoURL}
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
};
