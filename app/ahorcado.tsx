import { BotonPix } from "@/components/BotonPix";
import ModalGenerico from "@/components/ModalGenerico";
import { db } from "@/firebaseConfig";
import colors from "@/src/constants/colors";
import { guardarAlias, obtenerAliasExistente } from "@/src/services/firestoreHelpers";
import { useNavigation, useRouter } from "expo-router";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ContenidoSlugRoute() {
  const router = useRouter();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [top10, setTop10] = useState<any[]>([]);

  // Hook para escuchar en tiempo real el top 10
  useEffect(() => {
    const q = query(
      collection(db, "puntajes"),
      orderBy("puntaje", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,    
        ...doc.data()
      }));
      setTop10(data);
    });

    return () => unsubscribe();
  }, []);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); 
    }
  };

 const iniciarJuego = async (nombre: string) => {
    await guardarAlias(nombre); // Guarda alias si no existe
    setModalVisible(false);
    router.push({ pathname: "../juegos/juegoAhorcado", params: { nombre } });
  };

  const handleIniciarJuegoPress = async () => {
    const aliasExistente = await obtenerAliasExistente();
    if (!aliasExistente) {
      setModalVisible(true);
    } else {
      router.push({ pathname: "../juegos/juegoAhorcado", params: { nombre: aliasExistente } });
    }
  };


  return (
<ScrollView style={[styles.screenContainer]}>
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <BotonPix
          text="VOLVER"
          iconName="arrow-back"
          onPress={handleBack}
          iconFamily="Ionicons"
        />
      </View>
        <View style={styles.borde}>
            <View style={styles.contentWrapper}>
                <Text style ={styles.title}>Desafío del Ahorcado </Text>
                <Text style ={styles.description}>Adivina los títulos de populares Shows de TV, 
                Películas, y Anime una letra a la vez. Tenés 5 vidas - podes obtener el puntaje más alto?
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleIniciarJuegoPress}> 
                    <Text style ={styles.buttonText}>INICIAR JUEGO</Text>
                </TouchableOpacity>

                <Text style ={styles.players}>Mejores Jugadores</Text>
                {/*
                <View style={styles.top5}>
                  <View style={styles.jugadorFila}>
                    <Text style={styles.nombreJugador}>1. PixelMaster</Text>
                    <Text style={styles.puntaje}>950</Text>
                  </View>
                  <View style={styles.jugadorFila}>
                    <Text style={styles.nombreJugador}>2. NinjaGamer</Text>
                    <Text style={styles.puntaje}>900</Text>
                  </View>
                  <View style={styles.jugadorFila}>
                    <Text style={styles.nombreJugador}>3. MediaGuru</Text>
                    <Text style={styles.puntaje}>870</Text>
                  </View>
                  <View style={styles.jugadorFila}>
                    <Text style={styles.nombreJugador}>4. TVFanatic</Text>
                    <Text style={styles.puntaje}>850</Text>
                  </View>
                  <View style={styles.jugadorFila}>
                    <Text style={styles.nombreJugador}>5. AnimeWizard</Text>
                    <Text style={styles.puntaje}>820</Text>
                  </View>
                </View>
                */}
                
                <View style={styles.top5}>
                  {top10.length === 0 ? (
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Cargando...
                    </Text>
                  ) : (
                    top10.map((j, i) => (
                      <View key={j.id} style={styles.jugadorFila}>
                        <Text style={styles.nombreJugador}>
                          {i + 1}. {j.alias?.trim() ? j.alias : "Anónimo"}
                        </Text>
                        <Text style={styles.puntaje}>{j.puntaje}</Text>
                      </View>
                    ))
                  )}
                </View>
                
            </View>
        </View>
    </View>

    {/* Modal genérico */}
      <ModalGenerico
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={iniciarJuego}
        titulo="Escribe tu nombre"
        placeholder="..."
        textoBoton="EMPEZAR JUEGO"
      />
</ScrollView>
);
}

const styles = StyleSheet.create({
screenContainer: { flex: 1},
 contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.fondo,
  },
  title: {
    fontSize: 24,
    color: colors.purpura,
    fontFamily: "PixelFont",
    textAlign:"center",
    marginTop:30,
  },
  borde:{
    alignSelf:"center",
    width:"100%", 
    borderWidth:3, 
    borderColor: colors.grisOscuro, 
    marginTop:30,
    alignItems: "center",
    paddingBottom:30,
  },
  description: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
    marginHorizontal:20,
    textAlign:"center",
    marginTop:30,
  },
  button: {
    backgroundColor: colors.purpura,
    padding:10,
    borderWidth: 2,
    borderTopColor: colors.verde,
    borderBottomColor: colors.verdeOscuro,
    borderLeftColor: colors.verde,
    borderRightColor: colors.verdeOscuro,
    marginTop:30,
    },
  buttonText: {
    color:"white",
    fontFamily:"PixelFont",
    fontSize:14,
    },
  players: {
    color: colors.verde,
    fontSize: 20,
    fontFamily: "PixelFont",
    textAlign:"center",
    marginTop:30,
    marginHorizontal:20,
    },
  top5:{
    backgroundColor:colors.grisOscuro,
    height:400,
    width:250,
    gap:15,
    padding:15,
    justifyContent:"center",
    marginTop:30,
    flexDirection:"column",
  },
  jugadorFila: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nombreJugador: {
    color: "white",
    fontSize: 16,
  },
  puntaje: {
    color: colors.verde,
    fontFamily: "PixelFont",
    fontSize: 14,
  },
});