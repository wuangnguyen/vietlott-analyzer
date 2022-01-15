import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
//firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyCLC1nAD3AR-mIKBG5oaMs00Khy53k77Ro",
  authDomain: "vietlott-e17f6.firebaseapp.com",
  projectId: "vietlott-e17f6",
  storageBucket: "vietlott-e17f6.appspot.com",
  messagingSenderId: "590261053169",
  appId: "1:590261053169:web:55668fbf37165e3a02eb50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function fetchData() {
  let data = [];
  if (window.localStorage.getItem("bingoData")) {
    data = JSON.parse(window.localStorage.getItem("bingoData"));
  } else {
    const querySnapshot = await getDocs(collection(db, "Vietlott645"));
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    window.localStorage.setItem("bingoData", JSON.stringify(data));
  }

  return data;
}
