import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import { updateInDB, deleteFromDB } from '../firebase/firestoreHelper';
import { colors, spacing, typography } from '../components/Theme';
import SaveCancelButtons from '../components/SaveCancelButtons';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from 'react-native-vector-icons';

export default function EditScreen({ navigation, route }) {
    const expense = route.params.expense;
    const [itemName, setItemName] = useState(expense.name);
    const [price, setPrice] = useState(expense.price.toString());
    const [quantity, setQuantity] = useState(expense.quantity.toString());
    const [budgetMarker, setBudgetMarker] = useState(expense.budgetMarker);
    const shouldShowCheckbox = (!budgetMarker || budgetMarker) && parseFloat(price) * parseInt(quantity, 10) > 500;

    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(expense.quantity);
    const [items, setItems] = useState(
        Array.from({ length: 100 }, (_, index) => ({
            label: `${index + 1}`,
            value: index + 1,
        }))
    );

    const handleSave = async () => {
        if (!itemName || !price || !quantity) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        if (isNaN(price)) {
            Alert.alert("Error", "Please enter a valid number for price.");
            return;
        }

        await updateInDB({
            name: itemName,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            budgetMarker: budgetMarker
        }, expense.id);
        navigation.goBack();
    };

    const handleDelete = async () => {
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: async () => {
                        await deleteFromDB(expense.id);
                        navigation.goBack();
                    }
                }
            ]
        );
    };
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.headerDeleteButton} onPress={handleDelete}>
                    <MaterialIcons name="delete" size={24} color={colors.white} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

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
            {shouldShowCheckbox && (
                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxText}>
                        This item is marked as overbudget. Select the checkbox if you would like to approve it.
                    </Text>
                    <CheckBox value={budgetMarker} onValueChange={setBudgetMarker} color={colors.purple} />
                </View>
            )}
            <SaveCancelButtons
                onSave={handleSave}
                onCancel={() => navigation.goBack()}
            />
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
        color: colors.purple,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.medium,
        marginRight: spacing.medium,
    },
    checkboxText: {
        color: colors.purple,
        fontSize: typography.medium,
        marginLeft: spacing.small,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.medium,
    },
    trashButton: {
        backgroundColor: colors.red,
        padding: spacing.medium,
        borderRadius: 8,
        marginRight: spacing.small,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: colors.purple,
        padding: spacing.medium,
        borderRadius: 8,
        marginLeft: spacing.small,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: typography.medium,
    },
    headerDeleteButton: {
        marginRight: spacing.large,
    },
});
