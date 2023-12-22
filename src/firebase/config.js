// 載入firebase核心
import { initializeApp } from 'firebase/app';
// 載入firebase各項服務
import { getFirestore } from 'firebase/firestore';

// 您的網路應用程式的 Firebase 配置
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

const app = initializeApp(firebaseConfig); // 初始化Firebase
export const firestore = getFirestore(app); // 初始化Firebase服務，並匯出

