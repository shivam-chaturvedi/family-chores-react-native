import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { BottomNavigation } from "./BottomNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  style?: object;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showNav = true,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>{children}</View>
      {showNav && <BottomNavigation />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
});
