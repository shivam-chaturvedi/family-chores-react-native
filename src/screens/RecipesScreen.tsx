import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { GlobalSearch } from "../components/search/GlobalSearch";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

type Recipe = {
  id: number;
  name: string;
  time: string;
  servings: number;
  items: number;
  tags: string[];
  emoji: string;
  rating: string;
};

const recipeData: Recipe[] = [
  {
    id: 1,
    name: "Pasta Primavera",
    time: "20 min",
    servings: 4,
    items: 10,
    tags: ["Quick", "Kids Friendly"],
    emoji: "🍝",
    rating: "20%",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    time: "45 min",
    servings: 6,
    items: 18,
    tags: ["High Protein", "Spicy"],
    emoji: "🍛",
    rating: "18%",
  },
  {
    id: 3,
    name: "Fruit Smoothie Bowl",
    time: "10 min",
    servings: 2,
    items: 8,
    tags: ["Healthy", "Low Sugar"],
    emoji: "🥣",
    rating: "20%",
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    time: "30 min",
    servings: 4,
    items: 12,
    tags: ["High Protein", "Vegetarian"],
    emoji: "🍛",
    rating: "15%",
  },
];

const preferences = [
  "Vegetarian",
  "High Protein",
  "Low Sugar",
  "Quick Meals",
  "Kids Friendly",
  "Healthy",
];

const quickMeals = recipeData.slice(0, 3);

const tabs = ["For You", "All Recipes", "Collections"];

export const RecipesScreen: React.FC = () => {
  const { openSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState("For You");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return recipeData.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
            <Text style={styles.title}>Recipes</Text>
            <View style={styles.headerActions}>
              <Pressable style={styles.pillButton}>
                <Text style={styles.pillIcon}>📅</Text>
                <Text style={styles.pillText}>Meal Plan</Text>
              </Pressable>
              <Pressable style={styles.fabButton}>
                <Text style={styles.plus}>＋</Text>
              </Pressable>
            </View>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            placeholderTextColor={theme.colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
          />

          <View style={styles.tabRow}>
            {tabs.map((tab) => {
              const active = tab === activeTab;
              return (
                <Pressable
                  key={tab}
                  style={[styles.tabPill, active && styles.tabActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Your Preferences</Text>
            <View style={styles.tagGroup}>
              {preferences.map((tag) => (
                <View key={tag} style={styles.prefTag}>
                  <Text style={styles.prefText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.groceryNote}>📦 2 ingredients available from your grocery list</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            {filtered.map((recipe) => (
              <View key={recipe.id} style={styles.recommendRow}>
                <View style={styles.recommendLeft}>
                  <Text style={styles.recommendEmoji}>{recipe.emoji}</Text>
                  <View>
                    <Text style={styles.recommendTitle}>{recipe.name}</Text>
                    <Text style={styles.recommendMeta}>
                      {recipe.time} · {recipe.servings} servings · {recipe.items} items
                    </Text>
                  </View>
                </View>
                <Text style={styles.recommendBadge}>{recipe.rating}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Quick Meals (Under 20 min)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {quickMeals.map((recipe) => (
                <View key={recipe.id} style={styles.quickCard}>
                  <Text style={styles.recommendEmoji}>{recipe.emoji}</Text>
                  <Text style={styles.recommendTitle}>{recipe.name}</Text>
                  <Text style={styles.recommendMeta}>{recipe.time}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.planRow}>
            <View>
              <Text style={styles.planTitle}>Plan your week's meals</Text>
              <Text style={styles.planMeta}>Auto-generate grocery lists from recipes</Text>
            </View>
            <Pressable style={styles.planButton}>
              <Text style={styles.planButtonText}>Plan Now</Text>
            </Pressable>
          </View>
        </ScrollView>
      </AppLayout>
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
    backgroundColor: theme.colors.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    gap: theme.spacing.sm,
  },
  pillButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillIcon: {
    marginRight: theme.spacing.xs,
  },
  pillText: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  fabButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 28,
    color: theme.colors.primaryForeground,
  },
  searchInput: {
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.muted,
    paddingHorizontal: theme.spacing.md,
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 18,
    padding: 4,
    marginBottom: theme.spacing.md,
  },
  tabPill: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: 14,
  },
  tabActive: {
    backgroundColor: theme.colors.card,
  },
  tabText: {
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },
  tabTextActive: {
    color: theme.colors.foreground,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  tagGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  prefTag: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  prefText: {
    fontWeight: "600",
    color: theme.colors.mutedForeground,
  },
  groceryNote: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  recommendRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  recommendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recommendEmoji: {
    fontSize: 28,
    marginRight: theme.spacing.md,
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  recommendMeta: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  recommendBadge: {
    backgroundColor: "#7b8aac",
    color: "#fff",
    borderRadius: 999,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    fontSize: 12,
    marginRight: theme.spacing.sm,
  },
  chevron: {
    fontSize: 20,
    color: theme.colors.mutedForeground,
  },
  quickCard: {
    width: 160,
    minHeight: 120,
    backgroundColor: theme.colors.muted,
    borderRadius: 20,
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: 24,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    justifyContent: "space-between",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  planMeta: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  planButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
  },
  planButtonText: {
    color: theme.colors.primaryForeground,
    fontWeight: "700",
  },
});
