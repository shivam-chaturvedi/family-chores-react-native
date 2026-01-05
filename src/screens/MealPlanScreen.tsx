import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { useMealPlan } from "../contexts/MealPlanContext";
import { theme } from "../theme";
import { Button } from "../components/ui/Button";

export const MealPlanScreen: React.FC = () => {
  const { plannedMeals, getRecipeById, clearWeekPlan, currentWeekStart, setCurrentWeekStart } = useMealPlan();
  const [selectedDay, setSelectedDay] = useState(currentWeekStart);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + index);
      return date;
    });
  }, [currentWeekStart]);

  const mealsForDay = useMemo(() => {
    const key = selectedDay.toISOString().split("T")[0];
    return plannedMeals.filter((meal) => meal.date === key);
  }, [plannedMeals, selectedDay]);

  return (
    <AppLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meal Plan</Text>
          <Button variant="ghost" size="sm" onPress={clearWeekPlan}>
            Clear Week
          </Button>
        </View>

        <View style={styles.weekRow}>
          {weekDays.map((date) => {
            const label = date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
            return (
              <TouchableOpacity
                key={label}
                onPress={() => setSelectedDay(date)}
                style={[
                  styles.dayCard,
                  date.toDateString() === selectedDay.toDateString() && styles.dayCardActive,
                ]}
              >
                <Text style={styles.dayLabel}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Meals</Text>
          {mealsForDay.map((meal) => {
            const recipe = getRecipeById(meal.recipeId);
            return (
              <View key={meal.id} style={styles.mealRow}>
                <Text style={styles.mealType}>{meal.mealType}</Text>
                <Text style={styles.mealName}>{recipe?.name || "Recipe"}</Text>
              </View>
            );
          })}
          {mealsForDay.length === 0 && (
            <Text style={styles.empty}>No meals planned for this day.</Text>
          )}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  dayCard: {
    flex: 1,
    alignItems: "center",
    padding: theme.spacing.sm,
    borderRadius: 12,
    marginHorizontal: 2,
    backgroundColor: theme.colors.muted,
  },
  dayCardActive: {
    backgroundColor: theme.colors.primary,
  },
  dayLabel: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  mealRow: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  mealType: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
  },
  empty: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
});
