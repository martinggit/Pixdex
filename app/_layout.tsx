import colors from "@/src/constants/colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text } from "react-native";
import "react-native-reanimated";
import { AudiovisualesContextProvider } from "@/src/context/audiovisual-context";
import { useEffect,useState } from "react";
import { Initializer } from "@/src/components/Initializer";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PixelFont: require("@/assets/fonts/PressStart2P-Regular.ttf"),
  });

  const [appReady, setAppReady] = useState(false);

  // Evita parpadeo mientras carga la fuente
  if (!fontsLoaded) {
    return <Text style={{ color: "#fff", backgroundColor: colors.fondo }}>Cargando...</Text>;
  }

  return (
    <AudiovisualesContextProvider>
      {!appReady ? (
        <Initializer onFinish={() => setAppReady(true)} />
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.fondo },
          }}
        />
      )}
    </AudiovisualesContextProvider>
  );
}
