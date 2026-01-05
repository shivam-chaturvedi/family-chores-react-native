import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sheet } from "../ui/Sheet";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { theme } from "../../theme";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose }) => {
  const [item, setItem] = useState("");

  const handleSave = () => {
    setItem("");
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title="Add Grocery Item">
      <View style={styles.field}>
        <Text style={styles.label}>Item</Text>
        <Input value={item} onChangeText={setItem} placeholder="Milk - 2L" />
      </View>
      <Button onPress={handleSave} style={styles.button}>
        Add Item
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
