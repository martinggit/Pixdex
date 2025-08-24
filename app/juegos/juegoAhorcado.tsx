import { BotonPix } from "@/components/BotonPix";
import ModalFinJuego from "@/components/ModalFinJuego";
import ModalGenerico from "@/components/ModalGenerico";
import colors from "@/src/constants/colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ModalLetras from "@/components/ModalLetras";

export default function ContenidoSlugRoute() {
  const { contenidos } = useContext(AudiovisualesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFinVisible, setModalFinVisible] = useState(false);
  const { nombre } = useLocalSearchParams();
  const router = useRouter();
  const [vidas, setVidas] = useState(5);
  const [puntos, setPuntos] = useState(0);
  const [contenidoActual, setContenidoActual] = useState<IContenidoAudiovisual | null>(null);
  const [contenidoRestante, setContenidoRestante] = useState<IContenidoAudiovisual[]>([]);
  const [estado, setEstado] = useState<"jugando" | "perdio">("jugando");
  const [modalLetraVisible, setModalLetraVisible] = useState(false);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
  
  const manejarLetra = (letra: string) => {
    if (!contenidoActual) return;

    setLetrasAdivinadas((prev) => [...prev, letra]); // marcar como usada
    setModalLetraVisible(false);

    const titulo = contenidoActual.nombre.toLowerCase();

    if (titulo.includes(letra)) {
      // correcta → chequeamos si completó todo
      const todasCompletas = titulo
        .split("")
        .every((char) => char === " " || letrasAdivinadas.includes(char) || char === letra);

      if (todasCompletas) {
        setPuntos((p) => p + 1);
        elegirContenidoAleatorio();
        setLetrasAdivinadas([]); // reset letras
      }
    } else {
      // incorrecta → perder vida
      setVidas((v) => {
        const nuevasVidas = v - 1;
        if (nuevasVidas <= 0) {
          setEstado("perdio");
          setModalFinVisible(true);
        }
        return nuevasVidas;
      });
    }
  };

  const handleBack = () => {
      router.replace("/"); 
    }

  const elegirContenidoAleatorio = () => {
    const restantes = contenidoRestante.length > 0 ? contenidoRestante : [...contenidos];
    const index = Math.floor(Math.random() * restantes.length);
    const nuevoContenido = restantes[index];
    const nuevosRestantes = restantes.filter((c) => c !== nuevoContenido);
    setContenidoActual(nuevoContenido);
    setContenidoRestante(nuevosRestantes);
    };

  const manejarAdivinanza = (valor: string) => {
    if (!contenidoActual) return;

    const guessNormalizado = valor.trim().toLowerCase();
    const tituloNormalizado = contenidoActual.nombre.trim().toLowerCase();

    setModalVisible(false);

    if (guessNormalizado === tituloNormalizado) {
      setPuntos((p) => p + 1);
      elegirContenidoAleatorio();
    } else {
      setVidas((v) => {
        const nuevasVidas = v - 1;
        if (nuevasVidas <= 0) {
          setEstado("perdio");
          setModalFinVisible(true);
        }
        return nuevasVidas;
      });
    }
  };


  useEffect(() => {
  elegirContenidoAleatorio();
}, []);

  return (
<ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <BotonPix
            text="SALIR"
            iconName="arrow-back"
            onPress={handleBack}
            iconFamily="Ionicons"
          />
          <View style={styles.vidas}>
            {[...Array(vidas)].map((_, i) => (
              <Ionicons key={i} name="heart" size={20} color={colors.purpura} />
            ))}
          </View>
          <View style={styles.jugador}>
            <Text style={{ fontSize: 12, color: colors.blanco}}> Jugador: {nombre}</Text>
            <Text style={{ fontSize: 12, color: colors.blanco}}> Puntos: {puntos} </Text>
          </View>
        </View>

        <View style={styles.borde}>
          {contenidoActual && (
            <>
              {estado === "jugando" && (
                <>
                <View style={styles.botonesContainer}>
                  <BotonPix text="ADIVINAR TITULO" onPress={() => setModalVisible(true)} />
                  <BotonPix text="ADIVINAR LETRA" onPress={() => setModalLetraVisible(true)} />
                </View>
                </>
              )}

              <ModalLetras
                visible={modalLetraVisible}
                onClose={() => setModalLetraVisible(false)}
                onElegirLetra={manejarLetra}
                letrasUsadas={letrasAdivinadas}
              />

              {/* Imagen y letras SIEMPRE visibles */}
              <View style={styles.imagePlaceholder}>
                <Text style={{ color: "black", textAlign: "center" }}>{contenidoActual.nombre}</Text>
              </View>

              <View style={styles.panelLetras}>
                <Text style={styles.letrasTexto}>
                  {contenidoActual.nombre
                    .split("")
                    .map((char) =>
                      char === " "
                        ? "  "
                        : letrasAdivinadas.includes(char.toLowerCase())
                        ? char
                        : "_"
                    )
                    .join(" ")}
                </Text>
              </View>

            </>
          )}
        </View>
      </View>

      <ModalFinJuego
        visible={modalFinVisible}
        puntos={puntos}
        onConfirm={handleBack}
      />

      <ModalGenerico
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={manejarAdivinanza}
        titulo="Adivina el titulo"
        placeholder="Titulo completo"
        textoBoton="ADIVINAR"
      />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
scrollContainer: {
  backgroundColor: colors.fondo,
  flexGrow: 1,
  },
container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.fondo,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  vidas: {
    flexDirection: "row",
    alignItems: "center",
  },
  borde: {
    alignSelf: "center",
    width: "95%",
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    marginTop: 30,
    alignItems: "center",
    padding: 10,
    paddingBottom:30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purpura,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderTopColor: colors.purpuraClaro,
    borderBottomColor: colors.purpuraOscuro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
  },
  buttonText: {
    color: "white",
    fontFamily: "PixelFont",
    fontSize: 14,
  },
  panelLetras: {
    backgroundColor: colors.grisOscuro, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  letrasTexto: {
    fontSize: 22,
    color: colors.blanco,
  },
  imagePlaceholder: {
    height:400,
    width: "95%",
    marginTop:20,
    backgroundColor: "#BEBEBE",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
  },
  botonesContainer: {
    alignItems: "center",
    justifyContent:"center",
    marginBottom: 10,
    marginTop:10,
    gap:10,
  },
  jugador: {
    flexDirection:"column",
  },
});