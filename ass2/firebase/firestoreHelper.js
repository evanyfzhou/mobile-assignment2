import { collection, addDoc, deleteDoc, doc } from "@firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(goal) {
  try {
    const docRef = await addDoc(collection(database, "expenses"), goal);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, "expenses", id));
  } catch (err) {
    console.log(err);
  }
}