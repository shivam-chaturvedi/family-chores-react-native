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
import {
  Users,
  UserPlus,
  Crown,
  Shield,
  Edit,
  Menu,
  ChevronLeft
} from "lucide-react-native";

const roles = [
  { label: "Admin", description: "Full access to all features", icon: Crown, color: "#f59e0b" },
  { label: "Parent", description: "Can manage family settings", icon: Shield, color: "#3b82f6" },
  { label: "Child", description: "Limited access", icon: Users, color: "#22c55e" },
];

export const FamilyScreen: React.FC = () => {
  const { familyName, members } = useFamily();
  const { openSidebar } = useSidebar();

  return (
    <AppLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={openSidebar} style={styles.iconButton}>
            <Menu size={24} color={theme.colors.foreground} />
          </Pressable>
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <Text style={styles.title}>Family Members</Text>
            <Text style={styles.subtitle}>{familyName}</Text>
          </View>
          <Pressable style={[styles.iconButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.border }]}>
            <UserPlus size={20} color={theme.colors.foreground} />
          </Pressable>
        </View>

        {/* Family Card */}
        <View style={styles.familyCard}>
          <View style={styles.iconContainer}>
            <Users size={32} color={theme.colors.primaryForeground} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{familyName}</Text>
            <Text style={styles.cardSubtitle}>{members.length} members</Text>
          </View>
          <Pressable style={styles.cardEditButton}>
            <Edit size={20} color={theme.colors.primaryForeground} />
          </Pressable>
        </View>

        {/* Members List */}
        <Text style={styles.sectionHeader}>Members</Text>
        <View style={{ gap: 8 }}>
          {members.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={[styles.avatar, { backgroundColor: member.color || theme.colors.muted }]}>
                <Text style={{ fontSize: 24 }}>{member.symbol}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.memberName}>{member.name}</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>Member</Text>
                  </View>
                  {member.isActive && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <View style={styles.onlineDot} />
                      <Text style={styles.onlineText}>Online</Text>
                    </View>
                  )}
                </View>
              </View>
              <Pressable style={styles.editIconButton}>
                <Edit size={16} color={theme.colors.mutedForeground} />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Roles Info */}
        <View style={styles.rolesSection}>
          <Text style={styles.sectionHeader}>Available Roles</Text>
          <View style={styles.rolesCard}>
            {roles.map((role) => (
              <View key={role.label} style={styles.roleRow}>
                <View style={[styles.roleIconBg, { backgroundColor: theme.colors.muted }]}>
                  <role.icon size={20} color={role.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.roleName}>{role.label}</Text>
                  <Text style={styles.roleDesc}>{role.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Add Button */}
        <Pressable style={styles.addButton}>
          <UserPlus size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Family Member</Text>
        </Pressable>

      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  familyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primaryForeground,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  cardEditButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.foreground,
    marginBottom: 12,
    marginTop: 8,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent', // Optional border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  roleBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roleText: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  onlineText: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '500',
  },
  editIconButton: {
    padding: 8,
  },
  rolesSection: {
    marginTop: 24,
  },
  rolesCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roleName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  roleDesc: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e3a8a', // Dark blue from image
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
