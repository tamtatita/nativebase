import { signInWithPopup } from "firebase/auth";
import { FIREBASE_AUTH, PROVIDER } from "../firebase";

// Đăng nhập với Google
const provider = PROVIDER;
const auth = FIREBASE_AUTH;

export const handleSigninGoogle = async () => {
  console.log(auth, "=================");
  console.log(provider, "=================");

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};
