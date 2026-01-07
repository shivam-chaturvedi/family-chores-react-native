import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLayout } from "../components/layout/AppLayout";
import { useNavigation } from "@react-navigation/native";
import { useFamily } from "../contexts/FamilyContext";
import { useMealPlan } from "../contexts/MealPlanContext";
import { theme } from "../theme";
import { AddEventModal } from "../components/modals/AddEventModal";
import { AddMemberModal } from "../components/modals/AddMemberModal";
import { NotificationPanel } from "../components/notifications/NotificationPanel";
import { GettingStartedTutorial } from "../components/tutorial/GettingStartedTutorial";
import { GlobalSearch } from "../components/search/GlobalSearch";
import { useSidebar } from "../contexts/SidebarContext";

const STORAGE_TUTORIAL_KEY = "@familychore:hasSeenTutorial";

const alerts = [
  { id: "1", title: "Grocery Running Low", detail: "Milk, Eggs, Bread needed", tone: "#f8d9a7" },
  { id: "2", title: "LPG Refill Due", detail: "Book cylinder before Jan 15", tone: "#f8d9a7" },
  { id: "3", title: "Warranty Expiring", detail: "TV warranty expires in 30 days", tone: "#d7e6ff" },
];

export const HomeScreen: React.FC = () => {
  const { members, activeMember, familyName, events, groceryList } = useFamily();
  const { plannedMeals, getMealsForDay } = useMealPlan();
  const navigation = useNavigation();
  const { openSidebar } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_TUTORIAL_KEY).then((value) => {
      if (!value) {
        setShowTutorial(true);
      }
    });
  }, []);

  const handleTutorialClose = async () => {
    await AsyncStorage.setItem(STORAGE_TUTORIAL_KEY, "true");
    setShowTutorial(false);
  };

  const quickActions = [
    { label: "Event", icon: "📅", action: () => setShowAddEvent(true) },
    { label: "Task", icon: "✅", action: () => setShowNotifications(true) },
    { label: "Item", icon: "🛒", action: () => setShowAddMember(true) },
    { label: "Recipe", icon: "🍽️", action: () => {} },
    { label: "Document", icon: "📄", action: () => navigation.navigate("Documents" as never) },
  ];

  const todayKey = new Date().toISOString().split("T")[0];
  const todayMeals = getMealsForDay(todayKey);
  const pendingGroceries = groceryList.filter((item) => !item.completed).length;

  return (
    <>
      <AppLayout
        style={styles.layout}
        showNav={false}
        onAddPress={() => setShowAddEvent(true)}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={openSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>≡</Text>
            </TouchableOpacity>
            <View style={styles.topTitle}>
              <Text style={styles.dateLabel}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</Text>
              <Text style={styles.greeting}>
                Good {new Date().getHours() < 12 ? "Morning" : "Afternoon"}, {activeMember?.name || "Me"} 👋
              </Text>
            </View>
            <View style={styles.topActions}>
              <Pressable onPress={() => setShowSearch(true)} style={styles.topIcon}>
                <Text>🔍</Text>
              </Pressable>
              <Pressable onPress={() => setShowNotifications(true)} style={styles.topIcon}>
                <Text>🔔</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.memberRow}>
              {members.map((member) => (
                <View key={member.id} style={[styles.memberChip, member.isActive && styles.activeMember]}>
                  <Text style={styles.memberSymbol}>{member.symbol}</Text>
                  <Text style={styles.memberName}>{member.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.profileActions}>
              <Text style={styles.sectionLabel}>Family Chores</Text>
              <Pressable style={styles.profileSetup}>
                <Text style={styles.profileSetupText}>Setup + Add</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.glanceCard}>
            <View style={styles.glanceHeader}>
              <Text style={styles.glanceTitle}>Today at a Glance</Text>
              <Text style={styles.glanceLink}>View Dashboard</Text>
            </View>
            <View style={styles.glanceStats}>
              <View style={styles.glanceStat}>
                <Text style={styles.glanceStatValue}>{events.length}</Text>
                <Text style={styles.glanceStatLabel}>Events</Text>
              </View>
              <View style={styles.glanceStat}>
                <Text style={styles.glanceStatValue}>{groceryList.length}</Text>
                <Text style={styles.glanceStatLabel}>Tasks</Text>
              </View>
              <View style={styles.glanceStat}>
                <Text style={styles.glanceStatValue}>{todayMeals.length}</Text>
                <Text style={styles.glanceStatLabel}>Reminders</Text>
              </View>
            </View>
          </View>

          <View style={styles.quickActionsCard}>
            <Text style={styles.sectionLabel}>Quick Actions</Text>
            <View style={styles.quickActionsRow}>
              {quickActions.map((action) => (
                <Pressable key={action.label} style={styles.quickActionItem} onPress={action.action}>
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                  <Text style={styles.quickActionText}>{action.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.scheduleCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
              <Text style={styles.sectionLink}>View All</Text>
            </View>
            {events.slice(0, 3).map((event) => (
              <View key={event.id} style={styles.scheduleRow}>
                <View>
                  <Text style={styles.scheduleTitle}>{event.title}</Text>
                  <Text style={styles.scheduleMeta}>
                    ⏰ {event.time}
                  </Text>
                </View>
                <View style={styles.scheduleAvatar}>
                  <Text>👤</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.mealsCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Meals Today</Text>
              <Text style={styles.sectionLink}>Meal Plan ›</Text>
            </View>
            <View style={styles.mealRow}>
              {["Breakfast", "Lunch", "Dinner"].map((meal, index) => (
                <View key={meal} style={[styles.mealItem, index === 2 && styles.mealItemDimmed]}>
                  <Text style={styles.mealTitle}>{meal}</Text>
                  <Text style={styles.mealSubtitle}>Sample dish</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.alertsCard}>
            <Text style={styles.sectionTitle}>Alerts & Reminders</Text>
            {alerts.map((alert) => (
              <View key={alert.id} style={[styles.alertRow, { backgroundColor: alert.tone }]}>
                <Text style={styles.alertIcon}>⚠️</Text>
                <View style={styles.alertText}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertDetail}>{alert.detail}</Text>
                </View>
                <Text style={styles.alertChevron}>›</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statBlock}>
              <Text style={styles.statIcon}>🛒</Text>
              <Text style={styles.statTitle}>Grocery</Text>
              <Text style={styles.statValueLarge}>{pendingGroceries}</Text>
              <Text style={styles.statMeta}>items pending</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statIcon}>🛡️</Text>
              <Text style={styles.statTitle}>Vault</Text>
              <Text style={styles.statValueLarge}>{groceryList.length * 5}</Text>
              <Text style={styles.statMeta}>documents</Text>
            </View>
          </View>
        </ScrollView>
      </AppLayout>


      <NotificationPanel open={showNotifications} onClose={() => setShowNotifications(false)} notifications={alerts} />
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
      <GettingStartedTutorial open={showTutorial} onClose={handleTutorialClose} />

      <AddEventModal open={showAddEvent} onClose={() => setShowAddEvent(false)} />
      <AddMemberModal open={showAddMember} onClose={() => setShowAddMember(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 160,
    backgroundColor: theme.colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  menuButton: {
    padding: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
  },
  menuIcon: {
    fontSize: 20,
  },
  topTitle: {
    flex: 1,
    marginHorizontal: theme.spacing.lg,
  },
  dateLabel: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  topActions: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  topIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing.sm,
  },
  profileCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  memberRow: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
  },
  memberChip: {
    alignItems: "center",
    padding: theme.spacing.sm,
    borderRadius: 16,
    backgroundColor: "#edf3ff",
    marginRight: theme.spacing.lg,
  },
  activeMember: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
  },
  memberSymbol: {
    fontSize: 32,
  },
  memberName: {
    marginTop: 4,
    fontWeight: "600",
  },
  profileActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    fontSize: 16,
    color: theme.colors.foreground,
    fontWeight: "600",
  },
  profileSetup: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: "#dfe9f5",
  },
  profileSetupText: {
    fontWeight: "600",
    color: theme.colors.primary,
  },
  glanceCard: {
    backgroundColor: "#0c2a48",
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  glanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  glanceTitle: {
    color: "#f6f9ff",
    fontSize: 18,
    fontWeight: "700",
  },
  glanceLink: {
    color: "#c7dfff",
  },
  glanceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  glanceStat: {
    flex: 1,
    backgroundColor: "#123861",
    borderRadius: 16,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    alignItems: "center",
  },
  glanceStatValue: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  glanceStatLabel: {
    color: "#c7dfff",
    fontSize: 14,
  },
  quickActionsCard: {
    marginBottom: theme.spacing.lg,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  quickActionItem: {
    width: "18%",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    padding: theme.spacing.sm,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  scheduleCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionLink: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#eef2fb",
    borderRadius: 16,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  scheduleMeta: {
    color: theme.colors.mutedForeground,
    marginTop: 4,
  },
  scheduleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#dfe9f5",
    alignItems: "center",
    justifyContent: "center",
  },
  mealsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mealItem: {
    flex: 1,
    backgroundColor: "#e7f8f0",
    borderRadius: 18,
    padding: theme.spacing.md,
    marginRight: theme.spacing.sm,
  },
  mealItemDimmed: {
    backgroundColor: "#e0e8f5",
    marginRight: 0,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  mealSubtitle: {
    color: theme.colors.mutedForeground,
    marginTop: 4,
  },
  alertsCard: {
    marginBottom: theme.spacing.lg,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  alertIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: "700",
  },
  alertDetail: {
    color: theme.colors.mutedForeground,
  },
  alertChevron: {
    fontSize: 20,
    color: theme.colors.mutedForeground,
  },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  statBlock: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 18,
    padding: theme.spacing.lg,
    marginRight: theme.spacing.md,
    alignItems: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: theme.spacing.sm,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  statValueLarge: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: theme.spacing.sm,
  },
  statMeta: {
    color: theme.colors.mutedForeground,
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  eventIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  eventTitle: {
    fontWeight: "600",
  },
  eventMeta: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
});
