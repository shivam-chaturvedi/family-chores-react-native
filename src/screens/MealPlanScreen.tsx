import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppLayout } from '../components/layout/AppLayout';
import { theme } from '../theme';
import { AppIcon } from '../components/ui/AppIcon';
import { useMealPlan, MealType } from '../contexts/MealPlanContext';
import { AddMealModal } from '../components/modals/AddMealModal';
import { format, addDays, subDays, isToday, isTomorrow } from 'date-fns';

const SCREEN_WIDTH = Dimensions.get('window').width;

const getDayName = (date: Date) => format(date, 'EEEE'); // Monday
const getDayNumber = (date: Date) => format(date, 'd'); // 5

export const MealPlanScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    currentWeekStart,
    setCurrentWeekStart,
    getMealsForDay,
    getRecipeById,
    addMealToPlan,
    removeMealFromPlan,
    clearWeekPlan,
    generateGroceryList,
  } = useMealPlan();

  const [activeTab, setActiveTab] = useState<'plan' | 'recipes' | 'prep'>('plan');
  const [addMealModal, setAddMealModal] = useState<{ open: boolean; date: string; mealType: MealType } | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const totalMeals = weekDays.reduce((acc, day) => {
    return acc + getMealsForDay(format(day, 'yyyy-MM-dd')).length;
  }, 0);

  const handleNavigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(direction === 'prev' ? subDays(currentWeekStart, 7) : addDays(currentWeekStart, 7));
  };

  const handleOpenAddMeal = (dateStr: string, mealType: MealType) => {
    setAddMealModal({ open: true, date: dateStr, mealType });
  };

  const handleSelectRecipe = (recipeId: number) => {
    if (addMealModal) {
      addMealToPlan(recipeId, addMealModal.date, addMealModal.mealType);
      setAddMealModal(null);
    }
  };

  const renderPlanTab = () => (
    <View style={styles.tabContent}>
      {/* Week Navigator */}
      <View style={styles.weekNavigator}>
        <Pressable onPress={() => handleNavigateWeek('prev')} style={styles.navArrow}>
          <AppIcon name="chevronLeft" size={20} color={theme.colors.foreground} />
        </Pressable>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.weekDateRange}>
            {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d')}
          </Text>
          <Text style={styles.weekYear}>{format(currentWeekStart, 'yyyy')}</Text>
        </View>
        <Pressable onPress={() => handleNavigateWeek('next')} style={styles.navArrow}>
          <AppIcon name="chevronRight" size={20} color={theme.colors.foreground} />
        </Pressable>
      </View>

      {/* Days List */}
      <View style={{ gap: 16 }}>
        {weekDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayMeals = getMealsForDay(dateStr);
          const isTodayDate = isToday(day);

          return (
            <View key={dateStr} style={[styles.dayCard, isTodayDate && styles.dayCardToday]}>
              {/* Day Header */}
              <View style={styles.dayHeader}>
                <View style={styles.dayDateGroup}>
                  <View style={[styles.dateBadge, isTodayDate && styles.dateBadgeToday]}>
                    <Text style={[styles.dateNumber, isTodayDate && { color: '#fff' }]}>{getDayNumber(day)}</Text>
                  </View>
                  <View>
                    <Text style={styles.dayName}>{getDayName(day)}</Text>
                    <Text style={styles.monthName}>{format(day, 'MMM yyyy')}</Text>
                  </View>
                </View>
                {/* {isTodayDate && <View style={styles.todayPill}><Text style={styles.todayText}>Today</Text></View>} */}
                {/* Removing Today pill to match reference exact logic visually */}
              </View>

              {/* Meal Slots */}
              <View style={styles.mealGrid}>
                {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => {
                  const meal = dayMeals.find((m) => m.mealType === mealType);
                  const recipe = meal ? getRecipeById(meal.recipeId) : null;

                  const typeConfig = {
                    breakfast: { label: 'Breakfast', color: '#FFF7ED', icon: 'coffee', iconColor: '#F97316' }, // orange-100
                    lunch: { label: 'Lunch', color: '#FFFBEB', icon: 'sun', iconColor: '#F59E0B' }, // amber-100
                    dinner: { label: 'Dinner', color: '#F5F3FF', icon: 'moon', iconColor: '#6366F1' }, // indigo-50
                    snack: { label: 'Snack', color: '#FDF2F8', icon: 'cookie', iconColor: '#EC4899' }, // pink-50
                  };
                  const config = typeConfig[mealType];

                  return (
                    <View key={mealType} style={[styles.mealSlot, { backgroundColor: config.color }]}>
                      {/* Slot Header */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <AppIcon name={config.icon as any} size={14} color={config.iconColor} />
                          <Text style={[styles.slotLabel, { color: config.iconColor }]}>{config.label}</Text>
                        </View>
                        {meal && (
                          <Pressable onPress={() => removeMealFromPlan(meal.id)} hitSlop={8}>
                            <AppIcon name="x" size={14} color={theme.colors.mutedForeground} />
                          </Pressable>
                        )}
                      </View>

                      {meal && recipe ? (
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                          <Text style={{ fontSize: 20 }}>{recipe.image}</Text>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.slotRecipeName} numberOfLines={1}>{recipe.name}</Text>
                            <Text style={styles.slotRecipeTime}>{recipe.time}</Text>
                          </View>
                        </View>
                      ) : (
                        <Pressable
                          style={styles.addSlotButton}
                          onPress={() => handleOpenAddMeal(dateStr, mealType)}
                        >
                          <AppIcon name="plus" size={16} color={theme.colors.mutedForeground} />
                          <Text style={styles.addSlotText}>Add</Text>
                        </Pressable>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderRecipesTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.helperText}>Drag any recipe to a meal slot on the Plan tab (Tap to add in mobile)</Text>
      {/* Just showing list of recipes as 'Draggable Cards' visually */}
      <View style={{ gap: 12 }}>
        <View style={styles.recipeListCard}>
          <Text style={{ fontSize: 28, marginRight: 16 }}>🍛</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipeListTitle}>Paneer Butter Masala</Text>
            <Text style={styles.recipeListMeta}>30 min • 4 servings</Text>
          </View>
          <AppIcon name="gripVertical" size={20} color={theme.colors.mutedForeground} />
        </View>
        <View style={styles.recipeListCard}>
          <Text style={{ fontSize: 28, marginRight: 16 }}>🍚</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipeListTitle}>Chicken Biryani</Text>
            <Text style={styles.recipeListMeta}>45 min • 6 servings</Text>
          </View>
          <AppIcon name="gripVertical" size={20} color={theme.colors.mutedForeground} />
        </View>
        <View style={styles.recipeListCard}>
          <Text style={{ fontSize: 28, marginRight: 16 }}>🍝</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipeListTitle}>Pasta Primavera</Text>
            <Text style={styles.recipeListMeta}>20 min • 4 servings</Text>
          </View>
          <AppIcon name="gripVertical" size={20} color={theme.colors.mutedForeground} />
        </View>
        <View style={styles.recipeListCard}>
          <Text style={{ fontSize: 28, marginRight: 16 }}>🥣</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipeListTitle}>Fruit Smoothie Bowl</Text>
            <Text style={styles.recipeListMeta}>10 min • 2 servings</Text>
          </View>
          <AppIcon name="gripVertical" size={20} color={theme.colors.mutedForeground} />
        </View>
        <View style={styles.recipeListCard}>
          <Text style={{ fontSize: 28, marginRight: 16 }}>🥗</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipeListTitle}>Grilled Chicken Salad</Text>
            <Text style={styles.recipeListMeta}>25 min • 2 servings</Text>
          </View>
          <AppIcon name="gripVertical" size={20} color={theme.colors.mutedForeground} />
        </View>
      </View>
    </View>
  );

  const renderPrepTab = () => (
    <View style={styles.tabContent}>
      {/* Sample Meal Prep UI matching ReactJS */}
      <View style={styles.prepCard}>
        <View style={styles.prepHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AppIcon name="chefHat" size={22} color={theme.colors.primary} />
            <Text style={styles.prepTitle}>Meal Prep Schedule</Text>
          </View>
          <Pressable style={styles.prepButton}>
            <AppIcon name="bell" size={14} color={theme.colors.foreground} style={{ marginRight: 4 }} />
            <Text style={styles.prepButtonText}>Set All Reminders</Text>
          </Pressable>
        </View>
        <View style={styles.prepToggleRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AppIcon name="bell" size={16} color={theme.colors.primary} />
            <Text style={styles.prepToggleText}>Auto-schedule reminders</Text>
          </View>
          {/* Switch mock */}
          <View style={{ width: 40, height: 24, borderRadius: 12, backgroundColor: theme.colors.muted, alignItems: 'flex-start', padding: 2, justifyContent: 'center' }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 }} />
          </View>
        </View>
      </View>

      <View style={styles.prepCard}>
        <View style={styles.prepHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AppIcon name="clock" size={22} color={theme.colors.mutedForeground} />
            <Text style={styles.prepTitle}>Upcoming Prep Tasks</Text>
          </View>
        </View>
        <View style={{ padding: 32, alignItems: 'center' }}>
          <AppIcon name="chefHat" size={48} color={theme.colors.mutedForeground} style={{ opacity: 0.2, marginBottom: 12 }} />
          <Text style={{ color: theme.colors.mutedForeground, textAlign: 'center' }}>No upcoming meal prep tasks</Text>
          <Text style={{ color: theme.colors.mutedForeground, fontSize: 12, marginTop: 4 }}>Add recipes to your meal plan to see prep times</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <AppLayout showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
              <AppIcon name="arrowLeft" size={20} color={theme.colors.foreground} />
            </Pressable>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.title}>Meal Plan</Text>
              <Text style={styles.subtitle}>{totalMeals} meals planned this week</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable style={styles.actionButton} onPress={clearWeekPlan}>
                <AppIcon name="trash" size={18} color={theme.colors.foreground} />
              </Pressable>
              <Pressable style={styles.actionButton}>
                <AppIcon name="shoppingCart" size={18} color={theme.colors.foreground} style={{ marginRight: 4 }} />
                <Text style={styles.actionButtonText}>List</Text>
              </Pressable>
            </View>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <AppIcon name="sparkles" size={20} color={theme.colors.primary} style={{ marginTop: 2, marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Drag & Drop Recipes</Text>
              <Text style={styles.infoDesc}>Drag recipes from the list to any meal slot, or tap to add manually.</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabBar}>
            {(['plan', 'recipes', 'prep'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const icons = { plan: 'calendar', recipes: 'chefHat', prep: 'info' };
              return (
                <Pressable
                  key={tab}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <AppIcon
                    name={icons[tab] as any}
                    size={16}
                    color={isActive ? theme.colors.foreground : theme.colors.mutedForeground}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Tab Content */}
          {activeTab === 'plan' && renderPlanTab()}
          {activeTab === 'recipes' && renderRecipesTab()}
          {activeTab === 'prep' && renderPrepTab()}

        </ScrollView>
      </AppLayout>

      <AddMealModal
        open={!!addMealModal}
        onClose={() => setAddMealModal(null)}
        onSelectRecipe={handleSelectRecipe}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(46, 94, 153, 0.05)', // primary/5
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.foreground,
    marginBottom: 2,
  },
  infoDesc: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.muted,
    padding: 4,
    borderRadius: 16,
    marginBottom: 20,
    height: 48,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  tabItemActive: {
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.mutedForeground,
  },
  tabTextActive: {
    color: theme.colors.foreground,
  },
  tabContent: {
    gap: 16,
  },
  weekNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.muted,
    padding: 12,
    borderRadius: 16,
    marginBottom: 4,
  },
  navArrow: {
    padding: 8,
  },
  weekDateRange: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  weekYear: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  dayCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: 16,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  dayCardToday: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dayDateGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadgeToday: {
    backgroundColor: theme.colors.primary,
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  monthName: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  mealGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mealSlot: {
    width: (SCREEN_WIDTH - 32 - 32 - 12) / 2, // padding, gap logic approximation 
    // Actually full width calculation: Window - 2*ScreenPadding(20) - 2*CardPadding(16) - Gap(12) / 2
    // Let's use flex basis for simpler flow
    flexBasis: '47%',
    borderRadius: 16,
    padding: 12,
    minHeight: 100,
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  addSlotButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
  },
  addSlotText: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    fontWeight: '500',
  },
  slotRecipeName: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  slotRecipeTime: {
    fontSize: 11,
    color: theme.colors.mutedForeground,
  },
  // Recipes Tab Styles
  helperText: {
    fontSize: 13,
    color: theme.colors.mutedForeground,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  recipeListCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  recipeListTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  recipeListMeta: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  // Prep Tab Styles
  prepCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 0,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  prepHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  prepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  prepButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.foreground,
  },
  prepToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: theme.colors.muted,
    margin: 16,
    borderRadius: 12,
  },
  prepToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.foreground,
  },
});
