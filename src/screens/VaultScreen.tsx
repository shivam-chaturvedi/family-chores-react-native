import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { useFamily } from "../contexts/FamilyContext";
import { theme } from "../theme";
import { GlobalSearch } from "../components/search/GlobalSearch";
import { useSidebar } from "../contexts/SidebarContext";

const categories = [
  { id: "certificate", label: "Certificates" },
  { id: "bill", label: "Bills" },
  { id: "warranty", label: "Warranties" },
];

export const VaultScreen: React.FC = () => {
  const { globalVault } = useFamily();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { openSidebar } = useSidebar();

  const filteredDocs = globalVault.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={openSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Family Vault</Text>
          </View>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Search documents"
              placeholderTextColor={theme.colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => setShowSearch(true)}>
              <Text style={styles.link}>Search</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoryRow}>
              {categories.map((cat) => (
                <View key={cat.id} style={styles.categoryBox}>
                  <Text style={styles.categoryText}>{cat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Documents</Text>
            {filteredDocs.map((doc) => (
              <View key={doc.id} style={styles.docCard}>
                <Text style={styles.docTitle}>{doc.name}</Text>
                <Text style={styles.docMeta}>{doc.type}</Text>
              </View>
            ))}
            {filteredDocs.length === 0 && <Text style={styles.empty}>No documents found.</Text>}
          </View>
        </ScrollView>
      </AppLayout>
      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  menuButton: {
    padding: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
  },
  menuIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    color: theme.colors.foreground,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  categoryBox: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.muted,
    borderRadius: 14,
  },
  categoryText: {
    fontWeight: "600",
  },
  docCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  docTitle: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  docMeta: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  empty: {
    color: theme.colors.mutedForeground,
    textAlign: "center",
    fontSize: 12,
  },
});
