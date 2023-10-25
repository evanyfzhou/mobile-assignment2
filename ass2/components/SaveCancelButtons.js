import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { spacing, colors, typography } from './Theme';

export default function SaveCancelButtons({ onSave, onCancel }) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.medium,
  },
  cancelButton: {
    backgroundColor: colors.purple,
    padding: spacing.medium,
    borderRadius: 8,
    flex: 1,
    marginRight: spacing.small,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.purple,
    padding: spacing.medium,
    borderRadius: 8,
    flex: 1,
    marginLeft: spacing.small,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.medium,
  },
});
