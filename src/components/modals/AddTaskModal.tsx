import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { theme } from "../../theme";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSave = () => {
    // placeholder behavior: close modal for now
    onClose();
  };

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>New Task</Text>
          <Text style={styles.label}>Task name</Text>
          <TextInput
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Describe the task"
            placeholderTextColor="#8a9abf"
            style={styles.input}
          />
          <Text style={styles.label}>Assign to</Text>
          <TextInput
            value={assignee}
            onChangeText={setAssignee}
            placeholder="Who will be responsible?"
            placeholderTextColor="#8a9abf"
            style={styles.input}
          />
          <View style={styles.actions}>
            <Pressable style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleSave}>
              <Text style={styles.primaryText}>Add Task</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  container: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: theme.spacing.md,
    color: theme.colors.foreground,
  },
  label: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginBottom: 6,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    color: theme.colors.foreground,
    backgroundColor: theme.colors.background,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  secondaryButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 12,
    marginRight: theme.spacing.sm,
  },
  secondaryText: {
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },
  primaryButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },
});
