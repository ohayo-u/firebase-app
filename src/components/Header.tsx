import { GoogleMigration } from "./GoogleMigration";
import { AccountInfo } from "./AccountInfo";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import React from "react";

interface Props {
  setIsModalOpen: any;
  user: any;
}

export const Header: React.FC<Props> = (props) => {
  // 匿名ログインからgoogleログインに切り替えても表示が切り替わらないので要修正
  const accountInfoOrGoogleMigration = props.user.isAnonymous ? (
    <GoogleMigration />
  ) : (
    <AccountInfo user={props.user} />
  );
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        padding: "20px",
        position: "fixed",
        top: 0,
      }}
    >
      <nav>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <li
            style={{
              display: props.user.isAnonymous ? "inline-flex" : "none",
            }}
          >
            <button
              onClick={logout}
              id="to_login_page"
              style={{ borderRadius: "15px", padding: "5px 15px" }}
            >
              ログイン画面へ
            </button>
          </li>
          <li>
            <a href="#food_index">仲良し食材</a>
          </li>
          <li>
            <a href="#dish_index">作った料理</a>
          </li>
          <li>
            <button
              style={{
                padding: "5px 15px",
                borderRadius: "15px",
                fontSize: "16px",
              }}
              onClick={() => props.setIsModalOpen(true)}
            >
              料理の追加
            </button>
          </li>
          {accountInfoOrGoogleMigration}
        </ul>
      </nav>
    </header>
  );
};
