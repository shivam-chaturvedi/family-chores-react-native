import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { AppSidebar } from "../components/layout/AppSidebar";
import { theme } from "../theme";

interface HomePlaceholderProps {
  onReset: () => void;
}

export const HomePlaceholder: React.FC<HomePlaceholderProps> = ({ onReset }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("home");

  const handleSidebarNavigate = (route: string) => {
    setActiveRoute(route);
  };

  return (
    <>
      <AppLayout>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Family Chores</Text>
          <Text style={styles.subtitle}>
            This placeholder sits inside the shared layout components (AppLayout,
            BottomNavigation, AppSidebar). You can extend the remaining screens
            using the same building blocks.
          </Text>
          <Pressable
            style={styles.actionButton}
            onPress={() => setSidebarOpen(true)}
          >
            <Text style={styles.actionText}>Open Menu</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={onReset}>
            <Text style={styles.actionText}>Revisit Onboarding</Text>
          </Pressable>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{activeRoute.toUpperCase()}</Text>
            <Text style={styles.badgeText}>Active route</Text>
          </View>
        </ScrollView>
      </AppLayout>
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleSidebarNavigate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: theme.colors.mutedForeground,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  actionButton: {
    width: "100%",
    borderRadius: 16,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  actionText: {
    color: theme.colors.primaryForeground,
    fontWeight: "600",
  },
  badge: {
    marginTop: theme.spacing.xl,
    alignItems: "center",
    padding: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryLight,
  },
  badgeLabel: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  badgeText: {
    fontSize: 20,
    color: theme.colors.foreground,
    fontWeight: "700",
    marginTop: theme.spacing.xs,
  },
});
