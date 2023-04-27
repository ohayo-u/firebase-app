import { GoogleMigration } from "./GoogleMigration";
import { AccountInfo } from "./AccountInfo";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export function Header({ setIsModalOpen, user }) {
  const [accountInfoOrSignIn, setAccountInfoOrSignIn] = useState();
  // なぜか匿名ログインからgoogleログインに切り替えてもuseEffectが動かないので要修正
  useEffect(() => {
    setAccountInfoOrSignIn(
      user.isAnonymous ? <GoogleMigration /> : <AccountInfo user={user} />
    );
  }, [user.isAnonymous]);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <header>
      <nav>
        <ul className="menu">
          <li>
            <button
              style={{ visibility: user.isAnonymous ? "visible" : "hidden" }}
              onClick={logout}
              id="to_login_page"
            >
              ログイン画面へ
            </button>
          </li>
          <li>
            <a href="#food-index">仲良し食材</a>
          </li>
          <li>
            <a href="#dish-index">作った料理</a>
          </li>
          <li>
            <button id="add" onClick={() => setIsModalOpen(true)}>
              料理の追加
            </button>
          </li>
          {accountInfoOrSignIn}
        </ul>
      </nav>
    </header>
  );
}
