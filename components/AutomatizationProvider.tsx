import { useIsOnline } from "@/hooks/useIsOnline";
import { PropsWithChildren } from "react";

export const AutomatizationProvider = ({ children }: PropsWithChildren) => {
  useIsOnline();

  return children;
};
