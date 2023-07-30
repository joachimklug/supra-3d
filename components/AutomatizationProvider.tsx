import { useIsOnline } from "@/hooks/useIsOnline";
import { fetchPrinter } from "@/services/printer";
import { PropsWithChildren } from "react";
import { useQuery } from "react-query";

const refetchInterval = 3_000;

export const AutomatizationProvider = ({ children }: PropsWithChildren) => {
  useQuery("settings", fetchPrinter, { refetchInterval });

  useIsOnline();

  return children;
};
