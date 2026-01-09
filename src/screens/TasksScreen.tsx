import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { AddTaskModal } from "../components/modals/AddTaskModal";
import { GlobalSearch } from "../components/search/GlobalSearch";
import { useSidebar } from "../contexts/SidebarContext";
import { AppIcon } from "../components/ui/AppIcon";

interface Task {
  id: string;
  icon: string;
  name: string;
  status: "pending" | "done";
  priority: "high" | "medium" | "low";
  due: string;
  assignee: string;
  tab: string;
}

const tabs = ["My Tasks", "Family Tasks", "Kids Chores"];

const initialTasks: Task[] = [
  { id: "t1", icon: "📝", name: "Complete project report", status: "pending", priority: "high", due: "Today", assignee: "You", tab: "My Tasks" },
  { id: "t2", icon: "📞", name: "Call insurance company", status: "pending", priority: "medium", due: "Today", assignee: "You", tab: "My Tasks" },
  { id: "t3", icon: "💊", name: "Pick up medications", status: "done", priority: "high", due: "Done", assignee: "You", tab: "My Tasks" },
  { id: "t4", icon: "📧", name: "Reply to emails", status: "done", priority: "low", due: "Done", assignee: "You", tab: "My Tasks" },

  { id: "t5", icon: "🏫", name: "Sign permission slip", status: "done", priority: "high", due: "Tomorrow", assignee: "Mom", tab: "Family Tasks" },
  { id: "t6", icon: "🛠️", name: "Fix leaky faucet", status: "pending", priority: "medium", due: "This week", assignee: "Dad", tab: "Family Tasks" },
  { id: "t7", icon: "📦", name: "Order birthday cake", status: "pending", priority: "high", due: "In 2 days", assignee: "You", tab: "Family Tasks" },

  { id: "t8", icon: "🛏️", name: "Make bed", status: "done", priority: "medium", due: "Done", assignee: "Emma", tab: "Kids Chores" },
  { id: "t9", icon: "🐶", name: "Feed the dog", status: "pending", priority: "low", due: "Today", assignee: "Jake", tab: "Kids Chores" },
  { id: "t10", icon: "🧺", name: "Put away laundry", status: "pending", priority: "medium", due: "This afternoon", assignee: "Emma", tab: "Kids Chores" },
];

const getPriorityStyle = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return { label: "High", color: "#f57c7c", background: "rgba(245, 124, 124, 0.15)" };
    case "medium":
      return { label: "Medium", color: "#f5a623", background: "rgba(245, 166, 35, 0.2)" };
    default:
      return { label: "Low", color: "#8fa7d7", background: "rgba(143, 167, 215, 0.25)" };
  }
};

export const TasksScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Tasks");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { openSidebar } = useSidebar();

  const [taskEntries, setTaskEntries] = useState<Task[]>(initialTasks);

  const filteredTasks = useMemo(
    () => taskEntries.filter((task) => task.tab === activeTab),
    [activeTab, taskEntries]
  );

  const completedCount = filteredTasks.filter((task) => task.status === "done").length;
  const totalCount = filteredTasks.length;
  const progress = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleTask = (taskId: string) => {
    setTaskEntries((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      )
    );
  };

  return (
    <>
      <AppLayout showAddButton={false} showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={openSidebar} style={styles.menuButton}>
              <AppIcon name="menu" size={20} color={theme.colors.foreground} />
            </Pressable>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.headerActions}>
              <Pressable style={styles.roundAction} onPress={() => setShowSearch(true)}>
                <AppIcon source="🔍" size={18} color={theme.colors.foreground} />
              </Pressable>
              <Pressable style={styles.roundAction}>
                <AppIcon source="⚲" size={18} color={theme.colors.foreground} />
              </Pressable>
              <Pressable style={styles.plusAction} onPress={() => setShowAddTask(true)}>
                <AppIcon name="plus" size={18} color={theme.colors.primary} />
              </Pressable>
            </View>
          </View>

          <View style={styles.tabs}>
            {tabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tab, isActive && styles.tabActive]}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress: {completedCount}/{totalCount}</Text>
              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          <View style={styles.taskList}>
            {filteredTasks.map((task) => {
              const priorityStyle = getPriorityStyle(task.priority);
              return (
                <View
                  key={task.id}
                  style={[styles.taskCard, task.status === "done" && styles.taskDone]}
                >
                  <Pressable
                    style={[styles.checkCircle, task.status === "done" && styles.checkCircleActive]}
                    onPress={() => toggleTask(task.id)}
                  >
                    {task.status === "done" && <Text style={styles.checkMark}>✓</Text>}
                  </Pressable>
                  <View style={styles.taskDetails}>
                    <View style={styles.taskTitleRow}>
                      <AppIcon source={task.icon} size={20} color={theme.colors.primary} style={styles.taskListIcon} />
                      <Text style={[styles.taskTitle, task.status === "done" && styles.taskTextDone]}>
                        {task.name}
                      </Text>
                    </View>
                    <View style={styles.metaRow}>
                      <View style={[styles.priorityBadge, { backgroundColor: priorityStyle.background }]}>
                        <Text style={[styles.priorityText, { color: priorityStyle.color }]}>
                          {priorityStyle.label}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <AppIcon name="clock" size={14} color={palette.ocean} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{task.due}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <AppIcon name="user" size={14} color={palette.ocean} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{task.assignee}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <Pressable style={styles.addNewRow}>
            <AppIcon name="plus" size={16} color={theme.colors.primary} style={styles.addNewIcon} />
            <Text style={styles.addNewText}>Add new task</Text>
          </Pressable>
        </ScrollView>
      </AppLayout>
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
      <AddTaskModal open={showAddTask} onClose={() => setShowAddTask(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  roundAction: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  plusAction: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryForeground,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
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
  progressCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: theme.spacing.lg,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  progressLabel: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  progressPercent: {
    fontWeight: "600",
    color: theme.colors.mutedForeground,
  },
  progressBar: {
    height: 10,
    backgroundColor: theme.colors.muted,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
  },
  taskList: {
    marginBottom: theme.spacing.lg,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: theme.colors.card,
    borderRadius: 22,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  taskDone: {
    opacity: 0.6,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.mutedForeground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  checkCircleActive: {
    backgroundColor: "#8bc34a",
    borderColor: "#8bc34a",
  },
  taskDetails: {
    flex: 1,
  },
  taskTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  taskListIcon: {
    marginRight: theme.spacing.sm,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: 6,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: theme.colors.mutedForeground,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: theme.spacing.sm,
  },
  metaIcon: {
    marginRight: theme.spacing.xs,
  },
  priorityBadge: {
    borderRadius: 999,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 4,
  },
  priorityText: {
    fontWeight: "700",
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  addNewRow: {
    marginTop: theme.spacing.sm,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  addNewIcon: {
    marginRight: theme.spacing.xs,
  },
  addNewText: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 18,
  },
});
