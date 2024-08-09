import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";

export const createNewChat = async (title = "New Chat") => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatRef = await addDoc(collection(db, "users", user.uid, "chats"), {
    title: title,
    lastUpdated: serverTimestamp(),
    messages: [],
  });

  return chatRef.id;
};

export const addMessageToChat = async (chatId, content, role) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatRef = doc(db, "users", user.uid, "chats", chatId);
  const messagesRef = collection(chatRef, "messages");

  const newMessage = {
    content,
    role,
    timestamp: new Date().toISOString(),
  };

  await addDoc(messagesRef, newMessage);

  await setDoc(chatRef, { lastUpdated: serverTimestamp() }, { merge: true });

  return newMessage;
};



export const getChatMessages = async (chatId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatRef = doc(db, "users", user.uid, "chats", chatId);
  const chatDoc = await getDoc(chatRef);

  if (!chatDoc.exists()) {
    console.error(`Chat with ID ${chatId} does not exist for user ${user.uid}`);
    throw new Error("Chat does not exist");
  }

  const chatData = chatDoc.data();
  const messages = chatData.messages || [];

  // Convert Firestore Timestamps to JavaScript Date objects
  const messagesWithDates = messages.map((msg) => ({
    ...msg,
    timestamp: msg.timestamp.toDate(),
  }));

  return messagesWithDates;
};

export const deleteChat = async (chatId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatRef = doc(db, "users", user.uid, "chats", chatId);
  await deleteDoc(chatRef);
};


export const saveChat = async (chatId, messages) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatRef = doc(db, "users", user.uid, "chats", chatId);

  // Convert message timestamps to Firestore Timestamps
  const messagesWithTimestamps = messages.map((msg) => ({
    ...msg,
    timestamp: Timestamp.fromDate(new Date(msg.timestamp)),
  }));

  await setDoc(chatRef, { messages: messagesWithTimestamps, lastUpdated: serverTimestamp() }, { merge: true });
};

export const getSavedChats = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const chatsRef = collection(db, "users", user.uid, "chats");
  try {
    const chatsQuery = query(
      chatsRef,
      where("isSaved", "==", true),
      orderBy("lastUpdated", "desc")
    );
    const querySnapshot = await getDocs(chatsQuery);
    const chats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return chats;
  } catch (error) {
    console.error("Error fetching saved chats:", error);
    // If the index isn't ready, fall back to fetching all chats and filtering client-side
    if (error.code === "failed-precondition") {
      const allChatsSnapshot = await getDocs(chatsRef);
      const allChats = allChatsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return allChats
        .filter((chat) => chat.isSaved)
        .sort((a, b) => b.lastUpdated - a.lastUpdated);
    }
    throw error;
  }
};
