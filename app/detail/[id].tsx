import { BotonPix } from "@/components/BotonPix";
import colors from "@/src/constants/colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ContenidoSlugRoute() {
  const { id } = useLocalSearchParams(); // ← Accede a /detail/LOQUESEA
  const router = useRouter();
  const navigation = useNavigation();

  const { contenidos, generos, tipos } = useContext(AudiovisualesContext);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); 
    }
  };

  // Buscar el contenido usando el contexto
  const contenido = contenidos.find((item) => item.nombre === id);

  // Mapear los ids de géneros del contenido con los nombres del contexto
  const generosNombres = contenido?.generos.map(
    (generoId) => generos.find((g) => g.id === generoId)?.nombre
  );

  // Buscar el tipo singular en contexto
  const tipoNombre = tipos.find((t) => t.id === contenido?.tipoId)?.singular;

  if (!contenido) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#fff" }}>Contenido no encontrado</Text>
      </View>
    );
  }

  return (
<ScrollView style={[styles.screenContainer]}>
    <View style={styles.container}>
        <BotonPix
          text="VOLVER"
          iconName="arrow-back"
          onPress={handleBack}
          iconFamily="Ionicons"
        />
        <View style={styles.borde}>
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: "black", textAlign: "center" }}>{id}</Text>
          </View>
        
          <Text style={styles.slugTitle}>{contenido?.nombre}</Text>
        
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tipoNombre}</Text>
        </View>

        <Text style={styles.description}>{contenido?.descripcion}</Text>
        
        <Text style={styles.genresTitle}>Generos</Text>
        <View style={styles.genreList}>
          {generosNombres?.map((genero: string | undefined, index: number) => (
            <Text key={index} style={styles.genre}>{genero}</Text>
          ))}
        </View>

        </View>
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1},
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.fondo,
  },
  title: {
    color: "#fff",
    fontSize: 24,
  },
  borde:{
    alignSelf:"center",
    height:800, 
    width:"95%", 
    borderWidth:3, 
    borderColor: colors.grisOscuro, 
    marginTop:30
  },
  imagePlaceholder: {
    height: "60%",
    width: "90%",
    marginTop:20,
    backgroundColor: "#BEBEBE",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
  },
  slugTitle: {
    fontSize: 20,
    color: colors.purpura,
    fontFamily: "PixelFont",
    marginBottom: 10,
    lineHeight: 24,
    marginLeft:20,
  },
  tag: {
    backgroundColor: colors.grisOscuro,
    padding:5,
    width:50,
    alignSelf: "flex-start",
    marginLeft:20,
    marginBottom: 15,
  },
  tagText: {
    color: "#fff",
    fontSize: 10,
    alignSelf:"center"
  },
  description: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    marginLeft:20,
    marginRight:20,
  },
  genresTitle: {
    color: colors.verde,
    fontSize: 14,
    fontFamily: "PixelFont",
    marginBottom: 10,
    marginLeft:20,
  },
  genreList: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginLeft:20,
  },
  genre: {
    backgroundColor: colors.grisOscuro,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
  },
});