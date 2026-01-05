import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { theme } from "../../theme";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
}

const shortcuts = [
  { label: "Documents", route: "Documents", icon: "📁" },
  { label: "Expenses", route: "Expenses", icon: "💸" },
];

const bottomLinks = [
  { label: "Privacy Policy", route: "Privacy", icon: "🔒" },
  { label: "Help & Support", route: "Help", icon: "❓" },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  open,
  onClose,
  onNavigate,
}) => {
  const handleNavigate = (route: string) => {
    onNavigate?.(route);
    onClose();
  };

  return (
    <Modal visible={open} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Family Chores</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            {shortcuts.map((item) => (
              <Pressable
                key={item.route}
                onPress={() => handleNavigate(item.route)}
                style={styles.link}
              >
                <Text style={styles.linkIcon}>{item.icon}</Text>
                <Text style={styles.linkText}>{item.label}</Text>
              </Pressable>
            ))}

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Help & Privacy</Text>
            {bottomLinks.map((item) => (
              <Pressable
                key={item.route}
                onPress={() => handleNavigate(item.route)}
                style={styles.link}
              >
                <Text style={styles.linkIcon}>{item.icon}</Text>
                <Text style={styles.linkText}>{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-start",
  },
  sidebar: {
    width: "75%",
    backgroundColor: theme.colors.card,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderBottomRightRadius: 28,
    borderTopRightRadius: 28,
    minHeight: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  closeButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  closeButtonText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  content: {
    paddingBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    textTransform: "uppercase",
    marginBottom: theme.spacing.sm,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  linkIcon: {
    marginRight: theme.spacing.sm,
    fontSize: 18,
  },
  linkText: {
    fontSize: 15,
    color: theme.colors.foreground,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
});
