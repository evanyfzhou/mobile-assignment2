import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from 'react-native-vector-icons';
import { collection, getDocs } from '@firebase/firestore';
import PlusButton from '../components/PlusButton';
import { database } from '../firebase/firebaseSetup';
import { colors, spacing, typography } from '../components/Theme';

export default function OverbudgetScreen({ navigation }) {
    const [expenses, setExpenses] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const querySnapshot = await getDocs(collection(database, 'expenses'));
                const expensesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                const overbudgetExpenses = expensesData.filter(expense => !expense.budgetMarker && expense.price * expense.quantity > 500);
                setExpenses(overbudgetExpenses);
            };
            fetchData();
        }, [])
    );
    
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
                <Text style={styles.expenseText}>{item.name}</Text>
                <View style={styles.warningAndCalculationContainer}>
                    <MaterialIcons name="warning" size={24} color={colors.yellow} style={styles.warningIcon} />
                    <View style={styles.calculationContainer}>
                        <Text style={styles.calculationText}>{item.quantity} x {item.price}</Text>
                    </View>
                </View>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    },
    warningAndCalculationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    warningIcon: {
      marginRight: spacing.small,
      color: colors.yellow
    },
    calculationContainer: {
      backgroundColor: colors.white,
      padding: spacing.small,
      borderRadius: 6,
    },
    calculationText: {
      color: colors.purple,
    }
});
