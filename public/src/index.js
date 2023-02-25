// src/index.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { start } from "./app";
import { init, collectionReferences, queryDocs, addItem } from "./firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPQ--W9ysRj-kJ3DHkLne_JczVXd8Lm7M",
  authDomain: "cloudplayer-e9186.firebaseapp.com",
  projectId: "cloudplayer-e9186",
  storageBucket: "cloudplayer-e9186.appspot.com",
  messagingSenderId: "259837506744",
  appId: "1:259837506744:web:798a41604159844b41704d",
};
initializeApp(firebaseConfig);
const db = getFirestore();
init(db);

export async function initPlayer() {
    const songs = await queryDocs(collectionReferences.songs);
    start(songs[0]);
}

if (window?.page === 'index') {
  initPlayer();
} else if (window?.page === 'add') {
  const form = document.querySelector("#addSongForm");
  form.onsubmit = (e) => {
    e.preventDefault();
    const data = {};
    const inputs = e.target.querySelectorAll("input");
    inputs.forEach(input => {
      if (input.id) {
        let key = input.id;
        data[`${key.charAt(0).toLowerCase()}${key.slice(1)}`] = input.value;
      }
    });
    const r = addItem(collectionReferences.songs, data);
    console.log(r);
  }
}