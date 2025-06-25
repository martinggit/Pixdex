import colors from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BotonVolverProps {
  onPress: () => void;
}

const BotonVolver: React.FC<BotonVolverProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.botonBack}>
          <Ionicons name="arrow-back" size={14} color="white" /> VOLVER
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginLeft: '-25%',
  },
  botonBack: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'PixelFont',
    padding: 5,
    backgroundColor: '#6E59A5',
    marginLeft: 100,
    borderWidth: 3,
    borderTopColor: colors.purpuraClaro,
    borderBottomColor: colors.purpuraOscuro,
    borderLeftColor: colors.purpuraClaro,
    borderRightColor: colors.purpuraOscuro,
  },
});

export default BotonVolver;
