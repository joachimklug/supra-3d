import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

export const AvoidKeyboard = ({ children }: PropsWithChildren) => (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
    {children}
  </KeyboardAvoidingView>
);
