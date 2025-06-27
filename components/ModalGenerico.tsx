// components/ModalGenerico.tsx
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import colors from "@/src/constants/colors";
import { useState } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  onStart: (nombre: string) => void;
};

export default function ModalGenerico({ visible, onClose, onStart }: Props) {
  const [nombre, setNombre] = useState("");

  const handleStart = () => {
    if (nombre.trim() !== "") {
      onStart(nombre.trim());
      setNombre(""); // limpiar input
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
            {/* Botón de cierre "X" */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          <Text style={styles.titulo}>Ingresá tu nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de jugador"
            placeholderTextColor="#aaa"
            value={nombre}
            onChangeText={setNombre}
          />
          <TouchableOpacity style={styles.boton} onPress={handleStart}>
            <Text style={styles.botonTexto}>Empezar Juego</Text>
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
  },
  titulo: {
    fontSize: 18,
    fontFamily: "PixelFont",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: colors.purpura,
    borderWidth: 2,
    padding: 10,
    color: "white",
    marginBottom: 20,
    fontFamily: "PixelFont",
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
  cancelar: {
    marginTop: 10,
    color: colors.verde,
    textDecorationLine: "underline",
    fontFamily: "PixelFont",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  closeText: {
    color: colors.gris,
    fontSize: 18,
    fontWeight: "bold",
  },
});
