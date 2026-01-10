import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AppLayout } from '../components/layout/AppLayout';
import { theme } from '../theme';
import { Camera, AlertTriangle, TrendingUp, Check, ChevronRight, Heart, Droplet, Flame, Apple } from 'lucide-react-native';

const mealTimeline = [
  {
    time: 'Breakfast',
    emoji: '🥞',
    status: 'done',
    items: ['Oatmeal', 'Banana', 'Coffee'],
    calories: 380,
    quality: 'good',
  },
  {
    time: 'Lunch',
    emoji: '🍛',
    status: 'done',
    items: ['Rice', 'Dal', 'Vegetables'],
    calories: 550,
    quality: 'good',
  },
  {
    time: 'Snack',
    emoji: '🍎',
    status: 'done',
    items: ['Apple', 'Almonds'],
    calories: 180,
    quality: 'excellent',
  },
  {
    time: 'Dinner',
    emoji: '🍝',
    status: 'pending',
    items: [],
    calories: 0,
    suggestion: 'Try: Grilled Chicken Salad (420 cal)',
  },
];

const nutritionStats = [
  { label: 'Calories', value: '1,110', target: '2,000', icon: Flame, color: '#f59e0b', progress: 55 },
  { label: 'Protein', value: '48g', target: '60g', icon: TrendingUp, color: '#3b82f6', progress: 80 },
  { label: 'Water', value: '1.5L', target: '2.5L', icon: Droplet, color: '#3b82f6', progress: 60 },
  { label: 'Fiber', value: '18g', target: '25g', icon: Apple, color: '#22c55e', progress: 72 },
];

const warnings = [
  { icon: '🍬', text: 'Sugar intake 15g above daily limit', type: 'warning' },
  { icon: '🧂', text: 'Sodium levels are optimal', type: 'success' },
];

const healthTips = [
  'Add more greens to dinner for fiber boost',
  'Consider reducing sugar in your coffee',
  'Great protein intake today! 💪',
];

export const NutritionScreen: React.FC = () => {
  return (
    <AppLayout>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Camera size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Scan Card */}
        <TouchableOpacity style={[styles.card, styles.scanCard]}>
          <View style={styles.scanContent}>
            <View style={styles.scanIconContainer}>
              <Camera size={32} color="#fff" />
            </View>
            <View style={styles.scanTextContainer}>
              <Text style={styles.scanTitle}>Scan Food</Text>
              <Text style={styles.scanSubtitle}>Get instant nutrition info & alternatives</Text>
            </View>
            <ChevronRight size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Daily Stats */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Heart size={20} color="#ef4444" fill="#ef4444" />
              <Text style={styles.cardTitle}>Today's Balance</Text>
            </View>
            <Text style={styles.dateText}>Jan 15, 2026</Text>
          </View>

          <View style={styles.statsGrid}>
            {nutritionStats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <View style={styles.statHeader}>
                  <stat.icon size={16} color={stat.color} />
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
                <View style={styles.statValueContainer}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTarget}>/ {stat.target}</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${stat.progress}%`,
                        backgroundColor: stat.progress > 80 ? '#22c55e' : stat.progress > 50 ? '#3b82f6' : '#f59e0b'
                      }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Warnings */}
        <View style={styles.warningsContainer}>
          {warnings.map((warning, i) => (
            <View
              key={i}
              style={[
                styles.warningCard,
                { backgroundColor: warning.type === 'warning' ? '#fef3c7' : '#dcfce7' }
              ]}
            >
              <Text style={styles.warningIcon}>{warning.icon}</Text>
              <Text style={styles.warningText}>{warning.text}</Text>
              {warning.type === 'warning' ? (
                <AlertTriangle size={20} color="#f59e0b" />
              ) : (
                <Check size={20} color="#22c55e" />
              )}
            </View>
          ))}
        </View>

        {/* Meal Timeline */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { marginBottom: 16 }]}>Meal Timeline</Text>

          <View style={styles.timelineContainer}>
            {mealTimeline.map((meal, i) => (
              <View key={meal.time} style={styles.timelineItem}>
                {/* Timeline dot */}
                <View style={styles.timelineLeft}>
                  <View style={[
                    styles.timelineDot,
                    {
                      backgroundColor: meal.status === 'done'
                        ? meal.quality === 'excellent' ? '#dcfce7' : '#dbeafe'
                        : '#f3f4f6'
                    }
                  ]}>
                    <Text style={{ fontSize: 20 }}>{meal.emoji}</Text>
                  </View>
                  {i < mealTimeline.length - 1 && (
                    <View style={[
                      styles.timelineLine,
                      { backgroundColor: meal.status === 'done' ? theme.colors.primary : '#e5e7eb' }
                    ]} />
                  )}
                </View>

                {/* Content */}
                <View style={[
                  styles.timelineContent,
                  meal.status === 'pending' && { opacity: 0.6 }
                ]}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTime}>{meal.time}</Text>
                    {meal.status === 'done' && (
                      <Text style={styles.timelineCalories}>{meal.calories} cal</Text>
                    )}
                  </View>

                  {meal.items.length > 0 ? (
                    <Text style={styles.timelineItems}>
                      {meal.items.join(' • ')}
                    </Text>
                  ) : meal.suggestion ? (
                    <Text style={styles.timelineSuggestion}>
                      💡 {meal.suggestion}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Health Tips */}
        <View style={[styles.card, styles.tipsCard]}>
          <Text style={[styles.cardTitle, { color: theme.colors.foreground, marginBottom: 12 }]}>💡 Today's Tips</Text>
          <View style={styles.tipsList}>
            {healthTips.map((tip, i) => (
              <View key={i} style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Diet Profiles */}
        <View style={styles.profileContainer}>
          <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Personalized for</Text>
          <View style={styles.tagsContainer}>
            {['👨 Shivam', '🏋️ Gym Diet', '🩺 Low Sugar'].map((profile, i) => (
              <View key={i} style={styles.profileTag}>
                <Text style={styles.profileTagText}>{profile}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  iconButton: {
    padding: 8,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scanCard: {
    backgroundColor: '#1e3a8a', // Fallback for gradient-primary
    borderWidth: 0,
  },
  scanContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  scanTextContainer: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  scanSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.foreground,
    marginLeft: 8,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statItem: {
    width: '50%',
    padding: 6,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginLeft: 6,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  statTarget: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    marginLeft: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: theme.colors.muted,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  warningsContainer: {
    marginBottom: 16,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginRight: 12,
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 40,
    marginRight: 16,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 24,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  timelineCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  timelineItems: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },
  timelineSuggestion: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary,
  },
  tipsCard: {
    backgroundColor: '#eff6ff', // Light blue background for tips
    borderColor: '#bfdbfe',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 14,
    color: theme.colors.primary,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    flex: 1,
    lineHeight: 20,
  },
  profileContainer: {
    padding: 16,
    paddingTop: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  profileTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  profileTagText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.foreground,
  },
});
