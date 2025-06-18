import colors from "@/src/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CajaJuegosProps = {
  backgroundColor: string;
  text: string;
  descripcion: string;
};

function CajaJuegos({ backgroundColor, text, descripcion }: CajaJuegosProps) {
  return (
      <View style={[styles.container, { backgroundColor }]}>
        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{text}</Text>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{descripcion}</Text>
        </View>

        {/* Botón */}
        <View style={styles.actionContainer}>
          <Text style={styles.buttonText}>Jugar</Text>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.grisOscuro,
    borderWidth: 4,
    padding: 10,
    justifyContent: "space-between",
    marginBottom:20,
  },
  titleContainer: {
    flex: 1,
    marginBottom:15,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 14,
    color: "white",
    fontFamily: "PixelFont",
  },
  descriptionContainer: {
    flex: 2,
    justifyContent: "center",
  },
  description: {
    color: "white",
    fontSize: 12,
  },
  actionContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 10,
    fontFamily: "PixelFont",
    marginTop: 5,
  },
});

export { CajaJuegos };

