import colors from "@/src/constants/colors";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

export async function guardarPuntaje(puntos: number) {
  const user = auth.currentUser;
  if (!user) {
    console.log("No hay usuario logueado, no se guardará el puntaje");
    return;
  }

  try {
    await addDoc(collection(db, "puntajes"), {
      uid: user.uid,
      email: user.email,
      puntaje: puntos,
      fecha: serverTimestamp(),
    });
    console.log(" Puntaje guardado en Firestore");
  } catch (error) {
    console.error(" Error al guardar puntaje:", error);
  }
}

type Props = {
  visible: boolean;
  onConfirm: () => void;
  puntos: number;
  textoBoton?: string;
  titulo?: string;
};

export default function ModalFinJuego({
  visible,
  onConfirm,
  puntos,
  titulo = "¡Juego Terminado!",
  textoBoton = "SALIR",
}: Props) {
  const handlePress = async () => {
    await guardarPuntaje(puntos); // Guardo Puntaje
    onConfirm(); 
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.puntos}>Puntos: {puntos}</Text>

          <TouchableOpacity style={styles.boton} onPress={handlePress}>
            <Text style={styles.botonTexto}>{textoBoton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: colors.fondo,
    padding: 30,
    width: "80%",
    alignItems: "center",
    borderColor: colors.verde,
    borderWidth: 2,
    justifyContent:"center",
  },
  titulo: {
    fontSize: 18,
    fontFamily: "PixelFont",
    color: "white",
    marginBottom: 20,
    textAlign:"center",
  },
  puntos: {
    fontSize: 16,
    color: colors.purpura,
    fontFamily: "PixelFont",
    marginBottom: 30,
    textAlign:"center",
  },
  boton: {
    backgroundColor: colors.purpura,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.verde,
  },
  botonTexto: {
    color: "white",
    fontFamily: "PixelFont",
    textAlign:"center",
  },
});
