import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Alert,
} from 'react-native';
import { AppIcon } from '../ui/AppIcon'; // Assuming AppIcon is available
import { theme } from '../../theme';
import { recipes, Recipe } from '../../data/recipes';

interface Collection {
    id: string;
    name: string;
    emoji: string;
    color: string;
    recipeIds: number[];
}

interface CreateCollectionModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (collection: Omit<Collection, 'id'>) => void;
}

const EMOJI_OPTIONS = ['🍳', '🥗', '🍕', '🍜', '🍰', '🥘', '🌮', '🍱', '🥙', '🍲'];
const COLOR_OPTIONS = [
    '#E6F0FF', // bg-primary-light (approx)
    '#F0FDF4', // bg-secondary (approx)
    '#F0FDF4', // bg-success-light (approx - using similar light greens)
    '#FFFBEB', // bg-warning-light (approx)
    '#EFF6FF', // bg-info-light (approx)
    '#F5F3FF', // bg-accent (approx)
];

// Map hex to tailwind-like names or use direct hex. 
// For simplicity in React Native, we will use the hex values directly.

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
    open,
    onClose,
    onCreate,
}) => {
    const [name, setName] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('🍳');
    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
    const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);

    const handleCreate = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter a collection name');
            return;
        }
        onCreate({
            name,
            emoji: selectedEmoji,
            color: selectedColor,
            recipeIds: selectedRecipes,
        });
        // Reset form
        setName('');
        setSelectedEmoji('🍳');
        setSelectedColor(COLOR_OPTIONS[0]);
        setSelectedRecipes([]);
        onClose();
    };

    const toggleRecipe = (id: number) => {
        setSelectedRecipes((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

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
                            <Text style={styles.title}>Create Collection</Text>
                        </View>
                        <Pressable onPress={onClose} hitSlop={10}>
                            <AppIcon name="x" size={20} color={theme.colors.mutedForeground} />
                        </Pressable>
                    </View>

                    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        {/* Collection Name */}
                        <View style={styles.section}>
                            <Text style={styles.label}>Collection Name</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="e.g., Weekly Dinners, Kids Favorites"
                                placeholderTextColor={theme.colors.mutedForeground}
                            />
                        </View>

                        {/* Choose Icon */}
                        <View style={styles.section}>
                            <Text style={styles.label}>Choose Icon</Text>
                            <View style={styles.emojiGrid}>
                                {EMOJI_OPTIONS.map((emoji) => (
                                    <Pressable
                                        key={emoji}
                                        onPress={() => setSelectedEmoji(emoji)}
                                        style={[
                                            styles.emojiButton,
                                            selectedEmoji === emoji && styles.emojiSelected,
                                        ]}
                                    >
                                        <Text style={styles.emojiText}>{emoji}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Choose Color */}
                        <View style={styles.section}>
                            <Text style={styles.label}>Choose Color</Text>
                            <View style={styles.colorRow}>
                                {COLOR_OPTIONS.map((color) => (
                                    <Pressable
                                        key={color}
                                        onPress={() => setSelectedColor(color)}
                                        style={[
                                            styles.colorButton,
                                            { backgroundColor: color },
                                            selectedColor === color && styles.colorSelected,
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Add Recipes */}
                        <View style={styles.section}>
                            <Text style={styles.label}>Add Recipes ({selectedRecipes.length} selected)</Text>
                            <View style={styles.recipeList}>
                                {recipes.map((recipe) => {
                                    const isSelected = selectedRecipes.includes(recipe.id);
                                    return (
                                        <Pressable
                                            key={recipe.id}
                                            onPress={() => toggleRecipe(recipe.id)}
                                            style={[
                                                styles.recipeCard,
                                                isSelected && styles.recipeSelected,
                                            ]}
                                        >
                                            <View style={styles.recipeContent}>
                                                <Text style={styles.recipeEmoji}>{recipe.image}</Text>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.recipeName}>{recipe.name}</Text>
                                                    <Text style={styles.recipeMeta}>{recipe.ingredients.length} ingredients</Text>
                                                </View>
                                            </View>
                                            {isSelected && <AppIcon name="check" size={18} color={theme.colors.primary} />}
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer Actions */}
                    <View style={styles.footer}>
                        <Pressable style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                        <Pressable style={styles.createButton} onPress={handleCreate}>
                            <Text style={styles.createText}>Create Collection</Text>
                        </Pressable>
                    </View>
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
        maxHeight: '85%',
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
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.foreground,
        marginBottom: 10,
    },
    input: {
        backgroundColor: theme.colors.muted,
        borderRadius: 14,
        padding: 14,
        fontSize: 16,
        color: theme.colors.foreground,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    emojiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    emojiButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.card,
    },
    emojiSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(46, 94, 153, 0.1)',
    },
    emojiText: {
        fontSize: 20,
    },
    colorRow: {
        flexDirection: 'row',
        gap: 12,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    colorSelected: {
        borderColor: theme.colors.foreground,
        transform: [{ scale: 1.1 }],
    },
    recipeList: {
        gap: 8,
    },
    recipeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.muted,
        padding: 12,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    recipeSelected: {
        backgroundColor: 'rgba(46, 94, 153, 0.05)',
        borderColor: theme.colors.primary,
    },
    recipeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    recipeEmoji: {
        fontSize: 24,
    },
    recipeName: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.foreground,
    },
    recipeMeta: {
        fontSize: 12,
        color: theme.colors.mutedForeground,
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    cancelText: {
        fontWeight: '600',
        color: theme.colors.foreground,
    },
    createButton: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    createText: {
        fontWeight: '600',
        color: '#fff',
    },
});
