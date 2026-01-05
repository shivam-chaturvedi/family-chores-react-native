import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { theme } from "../../theme";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: string;
}

const sampleData: SearchResult[] = [
  { id: "1", title: "Weekly Grocery", subtitle: "Milk, Eggs, Bread", type: "grocery" },
  { id: "2", title: "Team Meeting", subtitle: "Zoom link", type: "event" },
  { id: "3", title: "Grilled Chicken Salad", subtitle: "Recipe", type: "recipe" },
  { id: "4", title: "House Repairs", subtitle: "Home tasks", type: "task" },
];

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return sampleData;
    return sampleData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  if (!open) return null;

  return (
    <Modal visible={open} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextInput
              style={styles.input}
              placeholder="Search events, tasks, recipes..."
              placeholderTextColor={theme.colors.mutedForeground}
              value={query}
              onChangeText={setQuery}
            />
            <Pressable onPress={onClose}>
              <Text style={styles.close}>Cancel</Text>
            </Pressable>
          </View>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.resultRow}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
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
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingTop: theme.spacing.xl,
  },
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    marginHorizontal: theme.spacing.md,
    maxHeight: "85%",
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    color: theme.colors.foreground,
  },
  close: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  resultRow: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  resultTitle: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  resultSubtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
});
