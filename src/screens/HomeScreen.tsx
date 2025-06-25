import { BotonAcciones } from "@/components/BotonAcciones";
import { CajaContenido } from "@/components/CajaContenido";
import { CajaJuegos } from "@/components/CajaJuegos";
import { ContenidoList } from "@/components/ContenidoList";
import { ModalFiltros } from "@/components/ModalFiltros";
import colors from "@/src/constants/colors";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ROUTES } from "../navigation/routes";

export function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>([1, 2, 3]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);
  const router = useRouter();

  const goToAhorcado = () => {
    router.push(ROUTES.AHORCADO);
  };
  const handleApplyFilters = (tipos: number[], generos: number[]) => {
    setTiposSeleccionados(tipos);
    setGenerosSeleccionados(generos);
  };

  return (
    <ScrollView style={[styles.screenContainer]}>
       <ModalFiltros
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyFilters}
      />
      <View style={styles.mainContent}>
        <View style={styles.headerRow}>
          <Text style={styles.logoText}> Pixdex </Text>
          <BotonAcciones text="FILTRAR" onPress={() => setModalVisible(true)} />
        </View>
      </View>

       <View style={styles.gamesRow}>
          {/* Tarjeta 1 */}
          <View style={styles.gameBox}>
            <CajaJuegos
              backgroundColor={colors.purpura}
              text="Desafío del Ahorcado"
              descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
              onPress={goToAhorcado}
            ></CajaJuegos>
          </View>

          {/* Tarjeta 2 */}
          <View style={styles.gameBox}>
            <CajaJuegos
              backgroundColor={colors.verde}
              text="Pixel Reveal"
              descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
            ></CajaJuegos>
          </View>
        </View>

          {(tiposSeleccionados.length === 0 || tiposSeleccionados.includes(1)) && (
            <CajaContenido text="SERIES">
              <ContenidoList tipoId={1} generosFiltrados={generosSeleccionados} />
            </CajaContenido>
          )}
          {(tiposSeleccionados.length === 0 || tiposSeleccionados.includes(2)) && (
            <CajaContenido text="PELICULAS">
              <ContenidoList tipoId={2} generosFiltrados={generosSeleccionados} />
            </CajaContenido>
          )}
          {(tiposSeleccionados.length === 0 || tiposSeleccionados.includes(3)) && (
            <CajaContenido text="ANIME">
              <ContenidoList tipoId={3} generosFiltrados={generosSeleccionados} />
            </CajaContenido>
          )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
screenContainer: { flex: 1},
  mainContent: {
    padding: 20,
    gap: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    color: colors.purpura,
    fontFamily: "PixelFont",
    fontWeight: "bold",
  },
  gamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginHorizontal:10,
  },
  gameBox: {
    flex: 1,
  },
});