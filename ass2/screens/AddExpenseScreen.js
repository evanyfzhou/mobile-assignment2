import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { writeToDB } from '../firebase/firestoreHelper';
import { colors, spacing, typography } from '../components/Theme'

export default function AddExpenseScreen({ navigation }) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async () => {
    await writeToDB({
      name: itemName,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Item Name" value={itemName} onChangeText={setItemName} style={styles.input} />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="number-pad" style={styles.input} />
      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
  },
  input: {
    height: 40,
    borderColor: colors.purple,
    borderWidth: 1,
    marginBottom: spacing.large,
    paddingLeft: spacing.medium,
  },
});
