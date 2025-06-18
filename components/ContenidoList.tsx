import { contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { ROUTES } from "@/src/navigation/routes";
import { Link, useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { ContenidoCard } from "./ContenidoCard";

type ContenidoListProps = {
  tipoId: number;
  generosFiltrados?: number[];
};

export function ContenidoList({ tipoId, generosFiltrados }: ContenidoListProps) {
  const router = useRouter();

  const filtrado = contenidosAudiovisuales.filter((contenido) => {
    const coincideTipo = contenido.tipoId === tipoId;

    const coincideGenero =
      !generosFiltrados || generosFiltrados.length === 0
        ? true
        : contenido.generos.some((g) => generosFiltrados.includes(g));

    return coincideTipo && coincideGenero;
  });

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
  },
  cardLink: {
    // sin padding ni margen vertical
  },
});
