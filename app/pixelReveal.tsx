import { BotonPix } from "@/components/BotonPix";
import colors from "@/src/constants/colors";
import { useNavigation, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

export default function ContenidoSlugRoute() {
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        {/* Botón Volver */}
        <View style={{ alignSelf: "flex-start" }}>
          <BotonPix
            text="VOLVER"
            iconName="arrow-back"
            onPress={handleBack}
            iconFamily="Ionicons" 
          />
        </View>

        {/* Borde y Contenido Principal */}
        <View style={styles.borde}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Pixel Reveal</Text>

            {/* Ícono de Construcción */}
            <MaterialCommunityIcons
              name="tools" 
              size={100}
              color={colors.verde}
              style={{ marginVertical: 40 }}
            />
            
            <Text style={styles.description}>
              Estamos trabajando duro para traer este desafío. ¡Estate atento a las actualizaciones!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: { 
    flex: 1, 
    backgroundColor: colors.fondo 
  },
  contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.verde, 
    fontFamily: "PixelFont",
    textAlign: "center",
    marginTop: 30,
  },
  borde: {
    alignSelf: "center",
    width: "100%",
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    marginTop: 30,
    alignItems: "center",
    paddingBottom: 30,
  },
  description: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});