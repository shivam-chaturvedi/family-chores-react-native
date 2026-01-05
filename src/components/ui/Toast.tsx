import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { theme } from "../../theme";

type ToastType = "default" | "success" | "warning" | "danger";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
}

interface ToastContextValue {
  showToast: (toast: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = (toast: ToastMessage) => {
    setMessages((prev) => [...prev, toast]);
  };

  useEffect(() => {
    if (!messages.length) return;
    const timer = setTimeout(() => {
      setMessages((prev) => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {messages.map((toast) => (
        <ToastBubble key={toast.id} message={toast} />
      ))}
    </ToastContext.Provider>
  );
};

const ToastBubble: React.FC<{ message: ToastMessage }> = ({ message }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const toastColor = {
    default: theme.colors.background,
    success: theme.colors.success,
    warning: theme.colors.info,
    danger: theme.colors.primary,
  }[message.type || "default"];

  return (
    <Animated.View style={[styles.toast, { opacity, backgroundColor: toastColor }]}>
      <Text style={styles.title}>{message.title}</Text>
      {message.description && (
        <Text style={styles.description}>{message.description}</Text>
      )}
    </Animated.View>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 80,
    left: 16,
    right: 16,
    padding: theme.spacing.md,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    color: "#fff",
    fontSize: 12,
  },
});
