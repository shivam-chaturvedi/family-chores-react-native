import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { AppSidebar } from "../components/layout/AppSidebar";
import { Button } from "../components/ui/Button";
import { theme } from "../theme";
import { AddTaskModal } from "../components/modals/AddTaskModal";
import { GlobalSearch } from "../components/search/GlobalSearch";

const tabs = ["My Tasks", "Family Tasks", "Kids Chores"];

const sampleTasks = {
  "My Tasks": [
    { id: 1, icon: "📝", name: "Complete report", done: false, priority: "high", due: "Today" },
    { id: 2, icon: "📞", name: "Call insurance", done: true, priority: "medium", due: "Today" },
  ],
  "Family Tasks": [
    { id: 3, icon: "🏡", name: "Garden cleanup", done: false, priority: "low", due: "This week" },
    { id: 4, icon: "💧", name: "Fix leak", done: true, priority: "medium", due: "Tomorrow" },
  ],
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "#FF7A7A";
    case "medium":
      return "#FDCB6E";
    default:
      return "#A0AEC0";
  }
};

export const TasksScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Tasks");
  const [tasks, setTasks] = useState(sampleTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const currentTasks = tasks[activeTab as keyof typeof tasks] || [];

  const toggleTask = (id: number) => {
    setTasks((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab as keyof typeof prev].map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      ),
    }));
  };

  return (
    <>
      <AppLayout showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={() => setSidebarOpen(true)} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.actions}>
              <Button variant="ghost" size="sm" onPress={() => setShowSearch(true)}>
                Search
              </Button>
              <Button variant="ghost" size="sm" onPress={() => setShowAddTask(true)}>
                Add Task
              </Button>
            </View>
          </View>

          <View style={styles.tabs}>
            {tabs.map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab,
                  activeTab === tab && styles.tabActive,
                ]}
              >
                <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          {activeTab === "Kids Chores" ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Kids Chores rotation will appear here.</Text>
            </View>
          ) : (
            <View style={styles.list}>
              {currentTasks.map((task) => (
                <Pressable
                  key={task.id}
                  style={[styles.taskCard, task.done && styles.taskDone]}
                  onPress={() => toggleTask(task.id)}
                >
                  <Text style={styles.taskIcon}>{task.icon}</Text>
                  <View style={styles.taskBody}>
                    <Text style={[styles.taskName, task.done && styles.taskTextDone]}>{task.name}</Text>
                    <Text style={styles.taskMeta}>{task.due}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                    <Text style={styles.priorityText}>{task.priority}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      </AppLayout>
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
      <AddTaskModal open={showAddTask} onClose={() => setShowAddTask(false)} />
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
    justifyContent: "space-between",
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
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    padding: 4,
    marginBottom: theme.spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: 12,
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
  list: {
    marginTop: theme.spacing.sm,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 18,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  taskDone: {
    opacity: 0.6,
  },
  taskIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  taskBody: {
    flex: 1,
  },
  taskName: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
  },
  taskMeta: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  priorityBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#111",
    textTransform: "capitalize",
  },
  empty: {
    padding: theme.spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
});
