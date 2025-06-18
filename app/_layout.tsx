import colors from "@/src/constants/colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PixelFont: require("@/assets/fonts/PressStart2P-Regular.ttf"),
  });

  // Evita parpadeo mientras carga la fuente
  if (!fontsLoaded) {
    return <Text style={{ color: "#fff", backgroundColor: colors.fondo }}>Cargando...</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,           // No mostrar headers en ninguna pantalla
        contentStyle: {
          backgroundColor: colors.fondo, // Fondo global
        },
      }}
    />
  );
}
