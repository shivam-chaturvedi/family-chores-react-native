Prompt 1 – Inventory React JS App
- Read every folder/file of `reactjs/`. List screens (`pages/*`), shared UI components (`components/*`), data sources (`data/*`), hooks, contexts, utils, integrations, styling (Tailwind/tokens), and configs (`package.json`, `tsconfig`, env). Note routing (`src/App.tsx`), providers, modals, and assets.
- Output: structured summary so future prompts can reference exact file paths.

Prompt 2 – Design RN Architecture Parallel to React JS
- Based on your inventory, sketch RN folder layout (screens, components, contexts, hooks, assets). Define navigation mapping (React Router routes → React Navigation stack/bottom tabs/drawer) using `reactjs/src/App.tsx`.
- Create shared theming tokens (colors/spacing/shadow) derived from `reactjs/src/index.css`/Tailwind config and decide voice (StyleSheet + `theme.ts`).
- Outline context/API strategy: port `FamilyContext`, `MealPlanContext`, Supabase client, and determine React Query usage.
- Output: save plan as `architecture.md`.

Prompt 3 – Shared Layout & UI Primitives
- Convert `components/layout/AppLayout.tsx`, `BottomNavigation.tsx`, `AppSidebar.tsx` and the minimal UI toolkit used by the React JS screens (Button, Input, Sheet, Toast, Tooltip) into RN equivalents under `src/components/*`.
- Match spacing, gradients, icons, bottom nav behavior, sidebar drawer, toast stacking, and ensure navigation hooks/pure RN components replace browser-specific features.

Prompt 4 – Contexts/Data/Notifications
- Port `FamilyContext.tsx`, `MealPlanContext.tsx`, `data/recipes.ts`, `hooks/useNotifications.ts`, and Supabase integration into RN modules.
- Provide identical APIs, default data, and storage-friendly helpers (AsyncStorage or in-memory) for notifications/toasts.

Prompt 5 – Onboarding + Authentication
- Recreate `pages/OnboardingScreen.tsx` and `AuthScreen.tsx` using RN components, theme tokens, and navigation callbacks.
- Implement slides, gradient header, tabs, password toggle, and flows (skip → auth → home), matching the React JS UX.

Prompt 6 – Core Home Experience
- Convert `HomeScreen`, `FamilyDashboard`, `FamilyOnboarding`, `NotificationPanel`, `GettingStartedTutorial`, `GlobalSearch`, `AddEvent/Task/Item/Member` modals, and all shared overlays.
- Use contexts for data, AsyncStorage for tutorial flag, and ensure UI matches the web layout (member strip, quick actions, cards, activity feed).

Prompt 7 – Primary Tabs (Calendar, Tasks, Lists, Vault, More)
- Port the React JS versions of `CalendarScreen`, `TasksScreen`, `ListsScreen`, `VaultScreen`, and `MoreScreen`, along with their dependent helpers (calendar panels, chore rotation, draggable grocery list).
- Maintain layout, navigation, filtering, swipe gestures, and modals (search, sidebar).

Prompt 8 – Recipes & Meal Management
- Build RN screens for `RecipesScreen`, `RecipeDetailScreen`, `MealPlanScreen`, and `NutritionScreen`.
- Mirror the filtering/saving logic, meal plan context usage, ingredient lists, and health cards.

Prompt 9 – Utility & Settings Screens
- Convert `DocumentsScreen`, `ExpensesScreen`, `FamilyScreen`, `NotificationsScreen`, `PrivacyScreen`, `ThemeScreen`, `ExportScreen`, `HelpScreen`, and `ForgotPasswordScreen`.
- Use RN cards, form controls, switches, and modals; ensure each screen reuses shared contexts/hooks for data.

Prompt 10 – Navigation & Routing Parity
- Implement React Navigation stack/tab/drawer structure (`AppNavigator.tsx`, `TabNavigator.tsx`) covering every React JS route (splash, onboarding, auth, tabs, details, utilities).
- Ensure the BottomNavigation component is reused for tabs, drawer/sidebar routes close after navigation, recipe detail receives params, and back behavior matches the router flow.

Prompt 11 – Remaining UI Components
- Convert every leftover UI primitive under `components/ui` (dropdowns, dialogs, tooltip, table, carousel, calendar, avatar, toggle, badge, tooltip, popover, etc.) into RN components with the same props/signatures.
- Provide `Sheet`, `Modal`, `Tooltip` analogs and ensure their styling matches the web design system.

Prompt 12 – Shared Helpers & Hooks
- Port helpers such as `hooks/useMealPrepScheduler`, `useFamilySync`, `useRecipeRecommendations`, `utils/groceryCategories`, calendar repeat presets, draggable meal slot helpers, and notification settings logic.
- Maintain their API so RN screens can consume them unchanged.

Prompt 13 – Asset + Style Parity
- Ensure all assets (icons, images) used by the web app are available in RN (copy from `public/` or replace with emoji/font icons).
- Confirm `theme.ts` tokens match `src/index.css` variables (colors, shadows, radii) and document them if needed.

Prompt 14 – Final Verification
- Walk through every React JS file and confirm an RN equivalent exists or is intentionally skipped with justification.
- Re-run all navigation flows, contexts, and hooks, ensuring data/logic parity.
- Run `npm run lint`, `npm run test`, and start the RN app (`npm run ios`/`npm run android`) to prove complete coverage.
