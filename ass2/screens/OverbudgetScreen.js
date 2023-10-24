import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import { collection, getDocs } from '@firebase/firestore';
import PlusButton from '../components/PlusButton';
import { database } from '../firebase/firebaseSetup';
import { colors, spacing, typography } from '../components/Theme';

export default function OverbudgetScreen({ navigation }) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(database, 'expenses'));
        const expensesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const overbudgetExpenses = expensesData.filter(expense => expense.price * expense.quantity > 500);
        setExpenses(overbudgetExpenses);
        };
        fetchData();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <PlusButton onPress={() => navigation.navigate('addExpense')} />
        ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
        <FlatList 
            data={expenses}
            renderItem={({ item }) => (
            <View style={styles.expenseItem}>
                <Text style={styles.expenseText}>{item.name} {item.quantity} x {item.price}</Text>
            </View>
            )}
            keyExtractor={(item) => item.id}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.large,
      backgroundColor: colors.background
    },
    expenseItem: {
      backgroundColor: colors.purple,
      padding: spacing.large,
      marginVertical: 8,
      borderRadius: 12,
      shadowColor: colors.white,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    expenseText: {
      fontSize: typography.medium,
      color: colors.white
    }
  });
  