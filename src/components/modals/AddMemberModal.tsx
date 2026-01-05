import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sheet } from "../ui/Sheet";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { theme } from "../../theme";

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    setName("");
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title="Add Family Member">
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <Input value={name} onChangeText={setName} placeholder="Alex" />
      </View>
      <Button onPress={handleSave} style={styles.button}>
        Save Member
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
