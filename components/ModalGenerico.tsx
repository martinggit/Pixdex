// components/ModalGenerico.tsx
import colors from "@/src/constants/colors";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (inputValue: string) => void;  // Recibo el texto ingresado
  titulo?: string;           
  placeholder?: string;      
  textoBoton?: string;      
};

export default function ModalGenerico({
  visible,
  onClose,
  onConfirm,
  titulo = "Ingresá un texto",
  placeholder = "Escribe aquí...",
  textoBoton = "Confirmar",
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (inputValue.trim() !== "") {
      onConfirm(inputValue.trim());
      setInputValue(""); // limpiar input después de confirmar
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
          
          <Text style={styles.titulo}>{titulo}</Text>
          
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            value={inputValue}
            onChangeText={setInputValue}
          />
          
          <TouchableOpacity style={styles.boton} onPress={handleConfirm}>
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
