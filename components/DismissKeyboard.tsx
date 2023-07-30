import { PropsWithChildren } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboard = ({ children }: PropsWithChildren) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
    {children}
  </TouchableWithoutFeedback>
);
