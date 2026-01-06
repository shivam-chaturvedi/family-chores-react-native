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
    backgroundColor: "#f4f7fc",
    borderTopWidth: 1,
    borderColor: "#dfe9f5",
    paddingVertical: theme.spacing.sm,
    shadowColor: "#0e1a3c",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  navItem: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: 16,
  },
  navItemActive: {
    backgroundColor: theme.colors.card,
    borderColor: "#dfe9f5",
    borderWidth: 1,
  },
  icon: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    marginBottom: 2,
    fontWeight: "600",
  },
  iconActive: {
    color: theme.colors.primary,
  },
  label: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  labelActive: {
    color: theme.colors.primary,
    fontWeight: "700",
  },
});
