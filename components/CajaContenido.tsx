import colors from "@/src/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CajaContenidoProps = {
  text: string;
  children?: React.ReactNode;
};

function CajaContenido({ text, children }: CajaContenidoProps) {
  return (
    <View style={styles.wrapper}>
      {/* Contenedor con borde */}
      <View style={styles.borderedBox}>
        {/* Título flotante */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{text}</Text>
        </View>

        {/* Contenido dentro (ej. FlatList) */}
        <View style={styles.innerContent}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 20,
  },
  borderedBox: {
    borderWidth: 3,
    borderColor: colors.grisOscuro,
    backgroundColor: colors.fondo,
    paddingTop: 15,
    position: "relative",
  },
  titleWrapper: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: colors.purpura,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: colors.purpuraClaro,
    zIndex: 1,
  },
  title: {
    color: "white",
    fontFamily: "PixelFont",
    fontSize: 10,
  },
  innerContent: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export { CajaContenido };

