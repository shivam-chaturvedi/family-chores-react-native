import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../../theme";

interface GettingStartedTutorialProps {
  open: boolean;
  onClose: () => void;
}

const slides = [
  {
    title: "Centralized Calendar",
    detail: "See every family event, school day, and work meeting in one view.",
  },
  {
    title: "Shared Tasks",
    detail: "Assign chores and reward completion while tracking progress.",
  },
  {
    title: "Smart Meals",
    detail: "Plan nutrition, recipes, and grocery lists with one tap.",
  },
];

export const GettingStartedTutorial: React.FC<GettingStartedTutorialProps> = ({
  open,
  onClose,
}) => {
  const [current, setCurrent] = React.useState(0);

  if (!open) return null;

  const slide = slides[current];

  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.detail}>{slide.detail}</Text>
          <View style={styles.footer}>
            <Pressable onPress={() => setCurrent((prev) => Math.max(prev - 1, 0))} disabled={current === 0}>
              <Text style={[styles.link, current === 0 && styles.disabledLink]}>Back</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (current === slides.length - 1) {
                  onClose();
                } else {
                  setCurrent((prev) => prev + 1);
                }
              }}
            >
              <Text style={styles.link}>
                {current === slides.length - 1 ? "Finish" : "Next"}
              </Text>
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
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  detail: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
    marginBottom: theme.spacing.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  disabledLink: {
    color: theme.colors.mutedForeground,
  },
});
