import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { useFamily } from "../contexts/FamilyContext";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

const roles = [
  { label: "Admin", description: "Full access to all features", icon: "👑" },
  { label: "Parent", description: "Can manage family settings", icon: "🛡️" },
  { label: "Child", description: "Limited access", icon: "👶" },
];

export const FamilyScreen: React.FC = () => {
  const { familyName, members } = useFamily();
  const { openSidebar } = useSidebar();

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
            <View>
              <Text style={styles.title}>Family Members</Text>
              <Text style={styles.subtitle}>{familyName}</Text>
            </View>
            <Pressable style={styles.inviteButton}>
              <Text style={styles.inviteIcon}>👤＋</Text>
            </Pressable>
          </View>

          <View style={styles.familyCard}>
            <View style={styles.familyAvatar}>
              <Text style={styles.familyAvatarIcon}>👪</Text>
            </View>
            <View style={styles.familyInfo}>
              <Text style={styles.familyTitle}>{familyName}</Text>
              <Text style={styles.familySubtitle}>{members.length} members</Text>
            </View>
            <Pressable style={styles.editButton}>
              <Text style={styles.editIcon}>✎</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Members</Text>
          {members.map((member) => (
            <View key={member.id} style={styles.memberRow}>
              <View style={[styles.memberAvatar, { backgroundColor: theme.colors.card }]}>
                <Text style={styles.memberEmoji}>{member.symbol}</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <View style={styles.statusRow}>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>Member</Text>
                  </View>
                  {member.isActive && <View style={styles.onlineDot}><Text style={styles.onlineText}>•</Text></View>}
                  <Text style={styles.onlineText}>Online</Text>
                </View>
              </View>
              <Pressable style={styles.editButton}>
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Available Roles</Text>
          <View style={styles.rolesCard}>
            {roles.map((role) => (
              <View key={role.label} style={styles.roleRow}>
                <View style={styles.roleIcon}>
                  <Text>{role.icon}</Text>
                </View>
                <View style={styles.roleTextGroup}>
                  <Text style={styles.roleLabel}>{role.label}</Text>
                  <Text style={styles.roleDesc}>{role.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable style={styles.addButtonLarge}>
            <Text style={styles.addButtonText}>Add Family Member</Text>
          </Pressable>
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
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  menuIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  subtitle: {
    color: theme.colors.mutedForeground,
  },
  inviteButton: {
    marginLeft: "auto",
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  inviteIcon: {
    color: theme.colors.primaryForeground,
    fontSize: 24,
  },
  familyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0c2b5f",
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  familyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  familyAvatarIcon: {
    fontSize: 32,
    color: theme.colors.primaryForeground,
  },
  familyInfo: {
    flex: 1,
  },
  familyTitle: {
    color: theme.colors.primaryForeground,
    fontSize: 20,
    fontWeight: "700",
  },
  familySubtitle: {
    color: "rgba(255,255,255,0.7)",
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    fontSize: 16,
    color: theme.colors.foreground,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  memberAvatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  memberEmoji: {
    fontSize: 24,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  roleBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: "#e4edff",
    borderRadius: 12,
  },
  roleText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2ece4a",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineText: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  rolesCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: theme.spacing.md,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#e4edff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  roleTextGroup: {
    flex: 1,
  },
  roleLabel: {
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  roleDesc: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  addButtonLarge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  addButtonText: {
    color: theme.colors.primaryForeground,
    fontWeight: "700",
    fontSize: 18,
  },
});
