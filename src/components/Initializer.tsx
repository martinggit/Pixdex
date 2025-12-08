import { useContext, useEffect, useState } from "react"; // Importar useState
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import colors from "@/src/constants/colors";

// Para probar con o sin demora
import { 
  getContenidosConDemora as getContenidos, 
  getGenerosConDemora as getGeneros, 
  getTiposConDemora as getTipos 
} from "@/src/services/servicios-demora";

// Para producción, usar:
// import { getContenidos, getGeneros, getTipos } from "@/src/services/servicios";

export function Initializer({ onFinish }: { onFinish: () => void }) {
  const { setContenidos, setGeneros, setTipos } = useContext(AudiovisualesContext);
  // 1. Estado para el contador de segundos
  const [seconds, setSeconds] = useState(0); 

  useEffect(() => {
    // 2. Iniciar el contador: se ejecuta cada 1000ms (1 segundo)
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    const fetchAll = async () => {
      try {
        console.log(" Iniciando carga de datos con demora...");
        
        const [contenidos, generos, tipos] = await Promise.all([
          getContenidos(),
          getGeneros(),
          getTipos(),
        ]);
        
        console.log(" Datos cargados:", { 
          contenidos: contenidos.length, 
          generos: generos.length, 
          tipos: tipos.length 
        });
        
        setContenidos(contenidos);
        setGeneros(generos);
        setTipos(tipos);
      } catch (e) {
        console.error(" Error al inicializar la app:", e);
      } finally {
        // 3. Detener el contador cuando finaliza la carga
        clearInterval(intervalId);
        onFinish();
      }
    };

    fetchAll();

    // 4. Limpieza: también se detiene el contador si la componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.purpura} />
      <Text style={styles.text}>Cargando datos...</Text>
      
      {/* 5. Mostrar el contador de segundos */}
      <Text style={styles.subtext}>
        {`Esto puede tardar unos segundos (${seconds}s)`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.fondo,
    gap: 10,
  },
  text: {
    color: colors.blanco,
    fontFamily: "PixelFont",
    fontSize: 14,
    textAlign: "center",
  },
  subtext: {
    color: colors.grisOscuro,
    fontFamily: "PixelFont",
    fontSize: 8,
    textAlign: "center",
  },
});