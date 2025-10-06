import { BotonPix } from "@/components/BotonPix";
import { CajaContenido } from "@/components/CajaContenido";
import { CajaJuegos } from "@/components/CajaJuegos";
import { ContenidoList } from "@/components/ContenidoList";
import { ModalFiltros } from "@/components/ModalFiltros";
import ModalLogin from "@/components/ModalLogin";
import ModalRegister from "@/components/ModalRegister";
import colors from "@/src/constants/colors";
import { AudiovisualesContext } from "@/src/context/audiovisual-context";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ROUTES } from "../src/navigation/routes";

export function HomeScreen() {
  const { tipos, generos } = useContext(AudiovisualesContext); //tomo del contexto
  const [modalVisible, setModalVisible] = useState(false);
  const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>([1, 2, 3]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);
  const router = useRouter();
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [user, setUser]= useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const goToAhorcado = () => {
    router.push(ROUTES.AHORCADO);
  };

  const handleApplyFilters = (tipos: number[], generos: number[]) => {
    setTiposSeleccionados(tipos);
    setGenerosSeleccionados(generos);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Si no hay tipos seleccionados, mostrar todos (del contexto)
  const tiposMostrar = tiposSeleccionados.length > 0 ? tipos.filter(t => tiposSeleccionados.includes(t.id)) : tipos;

  return (
    <ScrollView style={[styles.screenContainer]}>
      <View style={styles.mainContent}>
        <View style={styles.headerRow}>
          <Text style={styles.logoText}> Pixdex </Text>
           
          <View style={styles.botonesContainerVertical}>
           {user ? (
            <BotonPix
              text="SALIR"
              iconName="log-out"
              onPress={handleLogout}
              iconFamily="Feather"
            />
          ) : (
            <BotonPix
              text="INICIAR SESION"
              iconName="user"
              onPress={() => setLoginVisible(true)}
              iconFamily="Feather"
            />
          )}
          
          <BotonPix
            text="FILTRAR"
            iconName="settings"
            onPress={() => setModalVisible(true)}
            iconFamily="Feather"
          />
        </View>
        </View>
      </View>

       <View style={styles.gamesRow}>
          {/* Tarjeta 1 */}
          <View style={styles.gameBox}>
            <CajaJuegos
              backgroundColor={colors.purpura}
              text="Desafío del Ahorcado"
              descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
              onPress={goToAhorcado}
            ></CajaJuegos>
          </View>

          {/* Tarjeta 2 */}
          <View style={styles.gameBox}>
            <CajaJuegos
              backgroundColor={colors.verde}
              text="Pixel Reveal"
              descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
            ></CajaJuegos>
          </View>
        </View>

        {tiposMostrar.map((tipo) => (
        <CajaContenido key={tipo.id} text={tipo.plural}>
          <ContenidoList tipoId={tipo.id} generosFiltrados={generosSeleccionados} />
        </CajaContenido>
      ))}

      <ModalLogin
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onSuccess={() => console.log("Login exitoso!")}
        onRegister={() => {
        setLoginVisible(false);   // cerrar login
        setRegisterVisible(true); // abrir registro
      }}
      />

      <ModalRegister
        visible={registerVisible}
        onClose={() => setRegisterVisible(false)}
        onSuccess={() => {
        console.log("Registro exitoso!");
        setRegisterVisible(false);
      }}
      />

      <ModalFiltros
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyFilters}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
screenContainer: { flex: 1},
  mainContent: {
    padding: 20,
    gap: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    color: colors.purpura,
    fontFamily: "PixelFont",
    alignSelf: "center",
  },
  gamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginHorizontal:10,
  },
  botonesContainerVertical: {
    flexDirection: "column", 
    gap: 8,
    alignItems: "flex-end", 
    maxWidth:80,
  },
  gameBox: {
    flex: 1,
  },
});