import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";

export const createNewChat = async (title = "New Chat") => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatRef = await addDoc(collection(db, "users", user.uid, "chats"), {
    title: title,
    lastUpdated: serverTimestamp(),
  });

  return chatRef.id;
};

export const updateChatTitle = async (chatId, newTitle) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatRef = doc(db, "users", user.uid, "chats", chatId);

  await setDoc(
    chatRef,
    {
      title: newTitle,
      lastUpdated: serverTimestamp(),
    },
    { merge: true }
  );
};

export const addMessageToChat = async (chatId, content, role) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const messageRef = await addDoc(
    collection(db, "users", user.uid, "chats", chatId, "messages"),
    {
      content: content,
      timestamp: serverTimestamp(),
      role: role,
    }
  );

  // Update the chat's lastUpdated field
  await setDoc(
    doc(db, "users", user.uid, "chats", chatId),
    {
      lastUpdated: serverTimestamp(),
    },
    { merge: true }
  );

  return messageRef.id;
};
