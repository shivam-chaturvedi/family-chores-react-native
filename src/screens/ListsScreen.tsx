import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { AppSidebar } from "../components/layout/AppSidebar";
import { theme } from "../theme";
import { useFamily } from "../contexts/FamilyContext";
import { Button } from "../components/ui/Button";
import { GlobalSearch } from "../components/search/GlobalSearch";

const categories = ["Dairy", "Produce", "Household", "Extras"];

export const ListsScreen: React.FC = () => {
  const { groceryList } = useFamily();
  const [viewByCategory, setViewByCategory] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filtered = useMemo(
    () =>
      groceryList.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [groceryList, searchQuery]
  );

  return (
    <>
      <AppLayout showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Grocery Lists</Text>
          </View>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Search groceries"
              placeholderTextColor={theme.colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Button variant="ghost" size="sm" onPress={() => setShowSearch(true)}>
              Search
            </Button>
          </View>

          <View style={styles.toggleRow}>
            <Button variant={viewByCategory ? "primary" : "ghost"} size="sm" onPress={() => setViewByCategory(true)}>
              Category
            </Button>
            <Button variant={!viewByCategory ? "primary" : "ghost"} size="sm" onPress={() => setViewByCategory(false)}>
              Simple List
            </Button>
          </View>

          {viewByCategory ? (
            categories.map((category) => (
              <View key={category} style={styles.categoryCard}>
                <Text style={styles.categoryTitle}>{category}</Text>
                {filtered
                  .filter((item) => item.name.startsWith(category[0]))
                  .map((item) => (
                    <View key={item.id} style={styles.listItem}>
                      <Text style={styles.listText}>{item.name}</Text>
                      <Text style={styles.listMeta}>
                        {item.quantity} {item.unit}
                      </Text>
                    </View>
                  ))}
              </View>
            ))
          ) : (
            filtered.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <Text style={styles.listText}>{item.name}</Text>
                <Text style={styles.listMeta}>
                  {item.quantity} {item.unit}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </AppLayout>
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  menuButton: {
    padding: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
  },
  menuIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    color: theme.colors.foreground,
  },
  toggleRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  categoryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  categoryTitle: {
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  listText: {
    color: theme.colors.foreground,
  },
  listMeta: {
    color: theme.colors.mutedForeground,
  },
});
