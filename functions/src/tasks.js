import { FieldValue } from "firebase-admin/firestore";
import dbConnect from "./dbConnect.js";

const coll = dbConnect.collection( "tasks" )

export async function getTasks(req, res) {
  const { uid } = req.params;
  // get all tasks by user:
  const tasks = await coll.where('uid', '==', uid).get();
  // arrange tasks in an array:
  const taskArray = tasks.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.send(taskArray);
}

export async function addTask(req, res) {
  const { title, uid } = req.body;
  if(!title || !uid) {
    res.status(401).send({ success: false, message: 'Not a valid request' });
    return;
  }
  const newTask = {
    title,
    uid,
    done: false,
    createdAt: FieldValue.serverTimestamp(),
  }
  await coll.add(newTask);
  getTasks(req, res);
}

