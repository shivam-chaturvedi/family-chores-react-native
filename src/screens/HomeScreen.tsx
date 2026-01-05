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
import { AppSidebar } from "../components/layout/AppSidebar";
import { useNavigation } from "@react-navigation/native";
import { useFamily } from "../contexts/FamilyContext";
import { useMealPlan } from "../contexts/MealPlanContext";
import { Button } from "../components/ui/Button";
import { theme } from "../theme";
import { AddEventModal } from "../components/modals/AddEventModal";
import { AddTaskModal } from "../components/modals/AddTaskModal";
import { AddItemModal } from "../components/modals/AddItemModal";
import { AddMemberModal } from "../components/modals/AddMemberModal";
import { NotificationPanel } from "../components/notifications/NotificationPanel";
import { GettingStartedTutorial } from "../components/tutorial/GettingStartedTutorial";
import { GlobalSearch } from "../components/search/GlobalSearch";

const STORAGE_TUTORIAL_KEY = "@familychore:hasSeenTutorial";

export const HomeScreen: React.FC = () => {
  const { members, activeMember, familyName, events, groceryList } = useFamily();
  const { plannedMeals, getMealsForDay } = useMealPlan();
  const navigation = useNavigation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
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

  const todayKey = new Date().toISOString().split("T")[0];
  const todayMeals = getMealsForDay(todayKey);
  const pendingGroceries = groceryList.filter((item) => !item.completed).length;
  const quickActions = [
    { label: "Event", icon: "📅", action: () => setShowAddEvent(true) },
    { label: "Task", icon: "✅", action: () => setShowAddTask(true) },
    { label: "Item", icon: "🛒", action: () => setShowAddItem(true) },
    { label: "Member", icon: "👥", action: () => setShowAddMember(true) },
    { label: "Recipes", icon: "🍽️", action: () => {} },
  ];

  const notifications = [
    { id: "1", title: "Grocery Low", message: "Milk and Eggs running low", time: "2h ago" },
    { id: "2", title: "Warranty Due", message: "TV warranty expires soon", time: "Yesterday" },
    { id: "3", title: "School Event", message: "PTA meeting tomorrow", time: "3h ago" },
  ];

  return (
    <>
      <AppLayout style={styles.layout}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.subHeader}>Today</Text>
              <Text style={styles.title}>
                Good {new Date().getHours() < 12 ? "Morning" : "Afternoon"}, {activeMember?.name || "Family"}
              </Text>
              <Text style={styles.subtitle}>{familyName}</Text>
            </View>
            <View style={styles.actions}>
              <Pressable onPress={() => setShowSearch(true)} style={styles.iconButton}>
                <Text style={styles.iconText}>🔍</Text>
              </Pressable>
              <Pressable onPress={() => setShowNotifications(true)} style={styles.iconButton}>
                <Text style={styles.iconText}>🔔</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.members}>
            {members.map((member) => (
              <View
                key={member.id}
                style={[
                  styles.memberChip,
                  member.isActive && styles.memberActive,
                ]}
              >
                <Text style={styles.memberSymbol}>{member.symbol}</Text>
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
            ))}
            <Pressable onPress={() => setShowAddMember(true)} style={styles.memberAdd}>
              <Text style={styles.memberAddText}>+ Add</Text>
            </Pressable>
          </ScrollView>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  size="sm"
                  onPress={action.action}
                  style={styles.quickActionButton}
                >
                  <Text style={styles.quickActionText}>
                    {action.icon} {action.label}
                  </Text>
                </Button>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today at a Glance</Text>
            <View style={styles.statRow}>
              <View>
                <Text style={styles.statLabel}>Events</Text>
                <Text style={styles.statValue}>{events.length}</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Groceries</Text>
                <Text style={styles.statValue}>{pendingGroceries} pending</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Meals</Text>
                <Text style={styles.statValue}>{todayMeals.length} planned</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Family Activity</Text>
            {events.slice(0, 3).map((event) => (
              <View key={event.id} style={styles.eventRow}>
                <Text style={styles.eventIcon}>{event.icon}</Text>
                <View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventMeta}>
                    {event.time} · {event.location || "Home"}
                  </Text>
                </View>
              </View>
            ))}
            <Button variant="outline" onPress={() => setShowNotifications(true)}>
              View Notifications
            </Button>
          </View>
        </ScrollView>
      </AppLayout>
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={(route) => navigation.navigate(route as never)} />

      <NotificationPanel open={showNotifications} onClose={() => setShowNotifications(false)} notifications={notifications} />
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
      <GettingStartedTutorial open={showTutorial} onClose={handleTutorialClose} />

      <AddEventModal open={showAddEvent} onClose={() => setShowAddEvent(false)} />
      <AddTaskModal open={showAddTask} onClose={() => setShowAddTask(false)} />
      <AddItemModal open={showAddItem} onClose={() => setShowAddItem(false)} />
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
    paddingBottom: 120,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  menuButton: {
    padding: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
  },
  menuIcon: {
    fontSize: 18,
  },
  subHeader: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
  },
  iconText: {
    fontSize: 18,
  },
  members: {
    paddingVertical: theme.spacing.sm,
  },
  memberChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    flexDirection: "row",
    alignItems: "center",
  },
  memberActive: {
    backgroundColor: theme.colors.primaryLight,
  },
  memberSymbol: {
    marginRight: 6,
  },
  memberName: {
    fontWeight: "600",
  },
  memberAdd: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  memberAddText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
    color: theme.colors.foreground,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  quickActionButton: {
    borderRadius: 16,
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  quickActionText: {
    fontSize: 14,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statLabel: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.foreground,
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
