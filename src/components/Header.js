import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"

export function Header({setIsModalOpen, user}) {

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  // const logout = async() => {
  //   await signOut(auth);
  //   navigate("/login/");
  // }

    return (
      <header>
        <div className='header-logo'>
          <img src={logo} />
        </div>
        <nav>
          <ul className="menu">
            <li><a href="#food-index">仲良し食材</a></li>
            <li><a href="#dish-index">作った料理</a></li>
            <li><button onClick={() => navigate('/login')}>ログアウト</button></li>
            <li><button id="add" onClick={() => setIsModalOpen(true)}>料理の追加</button></li>
            <li id="account">
              <img src={user?.photoURL} onClick={() => setVisible(!visible)}/>
              <button 
                className="logout" 
                // onClick={logout}
                style={{ visibility: visible ? "visible" : "hidden"}}
                >
                  ログアウト</button>
            </li>
          </ul>
        </nav>
      </header>
    );
}

