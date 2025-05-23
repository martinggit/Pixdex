import { FlatList, StyleSheet, View } from "react-native";
import { ContenidoCard } from "./ContenidoCard";
import { Link, useRouter } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";
import { contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import colors from "@/src/constants/colors";

export function ContenidoList() {
  const router = useRouter();
  return (
    <FlatList
      data={contenidosAudiovisuales}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: ROUTES.DETAIL,
            params: { slug: item.nombre },
          }}
          style={styles.cardLink} // ✅ Estilo extra opcional
        >
          <ContenidoCard {...item} />
        </Link>
      )}
      keyExtractor={(item) => item.nombre}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer} // ✅ clave para Android
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
