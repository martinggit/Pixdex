import colors from "@/src/constants/colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Etiqueta } from "./Etiqueta";

type TContenidoCardProps = {
  id: number;
  nombre: string;
  descripcion: string;
  generos: number[];
  tipoId: number;
  imageUrl: string;
};

export function ContenidoCard({ nombre, generos, imageUrl }: TContenidoCardProps) {
  const context = useContext(AudiovisualesContext);
  if (!context) return null; // Protección si contexto no cargó aún

  const { generos: generosContext } = context;

  // Mapear id de géneros a nombres usando contexto
  const generosNombre = generos
    .map((id) => generosContext.find((g) => g.id === id)?.nombre)
    .filter(Boolean);


  return (
    <View style={styles.card}>
      {/* Imagen */}
      <View style={styles.imagePlaceholder}>
        <Text style= {{color: "black", textAlign: "center",fontSize:10}}>{nombre}</Text>
      </View>


      {/* Info abajo */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {nombre}
        </Text>
        <View style={styles.genreContainer}>
          {generosNombre
            .filter((genero): genero is string => typeof genero === "string")
            .map((genero, index) => (
              <Etiqueta key={index} texto={genero} />
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 280,
    borderWidth: 2,
    borderColor: colors.grisOscuro,
    backgroundColor: "#1b1b1b",
    overflow: "hidden",
  },
  info: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    color: "white",
    fontFamily: "PixelFont",
    marginBottom: 4,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  imagePlaceholder: {
    flex:3,
    backgroundColor: "#BEBEBE",
    justifyContent: "center",
    alignItems: "center",
  },
});
