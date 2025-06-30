import { contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { ROUTES } from "@/src/navigation/routes";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ContenidoCard } from "./ContenidoCard";

type ContenidoListProps = {
  tipoId: number;
  generosFiltrados?: number[];
};

export function ContenidoList({ tipoId, generosFiltrados }: ContenidoListProps) {

  const filtrado = contenidosAudiovisuales.filter((contenido) => {
    const coincideTipo = contenido.tipoId === tipoId;

    const coincideGenero =
      !generosFiltrados || generosFiltrados.length === 0
        ? true
        : contenido.generos.some((g) => generosFiltrados.includes(g));

    return coincideTipo && coincideGenero;
  });

   if (filtrado.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sin resultados</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filtrado}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: ROUTES.DETAIL,
            params: { id: item.nombre },
          }}
          style={styles.cardLink}
        >
          <ContenidoCard {...item} />
        </Link>
      )}
      keyExtractor={(item) => item.nombre}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap:10,
  },
  cardLink: {
    // sin padding ni margen vertical
  },
  emptyContainer: {
    padding: 10,
  },
  emptyText: {
    color: "white",
    fontFamily: "PixelFont",
    fontSize: 12,
    padding:10,
  },
});
