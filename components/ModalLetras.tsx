import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "@/src/constants/colors";
import { useState } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  onElegirLetra: (letra: string) => void;
  letrasUsadas: string[];
};

const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

export default function ModalLetras({ visible, onClose, onElegirLetra, letrasUsadas }: Props) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>Elegí una letra</Text>

          <View style={styles.grid}>
            {abecedario.map((letra) => {
              const usada = letrasUsadas.includes(letra.toLowerCase());
              return (
                <TouchableOpacity
                  key={letra}
                  style={[styles.boton, usada && styles.botonUsado]}
                  onPress={() => {
                    if (!usada) {
                      onElegirLetra(letra.toLowerCase());
                    }
                  }}
                  disabled={usada}
                >
                  <Text style={styles.texto}>{letra}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
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
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    fontFamily: "PixelFont",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  boton: {
    backgroundColor: colors.purpura,
    borderWidth: 2,
    borderTopColor: colors.purpuraClaro,
    borderBottomColor: colors.purpuraOscuro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  botonUsado: {
    backgroundColor: colors.gris,
  },
  texto: {
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
