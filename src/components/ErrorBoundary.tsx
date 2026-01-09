import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    resetError = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <Text style={styles.title}>Something went wrong!</Text>
                        <Text style={styles.subtitle}>
                            {this.state.error && this.state.error.toString()}
                        </Text>
                        {this.state.errorInfo && (
                            <Text style={styles.stack}>
                                {this.state.errorInfo.componentStack}
                            </Text>
                        )}
                        <TouchableOpacity style={styles.button} onPress={this.resetError}>
                            <Text style={styles.buttonText}>Try Again</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEE2E2", // Light red background
        paddingTop: 50,
    },
    scroll: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#991B1B",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#B91C1C",
        marginBottom: 20,
        fontWeight: "500",
    },
    stack: {
        fontSize: 12,
        fontFamily: "monospace",
        color: "#7F1D1D",
        backgroundColor: "rgba(255,255,255,0.5)",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#DC2626",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
