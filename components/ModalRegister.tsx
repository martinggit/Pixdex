import colors from "@/src/constants/colors";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { register } from "@/src/services/auth";// tu función Firebase

type Props = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ModalRegister({ visible, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
  setError("");

  // Validaciones básicas
  if (!email.includes("@")) {
    setError("El email no es válido");
    return;
  }
  if (password.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  try {
    await register(email, password);
    onSuccess();
    setEmail("");
    setPassword("");
  } catch (err: any) {
    console.log("Error Firebase:", err); 
    setError(err.message || "Error al registrarse");
  }
};

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>Registrarse</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.boton} onPress={handleRegister}>
            <Text style={styles.botonTexto}>REGISTRARSE</Text>
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
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
