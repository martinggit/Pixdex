import colors from "@/src/constants/colors";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  titulo = "¡Juego terminado!",
  textoBoton = "Volver al inicio",
}: Props) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.puntos}>Puntos: {puntos}</Text>

          <TouchableOpacity style={styles.boton} onPress={onConfirm}>
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
  },
  titulo: {
    fontSize: 18,
    fontFamily: "PixelFont",
    color: "white",
    marginBottom: 20,
  },
  puntos: {
    fontSize: 16,
    color: colors.purpura,
    fontFamily: "PixelFont",
    marginBottom: 30,
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
  },
});
