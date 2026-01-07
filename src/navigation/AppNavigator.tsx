import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

import { SplashScreen } from "../screens/SplashScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { AuthScreen } from "../screens/AuthScreen";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen";
import { TabNavigator } from "./TabNavigator";
import { RecipesScreen } from "../screens/RecipesScreen";
import { RecipeDetailScreen } from "../screens/RecipeDetailScreen";
import { MealPlanScreen } from "../screens/MealPlanScreen";
import { NutritionScreen } from "../screens/NutritionScreen";
import { DocumentsScreen, PrivacyScreen, ExportScreen } from "../screens/UtilityScreens";
import { ExpensesScreen } from "../screens/ExpensesScreen";
import { FamilyScreen } from "../screens/FamilyScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { ThemeScreen } from "../screens/ThemeScreen";
import { DataExportScreen } from "../screens/DataExportScreen";
import { VaultScreen } from "../screens/VaultScreen";
import { HelpScreen } from "../screens/HelpScreen";
import { AppSidebar } from "../components/layout/AppSidebar";
import { useSidebar } from "../contexts/SidebarContext";

enableScreens();

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigatorInner />
  </NavigationContainer>
);

const AppNavigatorInner = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash">
          {({ navigation }) => (
            <SplashScreen onContinue={() => navigation.replace("Onboarding")} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Onboarding">
          {({ navigation }) => (
            <OnboardingScreen
              onSkip={() => navigation.replace("Auth")}
              onComplete={() => navigation.replace("Auth")}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Auth">
          {({ navigation }) => (
            <AuthScreen
              onAuthenticated={() => navigation.replace("MainTabs")}
              onForgotPassword={() => navigation.navigate("ForgotPassword")}
              onPrivacy={() => navigation.navigate("Privacy")}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="MealPlan" component={MealPlanScreen} />
        <Stack.Screen name="Nutrition" component={NutritionScreen} />
        <Stack.Screen name="Documents" component={DocumentsScreen} />
        <Stack.Screen name="Expenses" component={ExpensesScreen} />
        <Stack.Screen name="Family" component={FamilyScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
        <Stack.Screen name="Export" component={ExportScreen} />
        <Stack.Screen name="DataExport" component={DataExportScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Vault" component={VaultScreen} />
      </Stack.Navigator>
      <AppSidebar open={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};
