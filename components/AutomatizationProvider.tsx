import { useIsOnline } from "@/hooks/useIsOnline";
import { fetchCurrentJob } from "@/services/job";
import { fetchPrinter } from "@/services/printer";
import { onlineState } from "@/state/onlineState";
import { PropsWithChildren } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

export const AutomatizationProvider = ({ children }: PropsWithChildren) => {
  const [online] = useRecoilState(onlineState);
  useQuery("fetchPrinter", fetchPrinter, { refetchInterval: 3_000 });
  useQuery("fetchCurrentJob", fetchCurrentJob, { refetchInterval: online ? 15_000 : 60_000 });

  useIsOnline();

  return children;
};
