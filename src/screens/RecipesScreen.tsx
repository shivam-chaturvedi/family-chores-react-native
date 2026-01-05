import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { recipes } from "../data/recipes";
import { Button } from "../components/ui/Button";
import { AppSidebar } from "../components/layout/AppSidebar";
import { GlobalSearch } from "../components/search/GlobalSearch";

export const RecipesScreen: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saved, setSaved] = useState<number[]>(recipes.filter((r) => r.saved).map((r) => r.id));

  const filtered = useMemo(() => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const toggleSaved = (recipeId: number) => {
    setSaved((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Recipes</Text>
            <View style={styles.actions}>
              <Button variant="ghost" size="sm" onPress={() => setShowSearch(true)}>
                Search
              </Button>
            </View>
          </View>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Filter recipes"
              placeholderTextColor={theme.colors.mutedForeground}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          <View style={styles.grid}>
            {filtered.map((recipe) => (
              <TouchableOpacity key={recipe.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.badge}>{recipe.image}</Text>
                  <Button
                    variant={saved.includes(recipe.id) ? "primary" : "outline"}
                    size="sm"
                    onPress={() => toggleSaved(recipe.id)}
                    style={styles.saveButton}
                  >
                    {saved.includes(recipe.id) ? "Saved" : "Save"}
                  </Button>
                </View>
                <Text style={styles.cardTitle}>{recipe.name}</Text>
                <Text style={styles.cardMeta}>
                  {recipe.time} · serves {recipe.servings}
                </Text>
                <View style={styles.tagRow}>
                  {recipe.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  actions: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  searchRow: {
    marginBottom: theme.spacing.md,
  },
  input: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    color: theme.colors.foreground,
  },
  grid: {
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  badge: {
    fontSize: 28,
  },
  saveButton: {
    paddingHorizontal: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: theme.spacing.xs,
  },
  cardMeta: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
    marginBottom: theme.spacing.sm,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  tag: {
    backgroundColor: theme.colors.muted,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.foreground,
  },
});
