import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

const notificationTypes = [
  { label: "Calendar Events", description: "Get notified about upcoming events", icon: "📅" },
  { label: "Task Reminders", description: "Due dates and assignments", icon: "✅" },
  { label: "Shopping List Updates", description: "When items are added or checked", icon: "🛒" },
  { label: "Document Alerts", description: "Warranty and expiry reminders", icon: "🔔" },
  { label: "Meal Prep Reminders", description: "Time to start cooking", icon: "🍳" },
];

const deliveryMethods = [
  { label: "Push Notifications", icon: "📱" },
  { label: "Email Notifications", icon: "✉️" },
  { label: "Sound", icon: "🔊" },
];

export const NotificationsScreen: React.FC = () => {
  const { openSidebar } = useSidebar();
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [calendarToggle, setCalendarToggle] = useState(true);
  const [mealToggle, setMealToggle] = useState(true);
  const [notificationState, setNotificationState] = useState<Record<string, boolean>>(() =>
    notificationTypes.reduce((acc, curr) => ({ ...acc, [curr.label]: true }), {})
  );
  const [quietHours, setQuietHours] = useState(true);
  const [deliveryState, setDeliveryState] = useState<Record<string, boolean>>(() =>
    deliveryMethods.reduce((acc, curr) => ({ ...acc, [curr.label]: true }), {})
  );
  const calendarReminder = "30 min before";
  const mealReminder = "1 hour before";

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
          <Pressable onPress={openSidebar} style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <View>
              <Text style={styles.title}>Notifications</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardLead}>
              <View style={styles.iconBubble}>
                <Text style={styles.iconText}>🔔</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Enable Notifications</Text>
                <Text style={styles.cardSubtitle}>Get reminders for events and meals</Text>
              </View>
            </View>
            <Pressable
              style={[styles.enableButton, enableNotifications ? styles.enableActive : null]}
              onPress={() => setEnableNotifications((prev) => !prev)}
            >
              <Text style={styles.enableText}>{enableNotifications ? "Enabled" : "Enable"}</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <View style={styles.cardLead}>
              <View style={styles.iconBubble}>
                <Text style={styles.iconText}>📆</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Calendar Event Reminders</Text>
                <Text style={styles.cardSubtitle}>Get notified before events</Text>
              </View>
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Remind me</Text>
              <Pressable style={[styles.toggleButton, calendarToggle && styles.toggleActive]} onPress={() => setCalendarToggle((prev) => !prev)}>
                <View style={[styles.toggleCircle, calendarToggle && styles.toggleCircleActive]} />
              </Pressable>
            </View>
            <Pressable style={styles.selectBox}>
              <Text style={styles.selectLabel}>{calendarReminder}</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <View style={styles.cardLead}>
              <View style={styles.iconBubble}>
                <Text style={styles.iconText}>🍳</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Meal Prep Reminders</Text>
                <Text style={styles.cardSubtitle}>Start cooking on time</Text>
              </View>
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Start prep</Text>
              <Pressable style={[styles.toggleButton, mealToggle && styles.toggleActive]} onPress={() => setMealToggle((prev) => !prev)}>
                <View style={[styles.toggleCircle, mealToggle && styles.toggleCircleActive]} />
              </Pressable>
            </View>
            <Pressable style={styles.selectBox}>
              <Text style={styles.selectLabel}>{mealReminder}</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Notification Types</Text>
            {notificationTypes.map((item) => (
              <View key={item.label} style={styles.notificationRow}>
                <View style={styles.iconBubble}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <View style={styles.notificationText}>
                  <Text style={styles.cardTitle}>{item.label}</Text>
                  <Text style={styles.cardSubtitle}>{item.description}</Text>
                </View>
                <Pressable
                  style={[styles.toggleButton, notificationState[item.label] && styles.toggleActive]}
                  onPress={() => setNotificationState((prev) => ({ ...prev, [item.label]: !prev[item.label] }))}
                >
                  <View style={[styles.toggleCircle, notificationState[item.label] && styles.toggleCircleActive]} />
                </Pressable>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <View style={styles.notificationRow}>
              <View style={styles.iconBubbleDark}>
                <Text style={styles.iconText}>🔕</Text>
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.cardTitle}>Quiet Hours</Text>
                <Text style={styles.cardSubtitle}>Pause notifications during set times</Text>
              </View>
              <Pressable style={[styles.toggleButton, quietHours && styles.toggleActive]} onPress={() => setQuietHours((prev) => !prev)}>
                <View style={[styles.toggleCircle, quietHours && styles.toggleCircleActive]} />
              </Pressable>
            </View>
            <View style={styles.timeRow}>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>10:00 PM</Text>
              </View>
              <Text style={styles.toLabel}>to</Text>
              <View style={styles.timeBox}>
                <Text style={styles.timeLabel}>07:00 AM</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Delivery Methods</Text>
            {deliveryMethods.map((item) => (
              <View key={item.label} style={styles.notificationRow}>
                <View style={styles.iconBubble}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <View style={styles.notificationText}>
                  <Text style={styles.cardTitle}>{item.label}</Text>
                </View>
                <Pressable
                  style={[styles.toggleButton, deliveryState[item.label] && styles.toggleActive]}
                  onPress={() => setDeliveryState((prev) => ({ ...prev, [item.label]: !prev[item.label] }))}
                >
                  <View style={[styles.toggleCircle, deliveryState[item.label] && styles.toggleCircleActive]} />
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </AppLayout>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  backIcon: {
    fontSize: 26,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardLead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBubble: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  iconBubbleDark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#1b315d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  iconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  cardSubtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  enableButton: {
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    alignSelf: "flex-end",
    marginTop: theme.spacing.sm,
  },
  enableActive: {
    backgroundColor: theme.colors.primary,
  },
  enableText: {
    color: theme.colors.primaryForeground,
    fontWeight: "700",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  toggleButton: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.muted,
    justifyContent: "center",
    padding: 4,
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginLeft: 0,
  },
  toggleCircleActive: {
    marginLeft: 24,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.muted,
  },
  selectLabel: {
    color: theme.colors.foreground,
  },
  label: {
    fontWeight: "600",
    color: theme.colors.mutedForeground,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: theme.spacing.sm,
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  notificationText: {
    flex: 1,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    padding: theme.spacing.sm,
  },
  timeBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: theme.spacing.sm,
  },
  timeLabel: {
    fontWeight: "600",
  },
  toLabel: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.mutedForeground,
  },
});
