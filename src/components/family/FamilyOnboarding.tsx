import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Switch,
    Platform,
} from "react-native";
import { theme } from "../../theme";
import { useFamily } from "../../contexts/FamilyContext";
import { AppIcon } from "../ui/AppIcon";

const avatarOptions = ["👤", "👩", "👨", "👶", "👧", "👦", "🧒", "👴", "👵", "🧑", "👱", "🧔", "👩‍🦰", "👨‍🦱", "🧑‍🦳", "👩‍🦲"];
const colorOptions = [
    { id: "member-blue", label: "Blue", color: "#DBEAFE" },
    { id: "member-green", label: "Green", color: "#DCFCE7" },
    { id: "member-purple", label: "Purple", color: "#F3E8FF" },
    { id: "member-orange", label: "Orange", color: "#FFEDD5" },
    { id: "member-pink", label: "Pink", color: "#FCE7F3" },
    { id: "member-cyan", label: "Cyan", color: "#CFFAFE" },
];

const roleOptions = [
    { id: "admin", label: "Admin", icon: "crown", description: "Full access to all features", color: theme.colors.warning || "#F59E0B" },
    { id: "parent", label: "Parent", icon: "shield", description: "Can manage family settings", color: theme.colors.primary },
    { id: "child", label: "Child", icon: "eye", description: "View and add items only", color: theme.colors.success },
];

const permissionOptions = [
    { id: "calendar", label: "Calendar", icon: "calendar" as const, description: "View and add events" },
    { id: "grocery", label: "Grocery List", icon: "shoppingCart" as const, description: "Add and check items" },
    { id: "mealplan", label: "Meal Planning", icon: "utensils" as const, description: "Plan and view meals" },
    { id: "vault", label: "Document Vault", icon: "file" as const, description: "Access family documents" },
    { id: "notifications", label: "Notifications", icon: "bell" as const, description: "Receive alerts" },
];

interface FamilyOnboardingProps {
    open: boolean;
    onClose: () => void;
}

interface NewMember {
    name: string;
    avatar: string;
    color: string;
    role: string;
    permissions: Record<string, boolean>;
}

const getDefaultPermissions = (role: string) => {
    switch (role) {
        case "admin":
        case "parent":
            return { calendar: true, grocery: true, mealplan: true, vault: true, notifications: true };
        case "child":
            return { calendar: true, grocery: true, mealplan: false, vault: false, notifications: true };
        default:
            return { calendar: true, grocery: true, mealplan: true, vault: false, notifications: true };
    }
};

export const FamilyOnboarding: React.FC<FamilyOnboardingProps> = ({ open, onClose }) => {
    const { addMember, setFamilyName, familyName } = useFamily();
    const [step, setStep] = useState(1);
    const [newFamilyName, setNewFamilyName] = useState(familyName || "");
    const [newMembers, setNewMembers] = useState<NewMember[]>([]);
    const [currentMember, setCurrentMember] = useState<NewMember>({
        name: "",
        avatar: "👤",
        color: "member-blue",
        role: "parent",
        permissions: getDefaultPermissions("parent"),
    });
    const [editingPermissions, setEditingPermissions] = useState(false);

    const handleAddMember = () => {
        if (!currentMember.name.trim()) return;
        setNewMembers([...newMembers, currentMember]);
        setCurrentMember({
            name: "",
            avatar: "👤",
            color: colorOptions[(newMembers.length + 1) % colorOptions.length].id,
            role: "parent",
            permissions: getDefaultPermissions("parent"),
        });
        setEditingPermissions(false);
    };

    const handleComplete = () => {
        if (newFamilyName.trim()) {
            setFamilyName(newFamilyName);
        }
        newMembers.forEach(m => addMember({
            name: m.name,
            symbol: m.avatar,
            color: m.color,
        }));
        onClose();
        setStep(1);
        setNewMembers([]);
    };

    const getPermissionCount = (perms: Record<string, boolean>) => Object.values(perms).filter(Boolean).length;

    return (
        <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AppIcon name="users" size={24} color={theme.colors.primary} style={{ marginRight: 8 }} />
                        <Text style={styles.title}>Family Setup</Text>
                    </View>
                    <Text style={styles.subtitle}>Step {step} of 3</Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                    {[1, 2, 3].map((s) => (
                        <View
                            key={s}
                            style={[
                                styles.progressSegment,
                                s <= step ? styles.progressActive : styles.progressInactive,
                            ]}
                        />
                    ))}
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {step === 1 && (
                        <View style={styles.stepContainer}>
                            <View style={styles.iconCircle}>
                                <AppIcon name="users" size={40} color={theme.colors.primary} />
                            </View>
                            <Text style={styles.stepTitle}>Name Your Family</Text>
                            <Text style={styles.stepDesc}>This will be displayed at the top of your home screen</Text>

                            <Text style={styles.inputLabel}>Family Name</Text>
                            <TextInput
                                value={newFamilyName}
                                onChangeText={setNewFamilyName}
                                placeholder="e.g., The Smiths"
                                placeholderTextColor={theme.colors.mutedForeground}
                                style={styles.bigInput}
                            />

                            <Pressable
                                style={[styles.primaryButton, !newFamilyName.trim() && styles.disabledButton]}
                                onPress={() => setStep(2)}
                                disabled={!newFamilyName.trim()}
                            >
                                <Text style={styles.primaryButtonText}>Continue</Text>
                                <AppIcon name="arrowRight" size={16} color="#fff" style={{ marginLeft: 8 }} />
                            </Pressable>
                        </View>
                    )}

                    {step === 2 && (
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepTitle}>Add Family Members</Text>
                            <Text style={styles.stepDesc}>Add everyone in your household</Text>

                            {newMembers.map((member, index) => (
                                <View key={index} style={styles.memberItem}>
                                    <View style={[styles.memberAvatarSmall, { backgroundColor: colorOptions.find(c => c.id === member.color)?.color }]}>
                                        <Text style={{ fontSize: 20 }}>{member.avatar}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.memberName}>{member.name}</Text>
                                        <Text style={styles.memberRole}>{member.role} • {getPermissionCount(member.permissions)} permissions</Text>
                                    </View>
                                    <Pressable onPress={() => setNewMembers(newMembers.filter((_, i) => i !== index))}>
                                        <Text style={{ fontSize: 18, color: theme.colors.mutedForeground }}>✕</Text>
                                    </Pressable>
                                </View>
                            ))}

                            <View style={styles.addMemberForm}>
                                <TextInput
                                    value={currentMember.name}
                                    onChangeText={(text) => setCurrentMember({ ...currentMember, name: text })}
                                    placeholder="Member name"
                                    placeholderTextColor={theme.colors.mutedForeground}
                                    style={styles.input}
                                />

                                <Text style={styles.label}>Avatar</Text>
                                <View style={styles.grid}>
                                    {avatarOptions.map(avatar => (
                                        <Pressable
                                            key={avatar}
                                            onPress={() => setCurrentMember({ ...currentMember, avatar })}
                                            style={[styles.avatarOption, currentMember.avatar === avatar && styles.avatarOptionActive]}
                                        >
                                            <Text style={{ fontSize: 20 }}>{avatar}</Text>
                                        </Pressable>
                                    ))}
                                </View>

                                <Text style={styles.label}>Role</Text>
                                {roleOptions.map(role => (
                                    <Pressable
                                        key={role.id}
                                        onPress={() => setCurrentMember({ ...currentMember, role: role.id, permissions: getDefaultPermissions(role.id) })}
                                        style={[styles.roleOption, currentMember.role === role.id && styles.roleOptionActive]}
                                    >
                                        <AppIcon name={role.icon as any} size={20} color={role.color} />
                                        <View style={{ marginLeft: 12 }}>
                                            <Text style={styles.roleLabel}>{role.label}</Text>
                                            <Text style={styles.roleDesc}>{role.description}</Text>
                                        </View>
                                    </Pressable>
                                ))}

                                <Pressable style={styles.outlineButton} onPress={handleAddMember}>
                                    <Text style={styles.outlineButtonText}>Add Member</Text>
                                </Pressable>
                            </View>

                            <View style={styles.row}>
                                <Pressable style={[styles.outlineButton, { flex: 1 }]} onPress={() => setStep(1)}>
                                    <Text style={styles.outlineButtonText}>Back</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.primaryButton, { flex: 1 }, newMembers.length === 0 && styles.disabledButton]}
                                    onPress={() => setStep(3)}
                                    disabled={newMembers.length === 0}
                                >
                                    <Text style={styles.primaryButtonText}>Review</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}

                    {step === 3 && (
                        <View style={styles.stepContainer}>
                            <View style={[styles.iconCircle, { backgroundColor: "#DCFCE7" }]}>
                                <AppIcon name="checkSquare" size={40} color={theme.colors.success} />
                            </View>
                            <Text style={styles.stepTitle}>Review Your Family</Text>
                            <Text style={styles.stepDesc}>Everything looks good? Let's get started!</Text>

                            <View style={styles.reviewCard}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <AppIcon name="users" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.foreground }}>{newFamilyName}</Text>
                                </View>
                                {newMembers.map((member, index) => (
                                    <View key={index} style={styles.memberItem}>
                                        <View style={[styles.memberAvatarSmall, { backgroundColor: colorOptions.find(c => c.id === member.color)?.color }]}>
                                            <Text style={{ fontSize: 16 }}>{member.avatar}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.memberName}>{member.name}</Text>
                                            <Text style={styles.memberRole}>{member.role}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <Pressable style={styles.primaryButton} onPress={handleComplete}>
                                <Text style={styles.primaryButtonText}>Complete Setup</Text>
                            </Pressable>
                        </View>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.foreground,
    },
    subtitle: {
        color: theme.colors.mutedForeground,
    },
    progressBar: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.lg,
        gap: 4,
        marginBottom: 24,
    },
    progressSegment: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    progressActive: {
        backgroundColor: theme.colors.primary,
    },
    progressInactive: {
        backgroundColor: theme.colors.muted,
    },
    content: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 40,
    },
    stepContainer: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.muted,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.foreground,
        marginBottom: 8,
        textAlign: 'center',
    },
    stepDesc: {
        fontSize: 14,
        color: theme.colors.mutedForeground,
        textAlign: 'center',
        marginBottom: 32,
    },
    inputLabel: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: theme.colors.foreground,
    },
    bigInput: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: 16,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: theme.colors.card,
        marginBottom: 32,
    },
    primaryButton: {
        width: '100%',
        height: 50,
        backgroundColor: theme.colors.primary,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.5,
    },
    memberItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: theme.colors.muted,
        borderRadius: 12,
        marginBottom: 8,
    },
    memberAvatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    memberName: {
        fontWeight: '600',
        color: theme.colors.foreground,
    },
    memberRole: {
        fontSize: 12,
        color: theme.colors.mutedForeground,
    },
    addMemberForm: {
        width: '100%',
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 24,
        marginTop: 16,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: theme.colors.background,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.mutedForeground,
        marginBottom: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    avatarOption: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: theme.colors.muted,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarOptionActive: {
        backgroundColor: theme.colors.primary,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    roleOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        backgroundColor: theme.colors.muted,
        marginBottom: 8,
    },
    roleOptionActive: {
        backgroundColor: "#EFF6FF",
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    roleLabel: {
        fontWeight: '600',
        color: theme.colors.foreground,
    },
    roleDesc: {
        fontSize: 12,
        color: theme.colors.mutedForeground,
    },
    outlineButton: {
        width: '100%',
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    outlineButtonText: {
        fontWeight: '600',
        color: theme.colors.foreground,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    reviewCard: {
        width: '100%',
        padding: 16,
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        marginTop: 24,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    }
});
