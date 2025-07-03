import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "@/src/constants/colors";

interface EtiquetaProps {
  texto: string;
  variant?: "card" | "detalle";
}

export function Etiqueta({ texto, variant = "card" }: EtiquetaProps) {
  const estilo = variant === "detalle" ? detalleStyles : cardStyles;

  return (
    <View style={estilo.tag}>
      <Text style={estilo.text}>{texto}</Text>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  tag: {
    backgroundColor: colors.grisOscuro,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
  },
  text: {
    color: colors.blanco,
    fontSize: 8,
  },
});
const detalleStyles = StyleSheet.create({
  tag: {
    backgroundColor: colors.grisOscuro,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 4,
    marginBottom: 2,
    alignSelf:"flex-start",
  },
  text: {
    color: colors.blanco,
    fontSize: 12,
  },
});
