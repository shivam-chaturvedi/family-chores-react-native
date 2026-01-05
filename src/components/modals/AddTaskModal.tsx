import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sheet } from "../ui/Sheet";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { theme } from "../../theme";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    setTitle("");
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title="Add Task">
      <View style={styles.field}>
        <Text style={styles.label}>Task Title</Text>
        <Input value={title} onChangeText={setTitle} placeholder="Clean the kitchen" />
      </View>
      <Button onPress={handleSave} style={styles.button}>
        Save Task
      </Button>
    </Sheet>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
});
