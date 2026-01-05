import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

import { SplashScreen } from "../screens/SplashScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { AuthScreen } from "../screens/AuthScreen";
import { ForgotPasswordScreen } from "../screens/UtilityScreens";
import { TabNavigator } from "./TabNavigator";
import { RecipesScreen } from "../screens/RecipesScreen";
import { RecipeDetailScreen } from "../screens/RecipeDetailScreen";
import { MealPlanScreen } from "../screens/MealPlanScreen";
import { NutritionScreen } from "../screens/NutritionScreen";
import { DocumentsScreen, ExpensesScreen, FamilyScreen, NotificationsScreen, PrivacyScreen, ThemeScreen, ExportScreen, HelpScreen } from "../screens/UtilityScreens";
import { VaultScreen } from "../screens/VaultScreen";

enableScreens();

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
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
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Vault" component={VaultScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
