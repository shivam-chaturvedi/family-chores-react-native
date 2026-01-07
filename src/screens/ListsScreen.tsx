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
import { useFamily } from "../contexts/FamilyContext";
import { theme } from "../theme";
import { GlobalSearch } from "../components/search/GlobalSearch";
import { useSidebar } from "../contexts/SidebarContext";

type GroceryItem = {
  id: string;
  name: string;
  category: string;
  quantity: string;
  owner: string;
  icon: string;
  status: "todo" | "done";
};

const sampleList: GroceryItem[] = [
  { id: "1", name: "Milk", category: "Dairy", quantity: "2 L", owner: "Partner", icon: "👩‍❤️‍👨", status: "todo" },
  { id: "2", name: "Eggs", category: "Meat & Protein", quantity: "12 pcs", owner: "Partner", icon: "👩‍❤️‍👨", status: "todo" },
  { id: "3", name: "Rice", category: "Pantry", quantity: "5 kg", owner: "Me", icon: "🧑", status: "todo" },
  { id: "4", name: "Bread", category: "Bakery", quantity: "1 loaf", owner: "Me", icon: "🧑", status: "done" },
];

const tabs = ["By Category", "All Items"];

const memberBadges = [
  { label: "Me", icon: "🧑" },
  { label: "Partner", icon: "👩‍❤️‍👨" },
];

export const ListsScreen: React.FC = () => {
  const { groceryList } = useFamily();
  const [activeTab, setActiveTab] = useState("By Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const { openSidebar } = useSidebar();
  const filteredItems = useMemo(() => {
    const combinedList = [...groceryList, ...sampleList];
    return combinedList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groceryList, searchQuery]);

  const todoItems = filteredItems.filter((item) => item.status === "todo");
  const doneItems = filteredItems.filter((item) => item.status === "done");
  const progress = filteredListProgress(filteredItems);

  function filteredListProgress(items: GroceryItem[]) {
    const todo = items.filter((item) => item.status === "todo").length;
    const total = items.length;
    if (!total) return 0;
    return Math.round((total - todo) / total * 100);
  }

  const handleAddQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <>
      <AppLayout showAddButton={false} showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
            <View>
              <Text style={styles.title}>Grocery</Text>
              <Text style={styles.subtitle}>List</Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable style={styles.roundButton} onPress={() => setShowSearch(true)}>
                <Text style={styles.iconText}>🔍</Text>
              </Pressable>
              <Pressable style={styles.roundButton}>
                <Text style={styles.iconText}>📅</Text>
              </Pressable>
              <Pressable style={styles.roundButton}>
                <Text style={styles.iconText}>🎙️</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressIcon}>
              <Text style={styles.iconText}>🛒</Text>
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>{todoItems.length}/{filteredItems.length} items</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </View>
          </View>

          <View style={styles.tabRow}>
            {tabs.map((tab) => {
              const active = tab === activeTab;
              return (
                <Pressable
                  key={tab}
                  style={[styles.tabPill, active && styles.tabPillActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.addRow}>
            <TextInput
              style={styles.addInput}
              placeholder="Add item..."
              placeholderTextColor={theme.colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={styles.qtyControl}>
              <Pressable style={styles.qtyButton} onPress={() => handleAddQuantity(-1)}>
                <Text style={styles.qtySymbol}>－</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <Pressable style={styles.qtyButton} onPress={() => handleAddQuantity(1)}>
                <Text style={styles.qtySymbol}>＋</Text>
              </Pressable>
            </View>
            <Pressable style={styles.addButton}>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View>

          {activeTab === "By Category" ? (
            <>
              {groupedByCategory(todoItems).map((group) => (
                <View key={group.category} style={styles.categoryCard}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryTitle}>{group.category}</Text>
                    <Text style={styles.categoryCount}>{group.items.length}</Text>
                  </View>
                  {group.items.map((item) => (
                    <View key={item.id} style={styles.todoRow}>
                      <View style={styles.todoLeft}>
                        <Text style={styles.dragHandle}>⋮⋮</Text>
                        <View style={styles.checkbox} />
                        <Text style={styles.todoText}>{item.name}</Text>
                      </View>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <View style={styles.ownerBadge}>
                        <Text style={styles.ownerIcon}>{item.icon}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </>
          ) : (
            <>
              <View style={styles.listWrapper}>
                <Text style={styles.sectionTitle}>To Buy ({todoItems.length})</Text>
                {todoItems.map((item) => (
                  <View key={item.id} style={styles.todoRow}>
                    <View style={styles.todoLeft}>
                      <Text style={styles.dragHandle}>⋮⋮</Text>
                      <View style={styles.checkbox} />
                      <Text style={styles.todoText}>{item.name}</Text>
                    </View>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <View style={styles.ownerBadge}>
                      <Text style={styles.ownerIcon}>{item.icon}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.listWrapper}>
                <Text style={styles.sectionTitle}>Completed ({doneItems.length})</Text>
                {doneItems.map((item) => (
                  <View key={item.id} style={[styles.todoRow, styles.completedRow]}>
                    <View style={styles.todoLeft}>
                      <Text style={styles.dragHandle}>⋮⋮</Text>
                      <View style={[styles.checkbox, styles.checkboxActive]}>
                        <Text style={styles.checkMark}>✓</Text>
                      </View>
                      <Text style={[styles.todoText, styles.completedText]}>
                        {item.name}
                      </Text>
                    </View>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <View style={styles.ownerBadge}>
                      <Text style={styles.ownerIcon}>{item.icon}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={styles.memberRow}>
            <Text style={styles.sectionTitle}>Added by</Text>
            <View style={styles.badgeList}>
              {memberBadges.map((badge) => (
                <View key={badge.label} style={styles.memberBadge}>
                  <Text style={styles.ownerIcon}>{badge.icon}</Text>
                  <Text style={styles.memberText}>{badge.label}</Text>
                  <Text style={styles.memberCount}>(2)</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </AppLayout>
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

const groupedByCategory = (items: GroceryItem[]) => {
  const groups: Record<string, GroceryItem[]> = {};
  items.forEach((item) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  });
  return Object.entries(groups).map(([category, groupItems]) => ({
    category,
    items: groupItems,
  }));
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  headerActions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  iconText: {
    fontSize: 20,
  },
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: 24,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  progressIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#e6f5ec",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 10,
    backgroundColor: theme.colors.muted,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2c9a59",
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 18,
    padding: 4,
    marginBottom: theme.spacing.lg,
  },
  tabPill: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: 14,
  },
  tabPillActive: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.card,
  },
  tabText: {
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },
  tabTextActive: {
    color: theme.colors.foreground,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  addInput: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: theme.colors.muted,
    paddingHorizontal: theme.spacing.md,
    fontSize: 16,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: theme.spacing.sm,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.muted,
    justifyContent: "center",
    alignItems: "center",
  },
  qtySymbol: {
    fontSize: 22,
  },
  qtyValue: {
    width: 24,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    borderRadius: 16,
  },
  addText: {
    color: theme.colors.primaryForeground,
    fontWeight: "700",
  },
  categoryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  categoryCount: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.muted,
    padding: theme.spacing.sm,
    borderRadius: 14,
    marginBottom: theme.spacing.sm,
  },
  todoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dragHandle: {
    marginRight: theme.spacing.sm,
    color: theme.colors.mutedForeground,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  checkboxActive: {
    backgroundColor: "#2c9a59",
    borderColor: "#2c9a59",
  },
  checkMark: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  todoText: {
    fontWeight: "600",
    color: theme.colors.foreground,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: theme.colors.mutedForeground,
  },
  quantityText: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.mutedForeground,
  },
  ownerBadge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#e1e6ef",
    justifyContent: "center",
    alignItems: "center",
  },
  ownerIcon: {
    fontSize: 16,
  },
  listWrapper: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: theme.spacing.md,
    color: theme.colors.foreground,
  },
  completedRow: {
    backgroundColor: "#e8f5ea",
  },
  memberRow: {
    marginVertical: theme.spacing.md,
  },
  badgeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: 12,
    gap: theme.spacing.xs,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  memberText: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  memberCount: {
    color: theme.colors.mutedForeground,
  },
});
