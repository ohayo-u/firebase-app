import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

export function AnonymousSignIn() {
  const anonymousSignIn = () => {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  return (
    <button onClick={anonymousSignIn}>
      <p>サインインせず使う</p>
    </button>
  );
}
