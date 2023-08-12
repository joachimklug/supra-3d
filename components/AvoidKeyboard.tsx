import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from "react-native";

interface Props extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const AvoidKeyboard = ({ children, style }: Props) => (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={style}>
    {children}
  </KeyboardAvoidingView>
);
