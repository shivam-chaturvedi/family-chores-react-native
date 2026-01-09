import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { theme } from "../../theme";
import { AppIcon } from "../ui/AppIcon";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
}

const profiles = [
  { name: "Me", icon: "👤", badge: true },
  { name: "Partner", icon: "💑", badge: false },
  { name: "Kids", icon: "👶", badge: false },
];

const quickLinks = [
  { label: "Documents", route: "Documents", icon: "📁" },
  { label: "Expenses", route: "Expenses", icon: "💸" },
];

const bottomLinks = [
  { label: "Privacy Policy", route: "Privacy", icon: "🛡️" },
  { label: "Help & Support", route: "Help", icon: "❓" },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  open,
  onClose,
  onNavigate,
}) => {
  const { width } = useWindowDimensions();
  const sidebarWidth = Math.min(width * 0.85, 360);
  const [mounted, setMounted] = useState(open);
  const translateX = useRef(new Animated.Value(open ? 0 : -sidebarWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(open ? 1 : 0)).current;

  const navigation = useNavigation<NavigationProp<Record<string, undefined>>>();

  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      navigation.navigate(route as never);
    }
    onClose();
  };

  useEffect(() => {
    if (open) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -sidebarWidth,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(() => setMounted(false));
    }
  }, [open, mounted, overlayOpacity, sidebarWidth, translateX]);

  if (!mounted) {
    return null;
  }

  return (
    <Modal visible={mounted} animationType="none" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[styles.overlayTouchable, { opacity: overlayOpacity }]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.sidebar,
            { width: sidebarWidth, transform: [{ translateX }] },
          ]}
        >
          <View style={styles.headerGradient}>
            <Pressable onPress={onClose} style={styles.closeIcon}>
              <AppIcon name="x" size={22} color="#f5f8ff" />
            </Pressable>
            <View style={styles.profileSummary}>
              <View style={styles.avatar}>
                <Text style={styles.avatarIcon}>👤</Text>
              </View>
              <View style={styles.profileTextBlock}>
                <Text style={styles.profileName}>Family Chores</Text>
                <Text style={styles.profileRole}>Me</Text>
              </View>
            </View>
            <Pressable
              style={[styles.settingsButton, styles.settingsContent]}
              onPress={() => handleNavigate("Theme")}
            >
              <AppIcon source="⚙️" size={16} color="#cbd6ea" style={styles.settingsIcon} />
              <Text style={styles.settingsText}>Settings</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
            <Text style={styles.sectionLabel}>Switch Profile</Text>
            {profiles.map((profile) => (
              <Pressable
                key={profile.name}
                style={[
                  styles.profileRow,
                  profile.badge && styles.profileRowActive,
                ]}
              >
              <View style={styles.profileAvatar}>
                <AppIcon source={profile.icon} size={28} />
              </View>
                <Text
                  style={[
                    styles.profileText,
                    profile.badge && styles.profileTextActive,
                  ]}
                >
                  {profile.name}
                </Text>
                {profile.badge && <Text style={styles.checkmark}>✓</Text>}
              </Pressable>
            ))}

            <View style={styles.sectionDivider} />

            <Text style={styles.sectionLabel}>Quick Access</Text>
            {quickLinks.map((item) => (
              <Pressable
                key={item.route}
                style={styles.linkRow}
                onPress={() => handleNavigate(item.route)}
              >
                <AppIcon source={item.icon} size={20} style={styles.linkIcon} />
                <Text style={styles.linkText}>{item.label}</Text>
                <Text style={styles.linkChevron}>›</Text>
              </Pressable>
            ))}

            <View style={styles.sectionDivider} />

            <Text style={styles.sectionLabel}>Help & Safety</Text>
            {bottomLinks.map((item) => (
              <Pressable
                key={item.route}
                style={styles.linkRow}
                onPress={() => handleNavigate(item.route)}
              >
                <AppIcon source={item.icon} size={20} style={styles.linkIcon} />
                <Text style={styles.linkText}>{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  overlayTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  sidebar: {
    backgroundColor: theme.colors.card,
    borderBottomRightRadius: 28,
    borderTopRightRadius: 28,
    minHeight: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  headerGradient: {
    backgroundColor: "#0f3a6d",
    padding: theme.spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  closeIcon: {
    position: "absolute",
    right: theme.spacing.lg,
    top: theme.spacing.lg,
    padding: theme.spacing.sm,
  },
  closeText: {
    color: "#f5f8ff",
    fontSize: 22,
  },
  profileSummary: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileTextBlock: {
    marginLeft: theme.spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#1c4d87",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarIcon: {
    fontSize: 28,
    color: "#f5f8ff",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f5f8ff",
    marginLeft: theme.spacing.md,
  },
  profileRole: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
    marginLeft: theme.spacing.md,
  },
  settingsButton: {
    marginTop: theme.spacing.md,
    alignSelf: "flex-start",
    backgroundColor: "#0b2b57",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: 999,
  },
  settingsContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    marginRight: theme.spacing.sm,
  },
  settingsText: {
    color: "#cbd6ea",
    fontWeight: "600",
  },
  scrollArea: {
    flex: 1,
    maxHeight: "100%",
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    flexGrow: 1,
  },
  sectionLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.sm,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edf3ff",
    borderRadius: 16,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    justifyContent: "flex-start",
  },
  profileRowActive: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: "#e9f0ff",
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#e1ecff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  profileText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  profileTextActive: {
    fontWeight: "700",
    color: theme.colors.primary,
  },
  checkmark: {
    color: theme.colors.primary,
    fontSize: 18,
    marginLeft: "auto",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    justifyContent: "space-between",
  },
  linkIcon: {
    marginRight: theme.spacing.md,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.foreground,
  },
  linkChevron: {
    color: theme.colors.mutedForeground,
    fontSize: 18,
  },
});
