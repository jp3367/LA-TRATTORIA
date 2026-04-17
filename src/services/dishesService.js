import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION = 'dishes';

// Obtener todos los platos
export async function getDishes() {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Añadir un plato
export async function addDish(dish) {
  const docRef = await addDoc(collection(db, COLLECTION), dish);
  return { id: docRef.id, ...dish };
}

// Eliminar un plato
export async function deleteDish(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}

// Importar varios platos de golpe (batch write)
export async function importDishes(dishes) {
  const batch = writeBatch(db);
  dishes.forEach((dish) => {
    const ref = doc(collection(db, COLLECTION));
    batch.set(ref, dish);
  });
  await batch.commit();
}

// Borrar toda la colección antes de reimportar
export async function clearDishes() {
  const snapshot = await getDocs(collection(db, COLLECTION));
  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
