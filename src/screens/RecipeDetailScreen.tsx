import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { useMealPlan } from "../contexts/MealPlanContext";
import { theme } from "../theme";

interface RecipeDetailProps {
  recipeId: number;
}

export const RecipeDetailScreen: React.FC<RecipeDetailProps> = ({ recipeId }) => {
  const { getRecipeById } = useMealPlan();
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return (
      <AppLayout>
        <View style={styles.center}>
          <Text style={styles.title}>Recipe not found</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.subtitle}>
          {recipe.time} · Serves {recipe.servings}
        </Text>
        <View style={styles.tags}>
          {recipe.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient) => (
          <Text key={ingredient.name} style={styles.ingredient}>
            • {ingredient.name} — {ingredient.quantity} {ingredient.unit}
          </Text>
        ))}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  subtitle: {
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.sm,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  tag: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: theme.colors.primary,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  ingredient: {
    fontSize: 14,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
});
