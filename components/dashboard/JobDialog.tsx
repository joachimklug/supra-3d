import { cancelCurrentJob, pauseCurrentJob } from "@/services/job";
import { fetchPrinter } from "@/services/printer";
import { Button, Dialog, Portal } from "react-native-paper";
import { useQuery } from "react-query";

interface Props {
  visible: boolean;
  hideDialog: () => void;
}

export default function JobDialog({ visible, hideDialog }: Props) {
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });
  const printerState = printer?.state.flags;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Job control</Dialog.Title>
        <Dialog.Actions>
          {printerState?.printing && !printerState?.paused ? (
            <Button onPress={pauseCurrentJob}>Pause Job</Button>
          ) : (
            <Button onPress={pauseCurrentJob}>Resume Job</Button>
          )}
          <Button onPress={cancelCurrentJob}>Cancel Job</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
