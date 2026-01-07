import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { theme } from "../../theme";

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  tone?: string;
}

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  open,
  onClose,
  notifications,
}) => {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No notifications yet.</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={[styles.notificationRow, { backgroundColor: item.tone ?? theme.colors.card }]}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDetail}>{item.detail}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  panel: {
    width: "100%",
    maxWidth: 480,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  closeButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  closeText: {
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },
  list: {
    maxHeight: 360,
  },
  listContent: {
    paddingBottom: theme.spacing.sm,
  },
  notificationRow: {
    borderRadius: 16,
    padding: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.colors.foreground,
  },
  notificationDetail: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  separator: {
    height: theme.spacing.sm,
  },
  emptyState: {
    padding: theme.spacing.md,
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.mutedForeground,
  },
});
