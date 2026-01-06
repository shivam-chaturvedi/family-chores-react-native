import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { theme } from "../../theme";
import { BottomNavigation } from "./BottomNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showAddButton?: boolean;
  onAddPress?: () => void;
  style?: object;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showNav = true,
  showAddButton = true,
  onAddPress = () => {},
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>{children}</View>
      {showAddButton && (
        <Pressable style={styles.addButton} onPress={onAddPress}>
          <Text style={styles.addIcon}>＋</Text>
        </Pressable>
      )}
      {showNav && <BottomNavigation />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  content: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  addIcon: {
    fontSize: 30,
    color: theme.colors.primaryForeground,
    lineHeight: 30,
  },
});
