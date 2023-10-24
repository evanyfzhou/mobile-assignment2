import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from './Theme';

export default function PlusButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: spacing.large,
    padding: spacing.small,
    borderRadius: 4,
    backgroundColor: colors.purple
  },
  buttonText: {
    fontSize: typography.header,
    color: colors.white,
  },
});
