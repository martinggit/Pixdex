import colors from "@/src/constants/colors";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { login } from "@/src/services/auth"; // tu función Firebase

type Props = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRegister?:()=> void;
};

export default function ModalLogin({ visible, onClose, onSuccess, onRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await login(email, password);
      onSuccess();
      onClose();
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>Iniciar Sesión</Text>

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

          <TouchableOpacity style={styles.boton} onPress={handleLogin}>
            <Text style={styles.botonTexto}>INGRESAR</Text>
          </TouchableOpacity>

          {/* Botón para registrarse */}
          <Text style={{ color: colors.blanco, fontFamily: "PixelFont", marginTop:20 }}>
              ¿No tenés usuario?
          </Text>

          <TouchableOpacity onPress={onRegister} style={{ marginTop: 5 }}>
            <Text style={{ color: colors.verde, fontFamily: "PixelFont", textDecorationLine: 'underline', }}>
              Registrarme
            </Text>
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
