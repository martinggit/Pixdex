import { BotonPix } from "@/components/BotonPix";
import ModalFinJuego from "@/components/ModalFinJuego";
import ModalGenerico from "@/components/ModalGenerico";
import colors from "@/src/constants/colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
<ScrollView style={styles.screenContainer}>
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
          <Text style={{ fontSize: 12, color: colors.blanco}}> Jugador: {nombre}</Text>
          <Text style={{ fontSize: 12, color: colors.blanco}}> Puntos: {puntos} </Text>
        </View>

        <View style={styles.borde}>
          {contenidoActual && estado === "jugando" && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>ADIVINAR TITULO</Text>
            </TouchableOpacity>

            {/* Imagen */}
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: "black", textAlign: "center" }}>{contenidoActual.nombre}</Text>
            </View>

             <View style={styles.panelLetras}>
              <Text style={styles.letrasTexto}>
                {contenidoActual.nombre
                  .split("")
                  .map((char) => (char === " " ? "  " : "_"))
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
screenContainer: { flex: 1 },
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
    gap: 4,
  },
  borde: {
    alignSelf: "center",
    height: 800,
    width: "95%",
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    marginTop: 30,
    alignItems: "center",
    padding: 10,
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
    backgroundColor: "#3c3a45", // Gris oscuro, podés cambiarlo
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  letrasTexto: {
    fontSize: 20,
    color: "#ddd",
    letterSpacing: 4,
    fontFamily: "PixelFont", // Asegurate de que exista
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
});