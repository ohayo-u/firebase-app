import { GoogleMigration } from "./GoogleMigration";
import { AccountInfo } from "./AccountInfo";

export function Header({ setIsModalOpen, user }) {
  const accountInfoOrSignIn = user.isAnonymous ? (
    <GoogleMigration user={user} />
  ) : (
    <AccountInfo user={user} />
  );

  return (
    <header>
      <div className="header-logo"></div>
      <nav>
        <ul className="menu">
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
