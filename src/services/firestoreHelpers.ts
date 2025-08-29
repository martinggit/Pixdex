// src/utils/firestoreHelpers.ts
import { addDoc, collection, getDocs, query, where, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

export async function guardarAlias(nombre: string) {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(collection(db, "puntajes"), where("uid", "==", user.uid));
  const snap = await getDocs(q);

  if (!snap.empty) {
    const docRef = snap.docs[0].ref;
    const data = snap.docs[0].data();
    if (!data.alias) {
      await updateDoc(docRef, { alias: nombre });
    }
  } else {
    await addDoc(collection(db, "puntajes"), {
      uid: user.uid,
      email: user.email,
      alias: nombre,
      puntaje: null,
      fecha: serverTimestamp(),
    });
  }
}

export async function obtenerAliasExistente(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const q = query(collection(db, "puntajes"), where("uid", "==", user.uid));
  const snap = await getDocs(q);

  if (!snap.empty) {
    const docWithAlias = snap.docs.find(d => d.data().alias);
    return docWithAlias?.data().alias || null;
  }
  return null;
}

// Guardar puntaje solo si es mayor al máximo previo
export async function guardarPuntajeMaximo(puntos: number) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    // Traer todos los puntajes del usuario
    const q = query(collection(db, "puntajes"), where("uid", "==", user.uid));
    const snap = await getDocs(q);

    // Obtener alias existente
    const docWithAlias = snap.docs.find(d => d.data().alias);
    const alias = docWithAlias?.data().alias || "Anónimo";

    // Encontrar el documento con puntaje máximo actual
    let docMax = snap.docs[0];
    let maxPuntaje = 0;

    snap.docs.forEach(doc => {
      const p = doc.data().puntaje || 0;
      if (p > maxPuntaje) {
        maxPuntaje = p;
        docMax = doc;
      }
    });

    // Guardar solo si el nuevo puntaje supera el máximo
    if (puntos > maxPuntaje) {
      // Borrar el puntaje máximo anterior
      if (snap.docs.length > 0) {
        await deleteDoc(docMax.ref);
      }

      // Guardar el nuevo puntaje máximo
      await addDoc(collection(db, "puntajes"), {
        uid: user.uid,
        email: user.email,
        alias,
        puntaje: puntos,
        fecha: serverTimestamp(),
      });
      console.log("Nuevo puntaje máximo guardado:", puntos);
    } else {
      console.log("Puntaje no supera el máximo, no se guarda:", puntos);
    }
  } catch (error) {
    console.error("Error al guardar puntaje máximo:", error);
  }
}