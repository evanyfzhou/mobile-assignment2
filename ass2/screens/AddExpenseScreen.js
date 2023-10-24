import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { writeToDB } from '../firebase/firestoreHelper';
import { colors, spacing, typography } from '../components/Theme';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddExpenseScreen({ navigation }) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    Array.from({ length: 100 }, (_, index) => ({
      label: `${index + 1}`,
      value: index + 1,
    }))
  );  

  const handleSubmit = async () => {
    if (!itemName || !price || !quantity) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    
    if (isNaN(price)) {
      Alert.alert("Error", "Please enter a numeric value for price.");
      return;
    }

    await writeToDB({
      name: itemName,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item *</Text>
      <TextInput value={itemName} onChangeText={setItemName} style={styles.input} />

      <Text style={styles.label}>Unit Price *</Text>
      <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Quantity *</Text>
      <DropDownPicker
        items={items}
        open={isOpen}
        value={value}
        setOpen={setIsOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={value => {
          setQuantity(value);
        }}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  label: {
    color: colors.white,
    fontSize: typography.medium,
    marginBottom: spacing.small,
  },
  input: {
    height: 40,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: spacing.medium,
    paddingLeft: spacing.medium,
    borderRadius: 8,
  },
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
