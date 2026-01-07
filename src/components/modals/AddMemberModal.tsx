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

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.heading}>Invite a Family Member</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Alex"
            placeholderTextColor="#8a9abf"
            style={styles.input}
          />
          <Text style={styles.label}>Role or Relationship</Text>
          <TextInput
            value={role}
            onChangeText={setRole}
            placeholder="Parent, Child, Helper, etc."
            placeholderTextColor="#8a9abf"
            style={styles.input}
          />
          <View style={styles.actions}>
            <Pressable style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleSave}>
              <Text style={styles.primaryText}>Invite</Text>
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
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: theme.spacing.md,
    color: theme.colors.foreground,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
    color: theme.colors.foreground,
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
