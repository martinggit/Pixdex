// components/ModalFiltros.tsx
import colors from "@/src/constants/colors";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import Checkbox from 'expo-checkbox';
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (tipos: number[], generos: number[]) => void;
}

export function ModalFiltros({ visible, onClose, onApply }: Props) {
  const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);

  const toggleTipo = (id: number) => {
    setTiposSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleGenero = (id: number) => {
    setGenerosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  function dividirEnFilas<T>(array: T[], elementosPorFila: number): T[][] {
    const filas: T[][] = [];
    for (let i = 0; i < array.length; i += elementosPorFila) {
        filas.push(array.slice(i, i + elementosPorFila));
    }
    return filas;
    }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Filtrar Contenido</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>X</Text>
          </Pressable>
          <ScrollView>
            <Text style={styles.sectionTitle}>Tipo</Text>
            {tiposContenidoAudiovisual.map((tipo) => (
              <View key={tipo.id} style={styles.checkboxRow}>
                <Checkbox
                  value={tiposSeleccionados.includes(tipo.id)}
                  onValueChange={() => toggleTipo(tipo.id)}
                  color={colors.purpura} 
                />
                <Text style={styles.checkboxLabel}>{tipo.plural}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Géneros</Text>
           {dividirEnFilas(generosContenidoAudiovisual, 2).map((fila, index) => (
            <View key={index} style={styles.generoRow}>
                {fila.map((genero) => (
                <View key={genero.id} style={styles.checkboxItem}>
                    <Checkbox
                    value={generosSeleccionados.includes(genero.id)}
                    onValueChange={() => toggleGenero(genero.id)}
                    color={colors.purpura}                   
                    />
                    <Text style={styles.checkboxLabel}>{genero.nombre}</Text>
                </View>
                ))}
            </View>
            ))}
          </ScrollView>

          <View style={styles.buttonRow}>
            <Pressable
                onPress={() => {
                    setTiposSeleccionados([]);
                    setGenerosSeleccionados([]);
                    onApply([], []);
                    onClose();
                }}
                style={styles.cancelButton}
                >
                <Text style={styles.cancelText}> RESET </Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    onApply(tiposSeleccionados, generosSeleccionados);
                    onClose();
                }}
                style={styles.applyButton}>
                <Text style={styles.applyText}> APLICAR </Text>
                </Pressable>
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
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 10,
    },
  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    },
  container: {
    backgroundColor: colors.fondo,
    padding: 20,
    maxHeight: "80%",
  },
  title: {
    fontSize: 14,
    color: "white",
    marginBottom: 10,
    fontFamily:"PixelFont",
  },
  sectionTitle: {
    fontSize: 12,
    color: colors.verde,
    marginVertical: 10,
    fontFamily:"PixelFont",
  },
  generoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelText: {
    color: "white",
    fontFamily:"PixelFont",
    fontSize:12,
},
  cancelButton: {
    backgroundColor: colors.gris,
    paddingVertical: 6,
    borderWidth:2,
    borderColor:colors.grisOscuro,
    marginRight:10,
  },
  applyButton: {
    backgroundColor: colors.purpura,
    paddingVertical: 6,
    borderWidth:2,
    borderTopColor: colors.purpuraClaro,
    borderBottomColor: colors.purpuraOscuro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
  },
  applyText: {
    color: "white",
    fontFamily:"PixelFont",
    fontSize:12,
  },
});
