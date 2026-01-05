import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

export type BottomNavRoute =
  | "home"
  | "calendar"
  | "tasks"
  | "lists"
  | "more";

const navItems: { label: string; route: BottomNavRoute; icon: string }[] = [
  { label: "Home", route: "home", icon: "🏠" },
  { label: "Calendar", route: "calendar", icon: "📅" },
  { label: "Tasks", route: "tasks", icon: "✅" },
  { label: "Lists", route: "lists", icon: "🛒" },
  { label: "More", route: "more", icon: "⋯" },
];

interface BottomNavigationProps {
  activeRoute?: BottomNavRoute;
  onNavigate?: (route: BottomNavRoute) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeRoute = "home",
  onNavigate,
}) => {
  return (
    <View style={styles.navContainer}>
      {navItems.map((item) => {
        const isActive = activeRoute === item.route;
        return (
          <Pressable
            key={item.route}
            onPress={() => onNavigate?.(item.route)}
            style={[styles.navItem, isActive && styles.navItemActive]}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
  },
  navItem: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: theme.colors.primaryLight,
  },
  icon: {
    fontSize: 20,
    color: theme.colors.mutedForeground,
  },
  iconActive: {
    color: theme.colors.primary,
  },
  label: {
    marginTop: 2,
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  labelActive: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
