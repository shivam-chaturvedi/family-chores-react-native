import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
} from 'react-native';
import { AppIcon } from '../ui/AppIcon';
import { theme } from '../../theme';
import { recipes, Recipe } from '../../data/recipes';

interface AddMealModalProps {
    open: boolean;
    onClose: () => void;
    onSelectRecipe: (recipeId: number) => void;
}

export const AddMealModal: React.FC<AddMealModalProps> = ({
    open,
    onClose,
    onSelectRecipe,
}) => {
    return (
        <Modal
            visible={open}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <View style={styles.titleRow}>
                            <AppIcon name="plus" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
                            <Text style={styles.title}>Select a Recipe</Text>
                        </View>
                        <Pressable onPress={onClose} hitSlop={10}>
                            <AppIcon name="x" size={20} color={theme.colors.mutedForeground} />
                        </Pressable>
                    </View>

                    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={styles.recipeList}>
                            {recipes.map((recipe) => (
                                <Pressable
                                    key={recipe.id}
                                    onPress={() => onSelectRecipe(recipe.id)}
                                    style={styles.recipeCard}
                                >
                                    <Text style={styles.recipeEmoji}>{recipe.image}</Text>
                                    <View style={styles.recipeInfo}>
                                        <Text style={styles.recipeName}>{recipe.name}</Text>
                                        <Text style={styles.recipeMeta}>
                                            {recipe.time} • {recipe.servings} servings
                                        </Text>
                                    </View>
                                    <AppIcon name="plus" size={20} color={theme.colors.primary} />
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: theme.colors.card,
        borderRadius: 24,
        maxHeight: '80%',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.foreground,
    },
    scrollContainer: {
        padding: 20,
    },
    recipeList: {
        gap: 12,
    },
    recipeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.muted,
        padding: 16,
        borderRadius: 16,
    },
    recipeEmoji: {
        fontSize: 28,
        marginRight: 16,
    },
    recipeInfo: {
        flex: 1,
    },
    recipeName: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.foreground,
        marginBottom: 4,
    },
    recipeMeta: {
        fontSize: 13,
        color: theme.colors.mutedForeground,
    },
});
