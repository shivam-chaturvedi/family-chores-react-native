import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
} from "react-native";
import { theme } from "../../theme";
import { AppIcon } from "../ui/AppIcon";

interface AddItemModalProps {
    open: boolean;
    onClose: () => void;
    onSave?: (item: ItemData) => void;
}

interface ItemData {
    name: string;
    category: string;
    quantity: number;
}

const categories = [
    { icon: "🥬", label: "Vegetables" },
    { icon: "🍎", label: "Fruits" },
    { icon: "🥛", label: "Dairy" },
    { icon: "🍖", label: "Meat" },
    { icon: "🍞", label: "Bakery" },
    { icon: "🥤", label: "Beverages" },
    { icon: "🧹", label: "Household" },
    { icon: "📦", label: "Other" },
];

export const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState<ItemData>({
        name: "",
        category: "Vegetables",
        quantity: 1,
    });

    const handleSave = () => {
        if (formData.name.trim()) {
            onSave?.(formData);
            setFormData({
                name: "",
                category: "Vegetables",
                quantity: 1,
            });
            onClose();
        }
    };

    return (
        <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AppIcon name="shoppingCart" size={20} color={theme.colors.warning || "#F59E0B"} style={{ marginRight: 8 }} />
                            <Text style={styles.title}>Add Shopping Item</Text>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Item Name */}
                        <Text style={styles.label}>Item Name</Text>
                        <TextInput
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                            placeholder="Enter item name"
                            placeholderTextColor={theme.colors.mutedForeground}
                            style={styles.input}
                        />

                        {/* Category Selection */}
                        <Text style={styles.label}>Category</Text>
                        <View style={styles.categoryGrid}>
                            {categories.map((cat) => (
                                <Pressable
                                    key={cat.label}
                                    onPress={() => setFormData({ ...formData, category: cat.label })}
                                    style={[
                                        styles.categoryButton,
                                        formData.category === cat.label && styles.categoryButtonActive,
                                    ]}
                                >
                                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                                </Pressable>
                            ))}
                        </View>

                        {/* Quantity */}
                        <Text style={styles.label}>Quantity</Text>
                        <View style={styles.quantityRow}>
                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                            >
                                <Text style={styles.quantityButtonText}>−</Text>
                            </Pressable>

                            <Text style={styles.quantityValue}>{formData.quantity}</Text>

                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <Pressable style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>
                        <Pressable style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Add Item</Text>
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
        padding: theme.spacing.md,
    },
    container: {
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        padding: theme.spacing.lg,
        maxHeight: "85%",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 20,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    header: {
        marginBottom: theme.spacing.lg,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: theme.colors.foreground,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.foreground,
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: theme.colors.muted,
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: theme.colors.foreground,
    },
    categoryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "space-between",
    },
    categoryButton: {
        width: "23%", // approx 4 columns
        aspectRatio: 1,
        borderRadius: 12,
        backgroundColor: theme.colors.muted,
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
    },
    categoryButtonActive: {
        backgroundColor: theme.colors.warning || "#F59E0B",
        transform: [{ scale: 1.05 }],
    },
    categoryIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    categoryLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: theme.colors.foreground,
        textAlign: "center",
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    quantityButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.card,
    },
    quantityButtonText: {
        fontSize: 24,
        fontWeight: "600",
        color: theme.colors.foreground,
    },
    quantityValue: {
        fontSize: 24,
        fontWeight: "700",
        color: theme.colors.foreground,
        minWidth: 40,
        textAlign: "center",
    },
    footer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 24,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: "center",
    },
    cancelButtonText: {
        fontWeight: "600",
        color: theme.colors.foreground,
    },
    saveButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: theme.colors.warning || "#F59E0B",
        alignItems: "center",
    },
    saveButtonText: {
        fontWeight: "600",
        color: "#fff",
    },
});
