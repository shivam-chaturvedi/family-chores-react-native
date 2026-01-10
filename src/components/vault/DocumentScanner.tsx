import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
} from "react-native";
import { Camera, Upload, FileText, X } from "lucide-react-native";
import { theme } from "../../theme";

interface DocumentScannerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDocumentSaved?: (doc: any) => void;
}

export const DocumentScanner: React.FC<DocumentScannerProps> = ({
    open,
    onOpenChange,
    onDocumentSaved,
}) => {
    if (!open) return null;

    return (
        <Modal
            visible={open}
            transparent
            animationType="fade"
            onRequestClose={() => onOpenChange(false)}
        >
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => onOpenChange(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>

                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerTitleRow}>
                            <Camera size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
                            <Text style={styles.headerTitle}>Scan Document</Text>
                        </View>
                        <Pressable onPress={() => onOpenChange(false)} hitSlop={8}>
                            <X size={20} color={theme.colors.mutedForeground} />
                        </Pressable>
                    </View>

                    <View style={styles.dashedContainer}>
                        <View style={styles.iconCircle}>
                            <Camera size={32} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.captureTitle}>Capture or Upload</Text>
                        <Text style={styles.captureDesc}>
                            Take a photo of your document or upload an existing image
                        </Text>

                        <View style={styles.buttonsRow}>
                            <Pressable
                                style={styles.actionButton}
                                onPress={() => {
                                    // Handle Camera
                                    onOpenChange(false);
                                }}
                            >
                                <Camera size={24} color={theme.colors.foreground} style={{ marginBottom: 8 }} />
                                <Text style={styles.actionBtnText}>Camera</Text>
                            </Pressable>

                            <Pressable
                                style={styles.actionButton}
                                onPress={() => {
                                    // Handle Upload
                                    onOpenChange(false);
                                }}
                            >
                                <Upload size={24} color={theme.colors.foreground} style={{ marginBottom: 8 }} />
                                <Text style={styles.actionBtnText}>Upload</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.ocrInfoBox}>
                        <FileText size={20} color="#3b82f6" style={{ marginRight: 12, marginTop: 2 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.ocrTitle}>OCR Powered Scanning</Text>
                            <Text style={styles.ocrDesc}>
                                Automatically extracts warranty dates, bill amounts, and expiry information from your documents.
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    contentContainer: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    headerTitleRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: theme.colors.foreground,
    },
    dashedContainer: {
        borderWidth: 2,
        borderColor: "#cbd5e1", // slate-300
        borderStyle: "dashed",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        backgroundColor: "#f0f9ff", // light blue background
        marginBottom: 20,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#dbeafe",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    captureTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: theme.colors.foreground,
        marginBottom: 8,
        textAlign: 'center',
    },
    captureDesc: {
        textAlign: "center",
        color: theme.colors.mutedForeground,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    buttonsRow: {
        flexDirection: "row",
        gap: 16,
        width: "100%",
    },
    actionButton: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    actionBtnText: {
        fontWeight: "600",
        color: theme.colors.foreground,
        fontSize: 14,
    },
    ocrInfoBox: {
        flexDirection: "row",
        backgroundColor: "#eff6ff", // blue-50
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#dbeafe",
    },
    ocrTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e3a8a", // blue-900
        marginBottom: 4,
    },
    ocrDesc: {
        fontSize: 12,
        color: "#64748b", // slate-500
        lineHeight: 18,
    },
});
