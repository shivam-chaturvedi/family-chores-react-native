import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "../components/ui/Toast";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Search,
  Home,
  Calendar,
  CheckSquare,
  ShoppingCart,
  FolderLock,
  Utensils,
  DollarSign,
  Users,
  Bell,
  Book,
  MessageCircle,
  Mail,
  PlayCircle,
  Plus,
  GripVertical,
  Repeat,
  Sparkles,
  Check,
  X,
  ChevronRight,
  Shield,
  Download,
} from "lucide-react-native";

// --- Data ---
const featureGuides = [
  {
    id: "home",
    icon: Home,
    title: "Home Dashboard",
    path: "Home",
    description: "Your central hub for managing family activities. View upcoming events, tasks, and quick actions.",
    howToUse: [
      "View today's overview with weather and date",
      "See upcoming events and tasks at a glance",
      "Use quick action buttons to add events, tasks, or items",
      "Access family member profiles from the top section",
      "Tap the bell icon to view notifications",
    ],
    tips: [
      "Check the dashboard daily for important updates",
      "Use quick actions for faster task creation",
      "Notifications show unread alerts with a badge",
    ],
  },
  {
    id: "calendar",
    icon: Calendar,
    title: "Family Calendar",
    path: "Calendar",
    description: "A shared calendar for all family events, appointments, and activities.",
    howToUse: [
      "Tap the \"+\" button to add a new event",
      "Select a date to view events for that day",
      "Events are color-coded by family member",
      "Tap an event to view details or edit",
      "Use the week/month toggle to change views",
      "Set reminders for important events",
    ],
    tips: [
      "Assign events to specific family members",
      "Set recurring events for regular activities",
      "Add locations for school or appointment events",
      "Use different categories like School, Work, Health",
    ],
  },
  {
    id: "tasks",
    icon: CheckSquare,
    title: "Tasks & Chores",
    path: "Tasks",
    description: "Manage household chores and tasks. Assign to family members, form habits.",
    howToUse: [
      "Tap \"+\" to create a new task",
      "Assign tasks to family members",
      "Set priority levels (High, Medium, Low)",
      "Add due dates and times",
      "Check off tasks when completed",
      "Filter tasks by member, category, or status",
    ],
    tips: [
      "Create recurring tasks for weekly chores",
      "Use the chore rotation system for fairness",
      "Set reminders for important deadlines",
      "Review completed tasks to track productivity",
    ],
  },
  {
    id: "lists",
    icon: ShoppingCart,
    title: "Shopping Lists",
    path: "Lists",
    description: "Create and manage shopping lists. Drag to reorder, categorize items.",
    howToUse: [
      "Tap \"+\" to add new items to the list",
      "Drag items to reorder by priority",
      "Swipe left to delete items",
      "Check items off as you shop",
      "Items are auto-categorized (Produce, Dairy, etc.)",
      "All lists sync with family members",
    ],
    tips: [
      "Add quantity and notes for each item",
      "Use quick-add for frequently bought items",
      "Clear checked items after shopping",
      "Create separate lists for different stores",
    ],
  },
  {
    id: "vault",
    icon: FolderLock,
    title: "Document Vault",
    path: "Vault",
    description: "Securely store important family documents like IDs, insurance cards, etc.",
    howToUse: [
      "Tap \"+\" to upload a new document",
      "Choose document type (ID, Insurance, Medical, etc.)",
      "Set expiry dates for renewal reminders",
      "Organize by category for easy access",
      "Search documents by name or type",
      "Download or share documents when needed",
    ],
    tips: [
      "Set expiry reminders 30 days in advance",
      "Store both front and back of ID cards",
      "Keep emergency contacts in easy access",
      "Regularly update expired documents",
    ],
  },
  {
    id: "recipes",
    icon: Utensils,
    title: "Recipes Collection",
    path: "Recipes",
    description: "Browse, save, and organize your favorite family recipes.",
    howToUse: [
      "Browse recipes by category or cuisine",
      "Tap a recipe to view full details",
      "Save favorites for quick access",
      "View ingredients and step-by-step instructions",
      "See cooking time and difficulty level",
      "Check nutritional information",
    ],
    tips: [
      "Filter by dietary restrictions",
      "Use meal prep recipes for busy weeks",
      "Share recipe links with family members",
      "Rate recipes after trying them",
    ],
  },
  {
    id: "mealplan",
    icon: Utensils,
    title: "Meal Planning",
    path: "MealPlan",
    description: "Plan weekly meals with drag-and-drop simplicity.",
    howToUse: [
      "Drag recipes to calendar slots",
      "Plan breakfast, lunch, and dinner",
      "View the full week at a glance",
      "Tap \"Generate List\" to create shopping list",
      "Swap meals by dragging to new slots",
      "Clear slots to remove planned meals",
    ],
    tips: [
      "Plan meals on Sunday for the week ahead",
      "Consider dietary variety across days",
      "Auto-generated lists include all ingredients",
      "Adjust portions for family size",
    ],
  },
  {
    id: "expenses",
    icon: DollarSign,
    title: "Expense Tracker",
    path: "Expenses",
    description: "Track family spending, set budgets, and view insights.",
    howToUse: [
      "Tap \"+\" to add a new expense",
      "Select category (Food, Transport, Bills, etc.)",
      "Enter amount and add notes",
      "View spending charts by category",
      "Set monthly budgets per category",
      "Get alerts when approaching budget limits",
    ],
    tips: [
      "Log expenses immediately for accuracy",
      "Review monthly spending trends",
      "Set realistic budgets based on history",
      "Use insights to identify savings opportunities",
    ],
  },
  {
    id: "family",
    icon: Users,
    title: "Family Members",
    path: "Family",
    description: "Manage family profiles, roles, and permissions.",
    howToUse: [
      "Tap \"Add Member\" to create new profiles",
      "Set roles (Parent, Child, Guardian)",
      "Assign unique colors for calendar events",
      "Edit member details anytime",
      "View member-specific tasks and events",
      "Set permissions for children accounts",
    ],
    tips: [
      "Use distinct colors for easy identification",
      "Add birthdates for birthday reminders",
      "Set nicknames for personalization",
      "Link email for notifications",
    ],
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    path: "Notifications",
    description: "Manage notification preferences, quiet hours, and alerts.",
    howToUse: [
      "Toggle notification types on/off",
      "Set quiet hours for no disturbance",
      "Choose alert sounds and vibration",
      "Enable/disable specific categories",
      "View notification history",
      "Clear all notifications at once",
    ],
    tips: [
      "Set quiet hours during work/school",
      "Enable important reminders only",
      "Check notifications daily",
      "Customize per family member if needed",
    ],
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy & Security',
    path: 'Privacy',
    description: 'Control your data privacy, security settings, and manage connected devices.',
    howToUse: [
      'Review privacy settings',
      'Enable two-factor authentication',
      'Manage connected devices',
      'Control data sharing preferences',
      'View activity logs',
      'Download or delete your data'
    ],
    tips: [
      'Enable all security features',
      'Regularly review connected devices',
      'Use strong passwords',
      'Log out from unused devices'
    ]
  },
  {
    id: 'export',
    icon: Download,
    title: 'Data Export',
    path: 'DataExport',
    description: 'Export your family data for backup or transfer.',
    howToUse: [
      'Select data types to export',
      'Choose export format (PDF, CSV)',
      'Download to your device',
      'Schedule automatic backups',
      'Transfer to new devices'
    ],
    tips: [
      'Export regularly for safety',
      'Keep backups in secure location',
      'Verify exported data integrity'
    ]
  }
];

const faqItems = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I set up my family account?",
        a: "After signing up, you'll go through a quick onboarding where you can add your family name and invite members. You can also do this later from Settings → Family Members.",
      },
      {
        q: "Can I use the app on multiple devices?",
        a: "Yes! Your data syncs across all devices. Just sign in with the same account on each device.",
      },
      {
        q: "How do I invite family members?",
        a: "Go to Settings → Family Members → Add Member. Enter their email and they'll receive an invitation to join your family group.",
      },
    ],
  },
  {
    category: "Calendar & Events",
    questions: [
      {
        q: "How do I add a recurring event?",
        a: "When creating an event, toggle on \"Repeat\" and select the frequency (Daily, Weekly, Monthly, or Custom). You can also set an end date.",
      },
      {
        q: "Can I assign events to specific family members?",
        a: "Yes! Each event can be assigned to one or more family members. Their color will appear on the calendar for easy identification.",
      },
      {
        q: "How do I set event reminders?",
        a: "When adding an event, scroll to the reminder section and select when you'd like to be notified (15 min, 1 hour, 1 day before, etc.).",
      },
    ],
  },
  {
    category: "Tasks & Chores",
    questions: [
      {
        q: "How does chore rotation work?",
        a: "Enable Chore Rotation in task settings. The app will automatically rotate assigned chores among family members on a weekly basis.",
      },
      {
        q: "Can I set recurring tasks?",
        a: "Yes! When creating a task, enable \"Repeat\" and choose daily, weekly, or monthly. Great for regular chores like taking out trash.",
      },
      {
        q: "How do I track completed tasks?",
        a: "Tap the checkbox next to any task to mark it complete. View history in the \"Completed\" tab to see past achievements.",
      },
    ],
  },
  {
    category: "Shopping Lists",
    questions: [
      {
        q: "How do I reorder items in my list?",
        a: "Press and hold the drag handle (three lines) on any item, then drag it to your desired position.",
      },
      {
        q: "Are shopping lists shared automatically?",
        a: "Yes! All lists sync instantly with family members. Everyone can add items and check them off in real-time.",
      },
      {
        q: "How do I add items from recipes?",
        a: "Use the Meal Plan feature and tap \"Generate Grocery List\" to automatically add all ingredients from your planned meals.",
      },
    ],
  },
  {
    category: "Meal Planning",
    questions: [
      {
        q: "How do I plan meals for the week?",
        a: "Go to Meal Plan screen, browse recipes on the left, and drag them to any day/meal slot on the calendar. Easy drag and drop!",
      },
      {
        q: "How does auto grocery list work?",
        a: "After planning your meals, tap \"Generate Grocery List\" and all ingredients from your planned recipes will be added to your shopping list.",
      },
      {
        q: "Can I save favorite meal plans?",
        a: "Yes! Create a weekly plan you love, then save it as a template. Apply saved templates to quickly plan future weeks.",
      },
    ],
  },
  {
    category: "Expenses & Budget",
    questions: [
      {
        q: "How do I set a monthly budget?",
        a: "Go to Expenses → Settings icon → Set your total monthly budget and individual category limits.",
      },
      {
        q: "How do budget alerts work?",
        a: "When you reach 80% of a category budget, you'll get a warning. At 100%, you'll see an alert. Customize thresholds in settings.",
      },
      {
        q: "Can I track expenses by family member?",
        a: "Yes! When adding an expense, assign it to a family member to track individual spending patterns.",
      },
    ],
  },
  {
    category: "Document Vault",
    questions: [
      {
        q: "Is my data secure in the Vault?",
        a: "Absolutely! All documents are encrypted and stored securely. Only you and authorized family members can access them.",
      },
      {
        q: "How do expiry reminders work?",
        a: "When you add a document with an expiry date (like a passport or insurance), you'll get reminders 30, 14, and 7 days before expiration.",
      },
      {
        q: "Can I share documents with non-family members?",
        a: "Yes! You can generate a secure, temporary link to share specific documents with doctors, schools, or other trusted parties.",
      },
    ],
  },
  {
    category: "Account & Settings",
    questions: [
      {
        q: "How do I change the app theme?",
        a: "Go to Settings → Theme to switch between Light and Dark modes, or set it to follow your device's system setting.",
      },
      {
        q: "How do I change my password?",
        a: "Go to Settings → Privacy & Security → Change Password. You'll need to enter your current password first.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings → Privacy & Security → Delete Account. Note: This will permanently delete all your family data.",
      },
    ],
  },
];

const tutorialSteps = [
  {
    id: 'welcome',
    icon: Sparkles,
    title: 'Welcome to Todo Helpmate!',
    description: 'Your all-in-one family organizer. Let us show you around in just 30 seconds.',
    highlight: 'Manage your entire family life from one app',
    emoji: '👋'
  },
  {
    id: 'home',
    icon: Home,
    title: 'Home Dashboard',
    description: 'Your central hub shows today\'s events, tasks, meals, and alerts. Quick actions let you add anything with one tap.',
    highlight: 'Tap the + buttons for quick actions',
    emoji: '🏠'
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Family Calendar',
    description: 'All family events in one place. Color-coded by member so everyone knows who\'s doing what and when.',
    highlight: 'Events sync across all family devices',
    emoji: '📅'
  },
  {
    id: 'tasks',
    icon: CheckSquare,
    title: 'Tasks & Chores',
    description: 'Assign tasks to family members, set priorities, and track completion. Perfect for household chores!',
    highlight: 'Use recurring tasks for weekly chores',
    emoji: '✅'
  },
  {
    id: 'lists',
    icon: ShoppingCart,
    title: 'Shopping Lists',
    description: 'Create shared shopping lists. Anyone can add items, and they sync in real-time as you shop.',
    highlight: 'Drag to reorder, swipe to delete',
    emoji: '🛒'
  },
  {
    id: 'meals',
    icon: Utensils,
    title: 'Meal Planning',
    description: 'Plan weekly meals by dragging recipes to calendar slots. Auto-generate grocery lists from your plan!',
    highlight: 'Save time with auto grocery lists',
    emoji: '🍽️'
  },
  {
    id: 'vault',
    icon: FolderLock,
    title: 'Document Vault',
    description: 'Store important documents securely. Get reminders before IDs, insurance, and warranties expire.',
    highlight: 'Never miss a renewal again',
    emoji: '🔐'
  },
  {
    id: 'expenses',
    icon: DollarSign,
    title: 'Expense Tracking',
    description: 'Track family spending with beautiful charts. Set budgets and get alerts when you\'re close to limits.',
    highlight: 'Visualize spending patterns',
    emoji: '💰'
  },
  {
    id: 'family',
    icon: Users,
    title: 'Family Members',
    description: 'Add all family members with unique colors. Assign tasks and events to specific people.',
    highlight: 'Each member gets their own color',
    emoji: '👨‍👩‍👧‍👦'
  },
  {
    id: 'search',
    icon: Search,
    title: 'Global Search',
    description: 'Find anything instantly! Search across all events, tasks, recipes, and documents from the search bar.',
    highlight: 'Access search from any screen',
    emoji: '🔍'
  },
  {
    id: 'complete',
    icon: Check,
    title: 'You\'re All Set!',
    description: 'You now know the basics. Explore each feature to discover more. We\'re here to help in Settings → Help.',
    highlight: 'Start organizing your family life!',
    emoji: '🎉'
  }
];

// --- Tutorial Modal Component ---
interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === tutorialSteps.length - 1;
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  useEffect(() => {
    if (visible) setCurrentStep(0);
  }, [visible]);

  const handleNext = () => {
    if (isLast) onClose();
    else setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentStep(prev => prev - 1);
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Progress Bar */}
          <View style={styles.modalProgressBg}>
            <View style={[styles.modalProgressBar, { width: `${progress}%` }]} />
          </View>

          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalStepText}>Step {currentStep + 1} of {tutorialSteps.length}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={20} color={theme.colors.mutedForeground} />
            </Pressable>
          </View>

          {/* Content */}
          <View style={styles.modalBody}>
            <View style={styles.modalIconContainer}>
              <View style={styles.modalEmojiBg}>
                <Text style={{ fontSize: 50 }}>{step.emoji}</Text>
              </View>
              <View style={styles.modalIconBadge}>
                <step.icon size={24} color={theme.colors.primaryForeground} />
              </View>
            </View>

            <Text style={styles.modalTitle}>{step.title}</Text>
            <Text style={styles.modalDescription}>{step.description}</Text>

            <View style={styles.highlightBadge}>
              <Sparkles size={16} color={theme.colors.success} />
              <Text style={styles.highlightText}>{step.highlight}</Text>
            </View>
          </View>

          {/* Dots */}
          <View style={styles.dotsRow}>
            {tutorialSteps.map((_, index) => (
              <Pressable
                key={index}
                onPress={() => setCurrentStep(index)}
                style={[
                  styles.dot,
                  index === currentStep && styles.dotActive,
                  index < currentStep && styles.dotCompleted
                ]}
              />
            ))}
          </View>

          {/* Actions */}
          <View style={styles.modalActions}>
            {!isFirst && (
              <Pressable style={styles.prevButton} onPress={handlePrev}>
                <ChevronLeft size={20} color={theme.colors.foreground} />
                <Text style={styles.prevButtonText}>Back</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.nextButton, isFirst && { flex: 1 }]}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>{isLast ? "Get Started" : "Next"}</Text>
              {isLast ? <Check size={18} color="#fff" /> : <ChevronRight size={18} color="#fff" />}
            </Pressable>
          </View>

          {!isLast && (
            <Pressable onPress={onClose} style={{ alignItems: 'center', marginTop: 12 }}>
              <Text style={styles.skipLink}>Skip tutorial</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

// --- Main Help Screen ---
export const HelpScreen: React.FC = () => {
  const { openSidebar } = useSidebar();
  const navigation = useNavigation<any>();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"features" | "faq">("features");

  const handleNavigate = (path: string) => {
    try {
      navigation.navigate(path);
    } catch (error) {
      console.error(error);
      showToast({ title: "Navigation Error", description: "Could not open screen", type: "warning" });
    }
  };

  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [expandedFaqCategory, setExpandedFaqCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const [showTutorial, setShowTutorial] = useState(false);

  const filteredFeatures = useMemo(() =>
    featureGuides.filter(f =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]
  );

  const filteredFaqs = useMemo(() =>
    faqItems.map(cat => ({
      ...cat,
      questions: cat.questions.filter(q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(c => c.questions.length > 0), [searchQuery]
  );

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.backButton}>
              <ChevronLeft size={24} color={theme.colors.foreground} />
            </Pressable>
            <View>
              <Text style={styles.title}>Help & Support</Text>
              <Text style={styles.subtitle}>Learn how to use every feature</Text>
            </View>
          </View>

          {/* Hero */}
          <View style={styles.heroCard}>
            <View style={styles.heroIconBox}>
              <Book size={32} color={theme.colors.primaryForeground} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Complete User Guide</Text>
              <Text style={styles.heroSubtitle}>Everything you need to manage your family</Text>
            </View>
          </View>

          {/* Tutorial Button */}
          <Pressable style={styles.tutorialBtn} onPress={() => setShowTutorial(true)}>
            <View style={styles.playIconBox}>
              <PlayCircle size={24} color={theme.colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tutorialTitle}>Watch Tutorial Again</Text>
              <Text style={styles.tutorialSub}>Step-by-step walkthrough of all features</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.mutedForeground} />
          </Pressable>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Search size={20} color={theme.colors.mutedForeground} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search features or questions..."
              placeholderTextColor={theme.colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'features' && styles.activeTab]}
              onPress={() => setActiveTab('features')}
            >
              <Text style={[styles.tabText, activeTab === 'features' && styles.activeTabText]}>
                📚 Feature Guide
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
              onPress={() => setActiveTab('faq')}
            >
              <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
                ❓ FAQ
              </Text>
            </Pressable>
          </View>

          {/* Content */}
          {activeTab === 'features' && (
            <View style={styles.contentSection}>
              <Text style={styles.sectionHint}>Tap any feature to learn how to use it</Text>
              {filteredFeatures.map(item => (
                <View key={item.id} style={styles.accordionCard}>
                  <Pressable
                    style={styles.accordionHeader}
                    onPress={() => setExpandedFeature(expandedFeature === item.id ? null : item.id)}
                  >
                    <View style={styles.featureIconBox}>
                      <item.icon size={24} color={theme.colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.featureTitle}>{item.title}</Text>
                      <Text numberOfLines={1} style={styles.featureDesc}>{item.description}</Text>
                    </View>
                    {expandedFeature === item.id ? (
                      <ChevronUp size={20} color={theme.colors.mutedForeground} />
                    ) : (
                      <ChevronDown size={20} color={theme.colors.mutedForeground} />
                    )}
                  </Pressable>

                  {expandedFeature === item.id && (
                    <View style={styles.accordionBody}>
                      <Text style={styles.fullDesc}>{item.description}</Text>

                      {/* How to use */}
                      <View style={styles.subSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                          <View style={styles.miniIconBox}><Text>📋</Text></View>
                          <Text style={styles.subTitle}>How to Use</Text>
                        </View>
                        {item.howToUse.map((step, idx) => (
                          <View key={idx} style={styles.stepRow}>
                            <View style={styles.stepNum}><Text style={styles.stepNumText}>{idx + 1}</Text></View>
                            <Text style={styles.stepText}>{step}</Text>
                          </View>
                        ))}
                      </View>

                      {/* Tips */}
                      <View style={styles.subSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                          <View style={[styles.miniIconBox, { backgroundColor: '#dcfce7' }]}><Text>💡</Text></View>
                          <Text style={styles.subTitle}>Pro Tips</Text>
                        </View>
                        {item.tips.map((tip, idx) => (
                          <View key={idx} style={styles.stepRow}>
                            <Text style={{ color: theme.colors.success, marginRight: 8 }}>•</Text>
                            <Text style={styles.stepText}>{tip}</Text>
                          </View>
                        ))}
                      </View>

                      <Pressable style={styles.goToBtn} onPress={() => handleNavigate(item.path)}>
                        <Text style={styles.goToText}>Go to {item.title} →</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'faq' && (
            <View style={styles.contentSection}>
              <Text style={styles.sectionHint}>Find answers to common questions</Text>
              {filteredFaqs.map(cat => (
                <View key={cat.category} style={styles.accordionCard}>
                  <Pressable
                    style={styles.accordionHeader}
                    onPress={() => setExpandedFaqCategory(expandedFaqCategory === cat.category ? null : cat.category)}
                  >
                    <Text style={styles.featureTitle}>{cat.category}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cat.questions.length} questions</Text>
                      </View>
                      {expandedFaqCategory === cat.category ? (
                        <ChevronUp size={20} color={theme.colors.mutedForeground} />
                      ) : (
                        <ChevronDown size={20} color={theme.colors.mutedForeground} />
                      )}
                    </View>
                  </Pressable>

                  {expandedFaqCategory === cat.category && (
                    <View style={styles.accordionBody}>
                      {cat.questions.map((q, qIdx) => {
                        const qId = `${cat.category}-${qIdx}`;
                        const isExpanded = expandedFaq === qId;
                        return (
                          <View key={qIdx} style={styles.faqItem}>
                            <Pressable
                              style={styles.faqHeader}
                              onPress={() => setExpandedFaq(isExpanded ? null : qId)}
                            >
                              <Text style={styles.faqQuestion}>{q.q}</Text>
                              {isExpanded ? (
                                <ChevronUp size={16} color={theme.colors.mutedForeground} />
                              ) : (
                                <ChevronDown size={16} color={theme.colors.mutedForeground} />
                              )}
                            </Pressable>
                            {isExpanded && (
                              <View style={styles.faqAnswerBox}>
                                <Text style={styles.faqAnswer}>{q.a}</Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Quick Reference */}
          <View style={styles.quickRefCard}>
            <Text style={styles.cardTitle}>Quick Reference</Text>
            <View style={styles.quickGrid}>
              {[
                { icon: Plus, label: "Add Items", text: "Tap + on any screen" },
                { icon: GripVertical, label: "Drag & Drop", text: "Hold and drag to reorder" },
                { icon: Repeat, label: "Recurring", text: "Toggle repeat for events" },
                { icon: Bell, label: "Reminders", text: "Set alerts for dates" },
              ].map((q, i) => (
                <View key={i} style={styles.quickItem}>
                  <View style={{ flexDirection: 'row', gap: 4, marginBottom: 4 }}>
                    <q.icon size={16} color={theme.colors.primary} />
                    <Text style={styles.quickLabel}>{q.label}</Text>
                  </View>
                  <Text style={styles.quickText}>{q.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* App Stats */}
          <View style={[styles.accordionCard, { padding: 16 }]}>
            <Text style={styles.cardTitle}>App Features at a Glance</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>12+</Text>
                <Text style={styles.statLabel}>Features</Text>
              </View>
              <View style={styles.vertLine} />
              <View style={styles.statItem}>
                <Text style={styles.statVal}>∞</Text>
                <Text style={styles.statLabel}>Members</Text>
              </View>
              <View style={styles.vertLine} />
              <View style={styles.statItem}>
                <Text style={styles.statVal}>24/7</Text>
                <Text style={styles.statLabel}>Sync</Text>
              </View>
            </View>
          </View>

          {/* Contact */}
          <Text style={styles.sectionHint}>Still Need Help?</Text>
          <View style={styles.contactRow}>
            <Pressable style={styles.contactCard}>
              <View style={styles.contactIconBox}>
                <Mail size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.contactTitle}>Email Us</Text>
              <Text style={styles.contactSub}>support@todohelpmate.app</Text>
            </Pressable>
            <Pressable style={styles.contactCard}>
              <View style={[styles.contactIconBox, { backgroundColor: '#dcfce7' }]}>
                <MessageCircle size={24} color={theme.colors.success} />
              </View>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactSub}>9am - 6pm IST</Text>
            </Pressable>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </AppLayout>

      {/* Tutorial Modal Overlay */}
      <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: theme.colors.card,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a', // Dark blue
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  heroIconBox: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  tutorialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    // Add shadow if needed
  },
  playIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tutorialTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  tutorialSub: {
    fontSize: 11,
    color: theme.colors.mutedForeground,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.muted,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.foreground,
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.muted,
    padding: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: theme.colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.mutedForeground,
  },
  activeTabText: {
    color: theme.colors.foreground,
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionHint: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    marginBottom: 8,
    marginLeft: 4,
  },
  accordionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12, // Squared look
    marginBottom: 12, // Spacing between cards
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Push arrow to right
    padding: 16, // More internal padding
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTitle: {
    fontSize: 15, // Slightly larger
    fontWeight: '600',
    color: theme.colors.foreground,
    flex: 1, // Ensure title takes available space if needed, but in FAQ header flexible space is handled by spacing
  },
  featureDesc: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
  },
  accordionBody: {
    padding: 20, // More padding for content
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  fullDesc: {
    fontSize: 13,
    color: theme.colors.foreground,
    marginTop: 12,
    marginBottom: 16,
    lineHeight: 20,
  },
  subSection: {
    marginBottom: 16,
  },
  miniIconBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepNumText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  stepText: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.mutedForeground,
    lineHeight: 18,
  },
  goToBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  goToText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: theme.colors.muted,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  faqItem: {
    marginBottom: 8,
    backgroundColor: theme.colors.muted,
    borderRadius: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.foreground,
    flex: 1,
    marginRight: 8,
  },
  faqAnswerBox: {
    padding: 12,
    paddingTop: 0,
  },
  faqAnswer: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    backgroundColor: theme.colors.card,
    padding: 8,
    borderRadius: 8,
    lineHeight: 18,
  },
  quickRefCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.foreground,
    marginBottom: 12,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickItem: {
    width: '48%',
    backgroundColor: theme.colors.muted,
    padding: 12,
    borderRadius: 12,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  quickText: {
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  vertLine: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.border,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  contactIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  contactSub: {
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    overflow: 'hidden',
  },
  modalProgressBg: {
    height: 4,
    backgroundColor: theme.colors.muted,
    width: '100%',
  },
  modalProgressBar: {
    height: 4,
    backgroundColor: theme.colors.primary,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalStepText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.mutedForeground,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 24,
    alignItems: 'center',
  },
  modalIconContainer: {
    position: 'relative',
    marginBottom: 24,
    alignItems: 'center',
  },
  modalEmojiBg: {
    width: 96,
    height: 96,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIconBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.foreground,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  highlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.success,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.muted,
    width: 6,
  },
  dotActive: {
    width: 24,
    backgroundColor: theme.colors.primary,
  },
  dotCompleted: {
    backgroundColor: 'rgba(59, 130, 246, 0.5)',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.muted, // slight tint
  },
  prevButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  prevButtonText: {
    marginLeft: 4,
    fontWeight: '600',
    color: theme.colors.foreground,
  },
  nextButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    gap: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 4,
  },
  skipLink: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
});
