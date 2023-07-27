import { fetchPrinter } from "@/services/printer";
import { onlineState } from "@/state/onlineState";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

const refetchInterval = 3_000;

export const useIsOnline = (): undefined => {
  const [, setOnline] = useRecoilState(onlineState);
  const { data: printer, isError } = useQuery("settings", fetchPrinter, { refetchInterval });
  const printerError = printer?.state.flags.error ?? "true";

  useEffect(() => {
    if (isError || printerError) {
      setOnline(false);
    } else {
      setOnline(true);
    }
  }, [printerError, isError]);
};
