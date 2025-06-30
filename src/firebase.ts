import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyDNGHF6K1Y7mWalnzugPRFmJsci2HHOBGw",
  authDomain: "politician-stock.firebaseapp.com",
  projectId: "politician-stock",
  storageBucket: "politician-stock.appspot.com",
  messagingSenderId: "857697476034",
  appId: "1:857697476034:web:c9413169ced52219dc4a5b",
  measurementId: "G-M8N24YMP56"
};

// Firebase 앱이 이미 초기화되어 있으면 재사용, 아니면 새로 초기화
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 인증 객체 export (로그인/회원가입에 사용)
export const auth = getAuth(app);
export default app; 