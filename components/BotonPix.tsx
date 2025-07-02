import colors from '@/src/constants/colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type IconFamily = 'Feather' | 'Ionicons';

interface BotonPixProps {
  text: string;
  onPress: () => void;
  iconName?: string;
  iconFamily?: IconFamily;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
}

export const BotonPix: React.FC<BotonPixProps> = ({
  text,
  onPress,
  iconName,
  iconFamily = 'Feather',
  containerStyle,
  textStyle,
  iconSize = 14,
}) => {
  const IconComponent = iconFamily === 'Ionicons' ? Ionicons : Feather;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle]}>
       {iconName ? (
        <IconComponent name={iconName as any} size={iconSize} color="white" style={styles.icon} />
      ) : null}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.purpura,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderTopColor: colors.purpuraClaro,
    borderBottomColor: colors.purpuraOscuro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'PixelFont',
  },
});
