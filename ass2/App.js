import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import OverbudgetScreen from './screens/OverbudgetScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacing, typography } from './components/Theme';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen 
        name="HomeScreen"
        component={HomeScreen} 
        options={{ 
          title: 'All Expenses',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.purple },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen 
        name="addExpense" 
        component={AddExpenseScreen} 
        options={{ 
          title: 'Add Expense',
          headerStyle: { backgroundColor: colors.purple },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

const OverbudgetStack = () => {
  return (
    <Stack.Navigator initialRouteName="OverbudgetScreen">
      <Stack.Screen 
        name="OverbudgetScreen"
        component={OverbudgetScreen} 
        options={{ 
          title: 'Overbudget Expenses',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.purple },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen 
        name="addExpense" 
        component={AddExpenseScreen} 
        options={{ 
          title: 'Add Expense',
          headerStyle: { backgroundColor: colors.purple },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Overbudget') {
              iconName = focused ? 'warning' : 'warning-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.yellow,
          tabBarInactiveTintColor: colors.grey,
          tabBarStyle: {
            backgroundColor: colors.purple,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Overbudget" component={OverbudgetStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}