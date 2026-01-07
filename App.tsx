import "react-native-gesture-handler";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "./src/theme";
import { FamilyProvider } from "./src/contexts/FamilyContext";
import { MealPlanProvider } from "./src/contexts/MealPlanContext";
import { SidebarProvider } from "./src/contexts/SidebarContext";
import { ToastProvider } from "./src/components/ui/Toast";
import { AppNavigator } from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <FamilyProvider>
        <MealPlanProvider>
          <SidebarProvider>
            <ToastProvider>
              <StatusBar
                barStyle="dark-content"
                backgroundColor={theme.colors.background}
                animated
              />
              <View style={styles.appWrapper}>
                <AppNavigator />
              </View>
            </ToastProvider>
          </SidebarProvider>
        </MealPlanProvider>
      </FamilyProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
