// src/services/firestoreHelpers.ts
import { auth, db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";

/**
 * Guarda o actualiza el alias del usuario
 * Busca si ya existe un documento del usuario, si no existe lo crea
 */
export async function guardarAlias(nombre: string) {
  const user = auth.currentUser;
  if (!user) {
    console.error("No hay usuario autenticado");
    return;
  }

  try {
    // Buscar si ya existe un documento con alias del usuario
    const q = query(
      collection(db, "usuarios"), // Usar colección separada para usuarios
      where("uid", "==", user.uid)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      // Si existe, actualizar el alias
      const docRef = snap.docs[0].ref;
      await updateDoc(docRef, { 
        alias: nombre.trim(),
        updatedAt: serverTimestamp()
      });
      console.log("Alias actualizado");
    } else {
      // Si no existe, crear nuevo documento de usuario
      await addDoc(collection(db, "usuarios"), {
        uid: user.uid,
        email: user.email,
        alias: nombre.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log("Alias creado");
    }
  } catch (error) {
    console.error("Error al guardar alias:", error);
    throw error;
  }
}

/**
 * Obtiene el alias existente del usuario actual
 */
export async function obtenerAliasExistente(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const q = query(
      collection(db, "usuarios"),
      where("uid", "==", user.uid)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      const data = snap.docs[0].data();
      return data.alias || null;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener alias:", error);
    return null;
  }
}

/**
 * Guarda un nuevo puntaje (SIEMPRE crea un nuevo documento)
 * Esta función guarda cada partida jugada, permitiendo un verdadero Top 10
 * 
 * @param puntos - Puntaje obtenido en la partida
 * @returns ID del documento creado
 */
export async function guardarPuntaje(puntos: number): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    console.error("No hay usuario autenticado");
    return null;
  }

  if (puntos < 0) {
    console.error("El puntaje no puede ser negativo");
    return null;
  }

  try {
    // Obtener alias del usuario
    const alias = await obtenerAliasExistente();

    // Crear un NUEVO documento con este puntaje
    const docRef = await addDoc(collection(db, "puntajes"), {
      uid: user.uid,
      email: user.email,
      alias: alias || "Anónimo",
      puntaje: puntos,
      fecha: serverTimestamp(),
    });

    console.log("Puntaje guardado:", puntos, "- ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar puntaje:", error);
    throw error;
  }
}

/**
 * Obtiene el puntaje máximo del usuario actual
 * Útil para mostrar "Tu mejor puntaje: X"
 */
export async function obtenerPuntajeMaximoUsuario(): Promise<number> {
  const user = auth.currentUser;
  if (!user) return 0;

  try {
    const q = query(
      collection(db, "puntajes"),
      where("uid", "==", user.uid),
      orderBy("puntaje", "desc"),
      limit(1)
    );
    
    const snap = await getDocs(q);
    
    if (!snap.empty) {
      return snap.docs[0].data().puntaje || 0;
    }
    return 0;
  } catch (error) {
    console.error("Error al obtener puntaje máximo:", error);
    return 0;
  }
}

/**
 * Obtiene el ranking de posición del usuario
 */
export async function obtenerPosicionUsuario(): Promise<{posicion: number, total: number}> {
  const user = auth.currentUser;
  if (!user) return { posicion: 0, total: 0 };

  try {
    // Obtener el mejor puntaje del usuario
    const mejorPuntaje = await obtenerPuntajeMaximoUsuario();

    // Contar cuántos puntajes son mayores
    const qMayores = query(
      collection(db, "puntajes"),
      where("puntaje", ">", mejorPuntaje)
    );
    const snapMayores = await getDocs(qMayores);

    // Contar total de jugadores únicos
    const qTodos = await getDocs(collection(db, "puntajes"));
    const uidsUnicos = new Set(qTodos.docs.map(doc => doc.data().uid));

    return {
      posicion: snapMayores.size + 1,
      total: uidsUnicos.size
    };
  } catch (error) {
    console.error("Error al obtener posición:", error);
    return { posicion: 0, total: 0 };
  }
}

/**
 * Guarda el puntaje máximo del usuario en /records
 * Si ya existe un récord y el nuevo puntaje es mayor, lo actualiza.
 */
export async function guardarPuntajeMaximo(puntos: number): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    console.error("No hay usuario autenticado");
    return;
  }

  try {
    const recordRef = doc(db, "records", user.uid);
    const recordSnap = await getDoc(recordRef);

    if (recordSnap.exists()) {
      const mejor = recordSnap.data().puntaje || 0;
      if (puntos > mejor) {
        await setDoc(recordRef, {
          uid: user.uid,
          email: user.email,
          puntaje: puntos,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        console.log("Récord actualizado:", puntos);
      } else {
        console.log("No se superó el récord:", mejor);
      }
    } else {
      await setDoc(recordRef, {
        uid: user.uid,
        email: user.email,
        puntaje: puntos,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log("Récord guardado por primera vez:", puntos);
    }
  } catch (error) {
    console.error("Error al guardar puntaje máximo:", error);
    throw error;
  }
}
