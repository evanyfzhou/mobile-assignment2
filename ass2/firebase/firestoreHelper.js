import { collection, addDoc, updateDoc, deleteDoc, doc } from "@firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(goal) {
  try {
    const docRef = await addDoc(collection(database, "expenses"), goal);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateInDB(goal, id) {
  if (!id) {
    console.error("Document ID is not defined!");
    return;
  }
  try {
    const docRef = doc(collection(database, "expenses"), id);
    await updateDoc(docRef, goal);
    console.log("Document updated with ID: ", id);
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