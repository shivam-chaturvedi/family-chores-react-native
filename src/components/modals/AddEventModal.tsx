import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { theme } from "../../theme";
import { useSidebar } from "../../contexts/SidebarContext";

const iconOptions = [
  "📅",
  "🎂",
  "🏠",
  "💼",
  "🏥",
  "🛒",
  "🎉",
  "🏆",
  "🎬",
  "✈️",
  "🍽️",
  "👨‍👩‍👧",
  "💻",
  "☎️",
  "🎵",
  "🏡",
];

const colorOptions = ["#1f4c85", "#1c9b5f", "#f5a623", "#f04fa3", "#8f5bff", "#e01e2b"];

const assignees = [
  { id: "me", label: "Me", icon: "🧑" },
  { id: "partner", label: "Partner", icon: "💑" },
  { id: "kids", label: "Kids", icon: "👶" },
];

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({ open, onClose }) => {
  const { closeSidebar } = useSidebar();
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState("07/01/2026");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [location, setLocation] = useState("");
  const [assigned, setAssigned] = useState(assignees[0].id);

  const iconRows = useMemo(() => {
    const rows: string[][] = [];
    for (let i = 0; i < iconOptions.length; i += 5) {
      rows.push(iconOptions.slice(i, i + 5));
    }
    return rows;
  }, []);

  const handleAddEvent = () => {
    closeSidebar();
    onClose();
  };

  const handleClose = () => {
    closeSidebar();
    onClose();
  };

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Text style={styles.iconLarge}>{selectedIcon}</Text>
            </View>
            <Text style={styles.title}>New Event</Text>
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.body}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              value={eventName}
              onChangeText={setEventName}
              placeholder="Event name"
              placeholderTextColor="#7a859a"
              style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add description..."
              placeholderTextColor="#7a859a"
              style={[styles.input, styles.multiline]}
              multiline
            />

            <Text style={styles.label}>Icon</Text>
            {iconRows.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.iconRow}>
                {row.map((icon) => (
                  <Pressable
                    key={icon}
                    style={[
                      styles.iconOption,
                      selectedIcon === icon && styles.iconOptionActive,
                    ]}
                    onPress={() => setSelectedIcon(icon)}
                  >
                    <Text
                      style={[
                        styles.iconText,
                        selectedIcon === icon && styles.iconTextActive,
                      ]}
                    >
                      {icon}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}

            <View style={styles.section}>
              <View>
                <Text style={styles.label}>All-day event</Text>
                <Text style={styles.subLabel}>Skip time selection</Text>
              </View>
              <Pressable
                style={[styles.toggle, allDay && styles.toggleActive]}
                onPress={() => setAllDay((prev) => !prev)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    allDay && styles.toggleThumbActive,
                  ]}
                />
              </Pressable>
            </View>

            <Text style={styles.sectionLabel}>Schedule</Text>
            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Start Date</Text>
                <TextInput
                  value={startDate}
                  onChangeText={setStartDate}
                  style={styles.input}
                />
              </View>
              {!allDay && (
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Start Time</Text>
                  <TextInput
                    value={startTime}
                    onChangeText={setStartTime}
                    style={styles.input}
                  />
                </View>
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>End Date (Optional)</Text>
                <TextInput
                  value={endDate}
                  onChangeText={setEndDate}
                  style={styles.input}
                />
              </View>
              {!allDay && (
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>End Time</Text>
                  <TextInput
                    value={endTime}
                    onChangeText={setEndTime}
                    style={styles.input}
                  />
                </View>
              )}
            </View>

            <View style={styles.section}>
              <View>
                <Text style={styles.label}>Repeat</Text>
                <Text style={styles.subLabel}>Never repeats</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>

            <View style={styles.section}>
              <View>
                <Text style={styles.label}>Reminder</Text>
                <Text style={styles.subLabel}>15 minutes before</Text>
              </View>
              <Pressable
                style={[styles.toggle, reminderEnabled && styles.toggleActive]}
                onPress={() => setReminderEnabled((prev) => !prev)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    reminderEnabled && styles.toggleThumbActive,
                  ]}
                />
              </Pressable>
            </View>

            <Text style={styles.label}>Color</Text>
            <View style={styles.iconRow}>
              {colorOptions.map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorOptionActive,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <Text style={styles.label}>Location</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Add location..."
              placeholderTextColor="#7a859a"
              style={styles.input}
            />

            <Text style={styles.label}>Assign to</Text>
            <View style={styles.iconRow}>
              {assignees.map((person) => (
                <Pressable
                  key={person.id}
                  style={[
                    styles.assignee,
                    assigned === person.id && styles.assigneeActive,
                  ]}
                  onPress={() => setAssigned(person.id)}
                >
                  <Text style={styles.assigneeIcon}>{person.icon}</Text>
                  <Text
                    style={[
                      styles.assigneeLabel,
                      assigned === person.id && styles.assigneeLabelActive,
                    ]}
                  >
                    {person.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Pressable style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={handleAddEvent}>
              <Text style={styles.addText}>Add Event</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 28,
    backgroundColor: "#fff",
    paddingBottom: theme.spacing.sm,
    overflow: "hidden",
    maxHeight: "95%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: "#e5e9f0",
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#f0f4ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  iconLarge: {
    fontSize: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.foreground,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f2f5fb",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 20,
    color: "#6f7c94",
  },
  body: {
    padding: theme.spacing.md,
    paddingBottom: 0,
  },
  input: {
    backgroundColor: "#f5f7fb",
    borderRadius: 16,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.foreground,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  subLabel: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  iconOption: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#eef2fb",
    alignItems: "center",
    justifyContent: "center",
  },
  iconOptionActive: {
    backgroundColor: "#1f4c85",
  },
  iconText: {
    fontSize: 24,
  },
  iconTextActive: {
    color: "#fff",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f7fb",
    borderRadius: 16,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  sectionLabel: {
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  toggle: {
    width: 48,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#dfe4f5",
    padding: 4,
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  field: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.xs,
  },
  chevron: {
    fontSize: 20,
    color: theme.colors.mutedForeground,
  },
  colorOption: {
    width: 42,
    height: 42,
    borderRadius: 999,
    marginBottom: theme.spacing.sm,
  },
  colorOptionActive: {
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  assignee: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e9f0",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: "#f5f7fb",
    marginRight: theme.spacing.sm,
  },
  assigneeActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  assigneeIcon: {
    marginRight: theme.spacing.xs,
  },
  assigneeLabel: {
    color: theme.colors.foreground,
    fontWeight: "600",
  },
  assigneeLabelActive: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#edf2fb",
    borderRadius: 16,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  cancelText: {
    color: theme.colors.foreground,
    fontWeight: "600",
  },
  addButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },
});
