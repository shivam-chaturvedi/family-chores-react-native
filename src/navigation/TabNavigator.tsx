import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import { CalendarScreen } from "../screens/CalendarScreen";
import { TasksScreen } from "../screens/TasksScreen";
import { ListsScreen } from "../screens/ListsScreen";
import { MoreScreen } from "../screens/MoreScreen";
import { BottomNavigation, BottomNavRoute } from "../components/layout/BottomNavigation";

// Home Stack Screens
import { RecipesScreen } from "../screens/RecipesScreen";
import { RecipeDetailScreen } from "../screens/RecipeDetailScreen";
import { MealPlanScreen } from "../screens/MealPlanScreen";
import { NutritionScreen } from "../screens/NutritionScreen";
import { ExportScreen } from "../screens/UtilityScreens";
import { VaultScreen } from "../screens/VaultScreen";
import { ExpensesScreen } from "../screens/ExpensesScreen";
import { FamilyScreen } from "../screens/FamilyScreen";

// More Stack Screens
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { PrivacyScreen } from "../screens/PrivacyScreen";
import { ThemeScreen } from "../screens/ThemeScreen";
import { DataExportScreen } from "../screens/DataExportScreen";
import { HelpScreen } from "../screens/HelpScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="Recipes" component={RecipesScreen} />
    <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    <Stack.Screen name="MealPlan" component={MealPlanScreen} />
    <Stack.Screen name="Nutrition" component={NutritionScreen} />
    <Stack.Screen name="Documents" component={VaultScreen} />
    <Stack.Screen name="Expenses" component={ExpensesScreen} />
    <Stack.Screen name="Family" component={FamilyScreen} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MoreMain" component={MoreScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
    <Stack.Screen name="Theme" component={ThemeScreen} />
    <Stack.Screen name="Export" component={ExportScreen} />
    <Stack.Screen name="DataExport" component={DataExportScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => (
      <BottomNavigation
        activeRoute={props.state.routeNames[props.state.index] as BottomNavRoute}
        onNavigate={(route) => {
          if (route === 'home') {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'home' }],
            });
          } else {
            props.navigation.navigate(route);
          }
        }}
      />
    )}
  >
    <Tab.Screen name="home" component={HomeStack} />
    <Tab.Screen name="calendar" component={CalendarScreen} />
    <Tab.Screen name="tasks" component={TasksScreen} />
    <Tab.Screen name="lists" component={ListsScreen} />
    <Tab.Screen name="more" component={MoreStack} />
  </Tab.Navigator>
);
