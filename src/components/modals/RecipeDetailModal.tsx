import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Dimensions,
    Platform,
} from "react-native";
import { AppIcon } from "../ui/AppIcon";
import { theme } from "../../theme";
import { Recipe } from "../../data/recipes";

interface RecipeDetailModalProps {
    recipe: Recipe | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddToGroceryList?: (recipe: Recipe) => void;
}

// Mock nutrition data - matches ReactJS logic
const getNutritionData = (recipe: Recipe) => ({
    calories: Math.round(recipe.servings * 150 + recipe.ingredients.length * 25),
    protein: Math.round(recipe.ingredients.length * 3.5),
    carbs: Math.round(recipe.servings * 20 + recipe.ingredients.length * 5),
    fat: Math.round(recipe.servings * 8 + recipe.ingredients.length * 2),
});

// Mock dynamic instructions - matches ReactJS logic
const getInstructions = (recipe: Recipe): string[] => {
    const baseSteps = [
        `Gather all ${recipe.ingredients.length} ingredients and prep your workspace.`,
        "Wash and prepare all vegetables if applicable.",
    ];

    if (recipe.tags.includes("Vegetarian")) {
        baseSteps.push("Heat oil in a large pan over medium heat.");
        baseSteps.push("Add aromatics like onion, garlic, and ginger. Sauté until fragrant.");
        baseSteps.push("Add the main vegetables and cook until tender.");
        baseSteps.push("Season with spices and salt to taste.");
        baseSteps.push("Garnish with fresh herbs before serving.");
    } else if (recipe.tags.includes("High Protein")) {
        baseSteps.push("Marinate the protein with spices for 15 minutes.");
        baseSteps.push("Heat a pan or grill over medium-high heat.");
        baseSteps.push("Cook the protein until golden and cooked through.");
        baseSteps.push("Let rest for 5 minutes before slicing.");
        baseSteps.push("Serve with sides and garnish.");
    } else {
        baseSteps.push("Prepare the base sauce or marinade.");
        baseSteps.push("Cook main ingredients according to recipe requirements.");
        baseSteps.push("Combine all elements and simmer if needed.");
        baseSteps.push("Taste and adjust seasoning.");
        baseSteps.push("Plate beautifully and serve warm.");
    }

    return baseSteps;
};

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
    recipe,
    open,
    onOpenChange,
    onAddToGroceryList,
}) => {
    if (!recipe) return null;

    const nutrition = getNutritionData(recipe);
    const instructions = getInstructions(recipe);

    return (
        <Modal
            visible={open}
            animationType="slide"
            transparent={true}
            onRequestClose={() => onOpenChange(false)}
        >
            <View style={styles.modalContainer}>
                {/* Header Background */}
                <View style={styles.headerBackground}>
                    <Text style={styles.heroEmoji}>{recipe.image}</Text>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => onOpenChange(false)}
                    >
                        <AppIcon name="x" size={20} color="#fff" />
                    </Pressable>
                    <Pressable style={styles.bookmarkButton}>
                        <AppIcon
                            name="bookmark"
                            size={20}
                            color="#fff"
                            // fill={recipe.saved ? "#fff" : "none"} // Lucide RN logic
                            style={recipe.saved ? { opacity: 1 } : { opacity: 0.7 }}
                        />
                    </Pressable>
                </View>

                {/* Content Sheet */}
                <View style={styles.sheetContainer}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Title & Tags */}
                        <View style={styles.titleSection}>
                            <Text style={styles.title}>{recipe.name}</Text>

                            <View style={styles.metaRow}>
                                <View style={styles.metaItem}>
                                    <AppIcon name="clock" size={14} color={theme.colors.mutedForeground} />
                                    <Text style={styles.metaText}>{recipe.time}</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <AppIcon name="users" size={14} color={theme.colors.mutedForeground} />
                                    <Text style={styles.metaText}>{recipe.servings} servings</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <AppIcon name="chefHat" size={14} color={theme.colors.mutedForeground} />
                                    <Text style={styles.metaText}>{recipe.ingredients.length} items</Text>
                                </View>
                            </View>

                            <View style={styles.tagsRow}>
                                {recipe.tags.map((tag) => (
                                    <View key={tag} style={styles.tag}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Nutrition Cards */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <AppIcon name="zap" size={16} color={theme.colors.warning} style={{ marginRight: 6 }} />
                                <Text style={styles.sectionTitle}>Nutrition (per serving)</Text>
                            </View>

                            <View style={styles.nutritionGrid}>
                                <View style={[styles.nutritionCard, { backgroundColor: "rgba(245, 158, 11, 0.15)" }]}>
                                    <AppIcon name="zap" size={20} color={theme.colors.warning} style={{ marginBottom: 4 }} />
                                    <Text style={styles.nutritionValue}>{nutrition.calories}</Text>
                                    <Text style={styles.nutritionLabel}>kcal</Text>
                                </View>
                                <View style={[styles.nutritionCard, { backgroundColor: "rgba(239, 68, 68, 0.1)" }]}>
                                    <AppIcon name="biceps" size={20} color={theme.colors.danger} style={{ marginBottom: 4 }} />
                                    <Text style={styles.nutritionValue}>{nutrition.protein}g</Text>
                                    <Text style={styles.nutritionLabel}>Protein</Text>
                                </View>
                                <View style={[styles.nutritionCard, { backgroundColor: "rgba(123, 164, 208, 0.15)" }]}>
                                    <AppIcon name="leaf" size={20} color={theme.colors.info} style={{ marginBottom: 4 }} />
                                    <Text style={styles.nutritionValue}>{nutrition.carbs}g</Text>
                                    <Text style={styles.nutritionLabel}>Carbs</Text>
                                </View>
                                <View style={[styles.nutritionCard, { backgroundColor: "rgba(46, 94, 153, 0.15)" }]}>
                                    <Text style={{ fontSize: 20, marginBottom: 4 }}>🥑</Text>
                                    <Text style={styles.nutritionValue}>{nutrition.fat}g</Text>
                                    <Text style={styles.nutritionLabel}>Fat</Text>
                                </View>
                            </View>
                        </View>

                        {/* Ingredients */}
                        <View style={[styles.section, styles.cardSoft]}>
                            <View style={styles.ingredientsHeader}>
                                <Text style={styles.cardTitle}>Ingredients</Text>
                                <Pressable style={styles.addOutlineButton} onPress={() => onAddToGroceryList?.(recipe)}>
                                    <AppIcon name="shoppingCart" size={14} color={theme.colors.foreground} style={{ marginRight: 6 }} />
                                    <Text style={styles.addOutlineText}>Add to List</Text>
                                </Pressable>
                            </View>

                            <View style={styles.ingredientsList}>
                                {recipe.ingredients.map((ingredient, i) => (
                                    <View key={i} style={styles.ingredientRow}>
                                        <View style={styles.numberCircle}>
                                            <Text style={styles.numberText}>{i + 1}</Text>
                                        </View>
                                        <Text style={styles.ingredientName}>{ingredient.name}</Text>
                                        <Text style={styles.ingredientQty}>
                                            {ingredient.quantity} {ingredient.unit}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Cooking Instructions */}
                        <View style={[styles.section, styles.cardSoft]}>
                            <View style={styles.sectionHeader}>
                                <AppIcon name="chefHat" size={16} color={theme.colors.primary} style={{ marginRight: 6 }} />
                                <Text style={styles.cardTitle}>Cooking Instructions</Text>
                            </View>

                            <View style={styles.stepsList}>
                                {instructions.map((step, i) => (
                                    <View key={i} style={styles.stepRow}>
                                        <View style={styles.stepCircle}>
                                            <Text style={styles.stepNumber}>{i + 1}</Text>
                                        </View>
                                        <Text style={styles.stepText}>{step}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Footer Action */}
                        <Pressable
                            style={styles.mainActionButton}
                            onPress={() => onAddToGroceryList?.(recipe)}
                        >
                            <AppIcon name="shoppingCart" size={20} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.mainActionText}>Add All to Grocery List</Text>
                        </Pressable>

                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: theme.colors.primary, // Dark header background
    },
    headerBackground: {
        height: 200,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    heroEmoji: {
        fontSize: 80,
    },
    closeButton: {
        position: "absolute",
        top: 50, // Safe Area approx
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    bookmarkButton: {
        position: "absolute",
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    sheetContainer: {
        flex: 1,
        marginTop: -24,
        backgroundColor: theme.colors.card,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: "hidden",
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    titleSection: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: theme.colors.foreground,
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 16,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        fontSize: 14,
        color: theme.colors.mutedForeground,
    },
    tagsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    tag: {
        backgroundColor: "rgba(123, 164, 208, 0.2)", // bg-primary-light
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 99,
    },
    tagText: {
        color: theme.colors.primary,
        fontWeight: "600",
        fontSize: 12,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.colors.foreground,
    },
    cardSoft: {
        backgroundColor: theme.colors.muted,
        borderRadius: 20,
        padding: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.colors.foreground,
    },
    nutritionGrid: {
        flexDirection: "row",
        gap: 8,
    },
    nutritionCard: {
        flex: 1,
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
    },
    nutritionValue: {
        fontSize: 16,
        fontWeight: "700",
        color: theme.colors.foreground,
    },
    nutritionLabel: {
        fontSize: 12,
        color: theme.colors.mutedForeground,
    },
    ingredientsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    addOutlineButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addOutlineText: {
        fontSize: 12,
        fontWeight: "600",
        color: theme.colors.foreground,
    },
    ingredientsList: {
        gap: 12,
    },
    ingredientRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    numberCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(123, 164, 208, 0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    numberText: {
        fontSize: 12,
        fontWeight: "700",
        color: theme.colors.primary,
    },
    ingredientName: {
        flex: 1,
        fontSize: 15,
        color: theme.colors.foreground,
    },
    ingredientQty: {
        fontSize: 14,
        color: theme.colors.mutedForeground,
        fontWeight: "500",
    },
    stepsList: {
        gap: 16,
        marginTop: 12,
    },
    stepRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    stepCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        marginTop: 2,
    },
    stepNumber: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        color: theme.colors.foreground,
        lineHeight: 22,
    },
    mainActionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.primary,
        height: 48,
        borderRadius: 16,
        marginTop: 8,
    },
    mainActionText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});
