import React from "react";
import { Modal, View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { theme } from "../../theme";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
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
    <Modal visible={open} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>Close</Text>
            </Pressable>
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.notificationCard}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  close: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  notificationCard: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  notificationTitle: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  notificationMessage: {
    color: theme.colors.mutedForeground,
    marginVertical: theme.spacing.xs,
  },
  notificationTime: {
    fontSize: 11,
    color: theme.colors.mutedForeground,
  },
});
