import { BotonPix } from "@/components/BotonPix";
import colors from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ContenidoSlugRoute() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
      router.replace("/"); 
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
            <View style={styles.contentWrapper}>

                <TouchableOpacity style={styles.button}> 
                    <Text style ={styles.buttonText}> ADIVINAR TITULO </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}> 
                    <Text style ={styles.buttonText}> ADIVINAR LETRA </Text>
                </TouchableOpacity>

            </View>
        </View>
    </View>
</ScrollView>
);
}
const styles = StyleSheet.create({
screenContainer: { flex: 1},
  mainContent: {
    padding: 20,
    gap: 20,
  },
 contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
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
    marginBottom: 20,
    marginTop:20,
    marginHorizontal:30,
  },
  borde:{
    alignSelf:"center",
    height:800, 
    width:"95%", 
    borderWidth:3, 
    borderColor: colors.grisOscuro, 
    marginTop:30,
    alignItems: "center",
  },
  description: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 20,
    marginLeft:20,
    marginRight:20,
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
    color:"white",
    fontFamily:"PixelFont",
    fontSize:14,
    },
  players: {
    color: colors.verde,
    fontSize: 20,
    fontFamily: "PixelFont",
    marginBottom: 10,
    marginHorizontal:70,
    },
  top5:{
    backgroundColor:colors.gris,
    height:200,
    width:250,
    gap:8,
    padding:15,
  },
  jugador:{
    color:"white",
    fontSize:14,
  },
});