import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sheet } from "../ui/Sheet";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { theme } from "../../theme";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    setTitle("");
    setDate("");
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title="Add Event">
      <View style={styles.field}>
        <Text style={styles.label}>Event Title</Text>
        <Input value={title} onChangeText={setTitle} placeholder="Team meeting" />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <Input value={date} onChangeText={setDate} placeholder="2026-01-20" />
      </View>
      <Button onPress={handleSave} style={styles.button}>
        Save Event
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
