import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Switch,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";
import {
    ChevronLeft,
    Shield,
    Lock,
    Eye,
    Fingerprint,
    Key,
    Trash2,
    ChevronRight
} from "lucide-react-native";

const securitySettings = [
    { id: 'bio', icon: Fingerprint, label: 'Biometric Lock', description: 'Use fingerprint or face to unlock', default: true },
    { id: 'app', icon: Lock, label: 'App Lock', description: 'Require PIN when opening app', default: false },
    { id: 'hide', icon: Eye, label: 'Hide Sensitive Data', description: 'Blur amounts and personal info', default: false },
];

export const PrivacyScreen: React.FC = () => {
    const { openSidebar } = useSidebar();
    const [settings, setSettings] = useState<Record<string, boolean>>({
        bio: true,
        app: false,
        hide: false,
    });

    const toggleSetting = (id: string) => {
        setSettings(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <AppLayout>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <Pressable onPress={openSidebar} style={styles.backButton}>
                        <ChevronLeft size={24} color={theme.colors.foreground} />
                    </Pressable>
                    <Text style={styles.title}>Privacy & Security</Text>
                </View>

                {/* Security Status Card */}
                <View style={styles.heroCard}>
                    <View style={styles.heroIcon}>
                        <Shield size={32} color={theme.colors.primaryForeground} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.heroTitle}>Security Status</Text>
                        <Text style={styles.heroSubtitle}>Your data is protected</Text>
                    </View>
                    <Lock size={24} color={theme.colors.primaryForeground} style={{ opacity: 0.8 }} />
                </View>

                {/* Security Settings */}
                <Text style={styles.sectionTitle}>Security</Text>
                <View style={styles.card}>
                    {securitySettings.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.settingRow}>
                                <View style={styles.iconBg}>
                                    <item.icon size={20} color={theme.colors.mutedForeground} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.settingLabel}>{item.label}</Text>
                                    <Text style={styles.settingDesc}>{item.description}</Text>
                                </View>
                                <Switch
                                    value={settings[item.id]}
                                    onValueChange={() => toggleSetting(item.id)}
                                    trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                                    thumbColor="#fff"
                                />
                            </View>
                            {index < securitySettings.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>

                {/* Access */}
                <Text style={styles.sectionTitle}>Access</Text>
                <View style={styles.card}>
                    <Pressable style={styles.settingRow}>
                        <View style={styles.iconBg}>
                            <Key size={20} color={theme.colors.mutedForeground} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.settingLabel}>Change Password</Text>
                            <Text style={styles.settingDesc}>Last changed 30 days ago</Text>
                        </View>
                        <ChevronRight size={20} color={theme.colors.mutedForeground} />
                    </Pressable>
                    <View style={styles.divider} />
                    <Pressable style={styles.settingRow}>
                        <View style={styles.iconBg}>
                            <Lock size={20} color={theme.colors.mutedForeground} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.settingLabel}>Set PIN Code</Text>
                            <Text style={styles.settingDesc}>4-digit PIN for quick access</Text>
                        </View>
                        <ChevronRight size={20} color={theme.colors.mutedForeground} />
                    </Pressable>
                </View>

                {/* Data Privacy */}
                <Text style={styles.sectionTitle}>Data Privacy</Text>
                <View style={[styles.card, { backgroundColor: '#f8fafc' }]}>
                    <Text style={styles.privacyText}>
                        Your data is encrypted and stored securely. We never share your personal information with third parties.
                    </Text>
                    <View style={styles.tagsRow}>
                        <View style={[styles.tag, { backgroundColor: '#dcfce7' }]}>
                            <Text style={{ fontSize: 11, color: '#16a34a', fontWeight: '600' }}>🔐 End-to-end encrypted</Text>
                        </View>
                        <View style={[styles.tag, { backgroundColor: '#dbeafe' }]}>
                            <Text style={{ fontSize: 11, color: '#2563eb', fontWeight: '600' }}>☁️ Secure cloud backup</Text>
                        </View>
                    </View>
                </View>

                {/* Danger Zone */}
                <View style={styles.dangerCard}>
                    <Text style={styles.dangerTitle}>Danger Zone</Text>
                    <Pressable style={styles.deleteButton}>
                        <Trash2 size={16} color="#ef4444" />
                        <Text style={styles.deleteText}>Delete Account</Text>
                    </Pressable>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 8,
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: theme.colors.foreground,
    },
    heroCard: {
        flexDirection: "row",
        alignItems: "center",
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
    heroIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    heroTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: theme.colors.primaryForeground,
    },
    heroSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.foreground,
        marginBottom: 12,
        marginTop: 8,
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: 12,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: theme.colors.muted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: theme.colors.foreground,
        marginBottom: 2,
    },
    settingDesc: {
        fontSize: 12,
        color: theme.colors.mutedForeground,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginLeft: 52, // Indent past icon
    },
    privacyText: {
        fontSize: 13,
        color: theme.colors.mutedForeground,
        lineHeight: 20,
        marginBottom: 12,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    dangerCard: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)', // Red border
    },
    dangerTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ef4444',
        marginBottom: 12,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        backgroundColor: 'rgba(255,255,255,0.5)',
        gap: 8,
    },
    deleteText: {
        color: '#ef4444',
        fontWeight: '600',
    },
});
