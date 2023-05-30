import React, { useState } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { redirect } from "react-router-dom";

interface Props {
  user: User;
}

export const AccountInfo: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);

  const logout = async () => {
    await signOut(auth);
    return redirect("/login/");
  };
  return (
    <li style={{ position: "relative" }}>
      <img
        src={props.user?.photoURL as string | undefined}
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
