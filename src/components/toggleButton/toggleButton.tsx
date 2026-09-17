import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../../constant';

export const TermsToggle = ({
  accepted,
  onToggle,
}: {
  accepted: boolean;
  onToggle: () => void;
}) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons
          name={accepted ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={accepted ? Colors.PRIMARY[100] : '#888'}
        />
      </TouchableOpacity>
      <Text style={styles.toggleText}>I accept the Terms and Conditions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily:Fonts.Medium
  },
});
