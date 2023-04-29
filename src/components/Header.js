import { GoogleMigration } from "./GoogleMigration";
import { AccountInfo } from "./AccountInfo";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export function Header({ setIsModalOpen, user }) {
  // 匿名ログインからgoogleログインに切り替えても表示が切り替わらないので要修正
  const accountInfoOrGoogleMigration = user.isAnonymous ? (
    <GoogleMigration />
  ) : (
    <AccountInfo user={user} />
  );
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <header>
      <nav>
        <ul className="menu">
          <li style={{ visibility: user.isAnonymous ? "visible" : "hidden" }}>
            <button onClick={logout} id="to_login_page">
              ログイン画面へ
            </button>
          </li>
          <li>
            <a href="#food-index">仲良し食材</a>
          </li>
          <li>
            <a href="#dish-index">作った料理</a>
          </li>
          <li id="add">
            <button onClick={() => setIsModalOpen(true)}>料理の追加</button>
          </li>
          {accountInfoOrGoogleMigration}
        </ul>
      </nav>
    </header>
  );
}
