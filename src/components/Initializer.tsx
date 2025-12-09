import colors from "@/src/constants/colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// Para probar con o sin demora
import {
  getContenidosConDemora as getContenidos,
  getGenerosConDemora as getGeneros,
  getTiposConDemora as getTipos
} from "@/src/services/servicios-demora";

// import { getContenidos, getGeneros, getTipos } from "@/src/services/servicios";

export function Initializer({ onFinish }: { onFinish: () => void }) {
  const { setContenidos, setGeneros, setTipos } = useContext(AudiovisualesContext);
  
  // Estado para el contador
  const [seconds, setSeconds] = useState(0); 

  // Estado para la Checklist visual
  const [checklist, setChecklist] = useState({
    contenidos: false,
    generos: false,
    tipos: false,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    const fetchAll = async () => {
      try {
        console.log("Iniciando carga...");
        
        const pContenidos = getContenidos().then((data) => {
            setChecklist(prev => ({ ...prev, contenidos: true }));
            return data;
        });

        const pGeneros = getGeneros().then((data) => {
            setChecklist(prev => ({ ...prev, generos: true }));
            return data;
        });

        const pTipos = getTipos().then((data) => {
            setChecklist(prev => ({ ...prev, tipos: true }));
            return data;
        });

        const [contenidos, generos, tipos] = await Promise.all([
          pContenidos,
          pGeneros,
          pTipos,
        ]);
        
        // Guardamos en contexto global
        setContenidos(contenidos);
        setGeneros(generos);
        setTipos(tipos);

      } catch (e) {
        console.error("Error al inicializar:", e);
      } finally {
        clearInterval(intervalId);
        // Pequeña pausa al final para ver todos los checks en verde 
        setTimeout(() => onFinish(), 1000); 
      }
    };

    fetchAll();

    return () => clearInterval(intervalId);
  }, []); 

  // Componente auxiliar para renderizar cada item de la lista
  const CheckItem = ({ label, done }: { label: string, done: boolean }) => (
    <Text style={[styles.checkItem, done && styles.checkItemDone]}>
      {done ? "[ OK ]" : "[ ... ]"} {label}
    </Text>
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.purpura} />
      
      <Text style={styles.text}>Cargando datos...</Text>
      
      <View style={styles.checklistContainer}>
        <CheckItem label="Tipos de contenido" done={checklist.tipos} />
        <CheckItem label="Géneros disponibles" done={checklist.generos} />
        <CheckItem label="Catálogo audiovisual" done={checklist.contenidos} />
      </View>

      <Text style={styles.subtext}>
        {`Tiempo transcurrido: ${seconds}s`}
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
    gap: 20, 
  },
  text: {
    color: colors.blanco,
    fontFamily: "PixelFont",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  checklistContainer: {
    alignItems: "flex-start", 
    gap: 6,
  },
  checkItem: {
    color: colors.grisOscuro, 
    fontFamily: "PixelFont",
    fontSize: 12,
  },
  checkItemDone: {
    color: colors.verde,
  },
  subtext: {
    color: colors.gris,
    fontFamily: "PixelFont",
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
  },
});