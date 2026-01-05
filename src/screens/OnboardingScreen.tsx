import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { theme } from "../theme";

const { width } = Dimensions.get("window");

const onboardingSlides = [
  {
    emoji: "📅",
    title: "Shared Family Calendar",
    description:
      "Keep everyone in sync with color-coded events, symbols, and reminders that the whole family can see.",
  },
  {
    emoji: "✅",
    title: "Tasks, Chores & Shopping",
    description:
      "Assign tasks, track chores with rewards, and create shared shopping lists that update in real-time.",
  },
  {
    emoji: "🍽️",
    title: "Meals, Health & Nutrition",
    description:
      "Plan meals, scan food for nutrition info, and track your family's health with smart suggestions.",
  },
  {
    emoji: "📁",
    title: "Everything in One Place",
    description:
      "Store documents, track expenses, warranties, and bills. Your family's digital vault.",
  },
];

interface OnboardingScreenProps {
  onSkip: () => void;
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onSkip,
  onComplete,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const slide = onboardingSlides[currentSlide];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.skipRow}>
        <Pressable onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationCard}>
          <Text style={styles.emoji}>{slide.emoji}</Text>
          <View style={styles.iconBadge}>
            <Text style={styles.iconBadgeText}>{slide.emoji}</Text>
          </View>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        <View style={styles.dotRow}>
          {onboardingSlides.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => setCurrentSlide(index)}
              style={[
                styles.dot,
                index === currentSlide ? styles.dotActive : styles.dotInactive,
                index !== onboardingSlides.length - 1 && styles.dotMargin,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentSlide === onboardingSlides.length - 1
              ? "Get Started →"
              : "Next →"}
          </Text>
        </Pressable>
        <Text style={styles.progressText}>
          {currentSlide + 1} of {onboardingSlides.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.lg,
  },
  skipRow: {
    alignItems: "flex-end",
    paddingHorizontal: theme.spacing.lg,
  },
  skipText: {
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  illustrationCard: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing.xl,
  },
  emoji: {
    fontSize: 72,
    marginBottom: theme.spacing.sm,
  },
  iconBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  iconBadgeText: {
    fontSize: 32,
  },
  textBlock: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.foreground,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: 16,
    color: theme.colors.mutedForeground,
    textAlign: "center",
    lineHeight: 22,
  },
  dotRow: {
    flexDirection: "row",
    marginTop: theme.spacing.lg,
  },
  dotMargin: {
    marginRight: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 40,
    backgroundColor: theme.colors.primary,
  },
  dotInactive: {
    width: 8,
    backgroundColor: theme.colors.border,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.primaryForeground,
  },
  progressText: {
    textAlign: "center",
    marginTop: theme.spacing.sm,
    color: theme.colors.mutedForeground,
  },
});
