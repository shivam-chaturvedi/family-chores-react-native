import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { AppSidebar } from "../components/layout/AppSidebar";
import { useFamily } from "../contexts/FamilyContext";
import { useNotifications } from "../hooks/useNotifications";
import { Button } from "../components/ui/Button";
import { theme } from "../theme";
import { GlobalSearch } from "../components/search/GlobalSearch";

const views = ["Day", "Week", "Month"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const holidays: Record<string, { name: string; icon: string }> = {
  "2026-01-01": { name: "New Year", icon: "🎉" },
  "2026-01-26": { name: "Republic Day", icon: "🇮🇳" },
};

export const CalendarScreen: React.FC = () => {
  const { members, events } = useFamily();
  const { requestPermission, permission } = useNotifications();
  const [view, setView] = useState("Month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleNavigate = (dir: number) => {
    const next = new Date(selectedDate);
    if (view === "Month") {
      next.setMonth(next.getMonth() + dir);
    } else {
      next.setDate(next.getDate() + dir * 7);
    }
    setSelectedDate(next);
  };

  const filteredEvents = useMemo(() => {
    const key = selectedDate.toISOString().split("T")[0];
    return events.filter((event) => event.date === key);
  }, [events, selectedDate]);

  const weekDaysData = useMemo(() => {
    const start = new Date(selectedDate);
    start.setDate(selectedDate.getDate() - selectedDate.getDay());
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const key = date.toISOString().split("T")[0];
      const dayEvents = events.filter((event) => event.date === key);
      return { day: date.getDate(), key, events: dayEvents };
    });
  }, [selectedDate, events]);

  const monthDays = useMemo(() => {
    const days = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push({ label: "", isCurrent: false });
    }
    for (let day = 1; day <= totalDays; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({ label: String(day), isCurrent: true, key: dateKey });
    }
    while (days.length % 7 !== 0) {
      days.push({ label: "", isCurrent: false });
    }

    return days;
  }, [selectedDate]);

  const currentMonthLabel = selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <AppLayout showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={() => setShowSidebar(true)} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
            <View>
              <Text style={styles.title}>{currentMonthLabel}</Text>
              <Text style={styles.subtitle}>Tap a day to view events</Text>
            </View>
            <View style={styles.actions}>
              <Pressable onPress={() => handleNavigate(-1)} style={styles.navButton}>
                <Text style={styles.navText}>‹</Text>
              </Pressable>
              <Pressable onPress={() => handleNavigate(1)} style={styles.navButton}>
                <Text style={styles.navText}>›</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.viewToggle}>
            {views.map((option) => (
              <Pressable
                key={option}
                onPress={() => setView(option)}
                style={[styles.viewButton, view === option && styles.viewButtonActive]}
              >
                <Text style={[styles.viewText, view === option && styles.viewTextActive]}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>

          {view === "Month" && (
            <View style={styles.grid}>
              <View style={styles.gridHeader}>
                {weekDays.map((day) => (
                  <Text key={day} style={styles.gridHeaderText}>
                    {day}
                  </Text>
                ))}
              </View>
              <View style={styles.gridBody}>
                {monthDays.map((cell, index) => (
                  <View key={index} style={styles.cell}>
                    <Text style={[styles.cellText, !cell.isCurrent && styles.cellDisabled]}>
                      {cell.label}
                    </Text>
                    {cell.key && holidays[cell.key] && (
                      <Text style={styles.holidayText}>{holidays[cell.key].icon}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {view === "Week" && (
            <View style={styles.week}>
              {weekDaysData.map((day) => (
                <View key={day.key} style={styles.weekDay}>
                  <Text style={styles.weekDayLabel}>{day.day}</Text>
                  {day.events.length > 0 && <View style={styles.dot} />}
                </View>
              ))}
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Events</Text>
            {filteredEvents.map((event) => (
              <View key={event.id} style={styles.eventRow}>
                <Text style={styles.eventIcon}>{event.icon}</Text>
                <View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventMeta}>{event.time} · {event.location || "Home"}</Text>
                </View>
              </View>
            ))}
            {filteredEvents.length === 0 && (
              <Text style={styles.empty}>No events scheduled.</Text>
            )}
            <Button variant="outline" size="sm" onPress={() => requestPermission()}>
              {permission === "granted" ? "Notifications enabled" : "Enable reminders"}
            </Button>
          </View>
        </ScrollView>
      </AppLayout>
      <AppSidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
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
    justifyContent: "space-between",
    alignItems: "center",
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
    alignItems: "center",
  },
  navButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
  },
  navText: {
    fontSize: 18,
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    padding: 4,
    marginBottom: theme.spacing.md,
  },
  viewButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: 12,
    alignItems: "center",
  },
  viewButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  viewText: {
    fontSize: 12,
    color: theme.colors.foreground,
    fontWeight: "600",
  },
  viewTextActive: {
    color: theme.colors.primaryForeground,
  },
  grid: {
    marginBottom: theme.spacing.md,
  },
  gridHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridHeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.mutedForeground,
  },
  gridBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing.sm,
  },
  cell: {
    width: "14.28%",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  cellText: {
    color: theme.colors.foreground,
    fontWeight: "600",
  },
  cellDisabled: {
    color: theme.colors.mutedForeground,
  },
  holidayText: {
    fontSize: 18,
    marginTop: 4,
  },
  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  weekDay: {
    alignItems: "center",
  },
  weekDayLabel: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginTop: 2,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  eventRow: {
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
  empty: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
    marginBottom: theme.spacing.sm,
  },
});
