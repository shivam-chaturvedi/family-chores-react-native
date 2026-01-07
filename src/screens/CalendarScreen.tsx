import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { GlobalSearch } from "../components/search/GlobalSearch";
import { useFamily } from "../contexts/FamilyContext";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

const views = ["Day", "Week", "Month"];
const timelineHours = Array.from({ length: 16 }, (_, index) => 8 + index);

const memberColorMap: Record<string, string> = {
  "member-blue": "#2255ba",
  "member-green": "#24a05e",
  "member-orange": "#f68b1f",
};

const formatDateKey = (date: Date) => date.toISOString().split("T")[0];
const formatHourLabel = (hour: number) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalized = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${normalized} ${suffix}`;
};

export const CalendarScreen: React.FC = () => {
  const { members, events } = useFamily();
  const [view, setView] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMemberId, setSelectedMemberId] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const { openSidebar } = useSidebar();

  const filterOptions = useMemo(() => {
    return [
      { id: "all", label: "All", icon: "👥" },
      ...members.map((member) => ({
        id: member.id,
        label: member.name,
        icon: member.symbol,
        color: memberColorMap[member.color] || theme.colors.primary,
      })),
    ];
  }, [members]);

  const baseWeek = useMemo(() => {
    const startDate = new Date(selectedDate);
    startDate.setDate(selectedDate.getDate() - selectedDate.getDay());
    return Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + index);
      return day;
    });
  }, [selectedDate]);

  const today = new Date();
  const todayKey = formatDateKey(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = formatDateKey(tomorrow);

  const upcoming = useMemo(() => {
    const base =
      selectedMemberId === "all"
        ? events
        : events.filter((item) => item.memberId === selectedMemberId);
    return {
      today: base.filter((event) => event.date === todayKey),
      tomorrow: base.filter((event) => event.date === tomorrowKey),
    };
  }, [events, selectedMemberId, todayKey, tomorrowKey]);

  const handleNavigate = (direction: number) => {
    const next = new Date(selectedDate);
    if (view === "Month") {
      next.setMonth(next.getMonth() + direction);
    } else if (view === "Week") {
      next.setDate(next.getDate() + direction * 7);
    } else {
      next.setDate(next.getDate() + direction);
    }
    setSelectedDate(next);
  };

  const goToToday = () => setSelectedDate(new Date());

  const dayLabel = selectedDate.toLocaleDateString("en-US", { weekday: "short" });
  const monthYearLabel = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <AppLayout showAddButton={false} showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerShell}>
            <View style={styles.headerBackground}>
              <View style={styles.headerRow}>
                <Pressable style={styles.iconCircle} onPress={openSidebar}>
                  <Text style={styles.iconText}>☰</Text>
                </Pressable>
                <View style={styles.titleBlock}>
                  <Text style={styles.headerTitle}>January</Text>
                  <Text style={styles.headerSubtitle}>2026</Text>
                </View>
                <View style={styles.headerActions}>
                  <Pressable style={styles.actionBubble} onPress={() => setShowSearch(true)}>
                    <Text style={styles.iconText}>🔍</Text>
                  </Pressable>
                  <Pressable style={styles.actionBubble}>
                    <Text style={styles.iconText}>🔔</Text>
                  </Pressable>
                  <Pressable style={styles.addEventButton}>
                    <Text style={styles.addEventText}>＋ Add Event</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.viewToggle}>
                {views.map((option) => {
                  const isActive = view === option;
                  return (
                    <Pressable
                      key={option}
                      style={[styles.viewItem, isActive && styles.viewItemActive]}
                      onPress={() => setView(option)}
                    >
                      <Text style={[styles.viewText, isActive && styles.viewTextActive]}>{option}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.filterRow}>
            {filterOptions.map((option) => {
              const isActive = selectedMemberId === option.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setSelectedMemberId(option.id)}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                >
                  <Text style={[styles.filterIcon, isActive && styles.filterIconActive]}>{option.icon}</Text>
                  <Text
                    style={[
                      styles.filterText,
                      isActive && { color: option.color || theme.colors.primaryForeground },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.navRow}>
            <Pressable style={styles.navCircle} onPress={() => handleNavigate(-1)}>
              <Text style={styles.navArrow}>‹</Text>
            </Pressable>
            <Pressable style={styles.todayBadge} onPress={goToToday}>
              <Text style={styles.todayText}>Today</Text>
            </Pressable>
            <Pressable style={styles.navCircle} onPress={() => handleNavigate(1)}>
              <Text style={styles.navArrow}>›</Text>
            </Pressable>
          </View>

          <View style={styles.weekRow}>
            {baseWeek.map((day) => {
              const isActive =
                day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth();
              return (
                <Pressable
                  key={day.toISOString()}
                  onPress={() => setSelectedDate(new Date(day))}
                  style={[styles.weekPill, isActive && styles.weekPillActive]}
                >
                  <Text style={[styles.weekDay, isActive && styles.weekDayActive]}>
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </Text>
                  <Text style={[styles.weekDate, isActive && styles.weekDateActive]}>{day.getDate()}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.timelineCard}>
            <View style={styles.timelineHeader}>
              <View>
                <Text style={styles.timelineDay}>{selectedDate.getDate()}</Text>
                <Text style={styles.timelineLabel}>{monthYearLabel}</Text>
              </View>
              <Text style={styles.timelineWeekday}>{dayLabel}</Text>
            </View>
            <View style={styles.timelineBody}>
              {timelineHours.map((hour) => (
                <View key={hour} style={styles.timelineRow}>
                  <Text style={styles.hourLabel}>{formatHourLabel(hour)}</Text>
                  <View style={styles.hourLine} />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.upcomingCard}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <View style={styles.upcomingSection}>
              <Text style={styles.upcomingLabel}>Today</Text>
              {upcoming.today.length === 0 ? (
                <View style={styles.placeholderRow}>
                  <Text style={styles.placeholderText}>No events today</Text>
                </View>
              ) : (
                upcoming.today.map((event) => (
                  <View key={event.id} style={styles.upcomingRow}>
                    <Text style={styles.eventIcon}>{event.icon}</Text>
                    <View>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventMeta}>{event.time} · {event.location || "Home"}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
            <View style={styles.upcomingSection}>
              <Text style={styles.upcomingLabel}>Tomorrow</Text>
              {upcoming.tomorrow.length === 0 ? (
                <View style={styles.placeholderRow}>
                  <Text style={styles.placeholderText}>No events tomorrow</Text>
                </View>
              ) : (
                upcoming.tomorrow.map((event) => (
                  <View key={event.id} style={styles.upcomingRow}>
                    <Text style={styles.eventIcon}>{event.icon}</Text>
                    <View>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventMeta}>{event.time} · {event.location || "Home"}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>

          <View style={styles.familyCard}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            <View style={styles.familyRow}>
              {members.map((member) => (
                <View key={member.id} style={styles.familyItem}>
                  <View
                    style={[
                      styles.familyDot,
                      { backgroundColor: memberColorMap[member.color] || theme.colors.primary },
                    ]}
                  />
                  <Text style={styles.familyText}>{member.name}</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingBottom: 120,
  },
  headerShell: {
    backgroundColor: "#173b78",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 24,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 40,
  },
  headerBackground: {
    backgroundColor: "transparent",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  iconText: {
    fontSize: 18,
    color: theme.colors.primaryForeground,
  },
  titleBlock: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.primaryForeground,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.primaryForeground,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBubble: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  addEventButton: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: theme.colors.primaryForeground,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventText: {
    color: theme.colors.primary,
    fontWeight: "700",
  },
  viewToggle: {
    marginTop: 24,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 24,
    padding: 4,
  },
  viewItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewItemActive: {
    backgroundColor: theme.colors.primaryForeground,
  },
  viewText: {
    color: theme.colors.primaryForeground,
    fontWeight: "600",
  },
  viewTextActive: {
    color: theme.colors.primary,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.card,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: "transparent",
  },
  filterPillActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryForeground,
  },
  filterIcon: {
    marginRight: 6,
    color: theme.colors.mutedForeground,
  },
  filterIconActive: {
    color: theme.colors.primary,
  },
  filterText: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  navCircle: {
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
  navArrow: {
    fontSize: 22,
    color: theme.colors.foreground,
  },
  todayBadge: {
    backgroundColor: theme.colors.primaryForeground,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  todayText: {
    fontWeight: "600",
    color: theme.colors.primary,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  weekPill: {
    width: 44,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  weekPillActive: {
    backgroundColor: theme.colors.primary,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  weekDay: {
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  weekDayActive: {
    color: theme.colors.primaryForeground,
  },
  weekDate: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  weekDateActive: {
    color: theme.colors.primaryForeground,
  },
  timelineCard: {
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: 28,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
    minHeight: 360,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  timelineDay: {
    fontSize: 36,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  timelineLabel: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },
  timelineWeekday: {
    fontWeight: "600",
    color: theme.colors.primary,
  },
  timelineBody: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  hourLabel: {
    width: 60,
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },
  hourLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  upcomingCard: {
    marginTop: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.lg,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  upcomingSection: {
    marginTop: theme.spacing.sm,
  },
  upcomingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.sm,
  },
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  eventIcon: {
    marginRight: theme.spacing.sm,
    fontSize: 20,
  },
  eventTitle: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  eventMeta: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  placeholderRow: {
    borderRadius: 16,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.muted,
  },
  placeholderText: {
    color: theme.colors.foreground,
  },
  familyCard: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.lg,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
    marginBottom: theme.spacing.xl,
  },
  familyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },
  familyItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  familyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  familyText: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
});
