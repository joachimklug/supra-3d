import { cancelCurrentJob, fetchCurrentJob, pauseCurrentJob, startCurrentJob } from "@/services/job";
import { fetchPrinter } from "@/services/printer";
import { Button, Dialog, Portal } from "react-native-paper";
import { useQuery } from "react-query";

interface Props {
  visible: boolean;
  hideDialog: () => void;
}

export default function JobDialog({ visible, hideDialog }: Props) {
  const { data: printer } = useQuery("fetchPrinter", fetchPrinter, { enabled: false });
  const { data: currentJob } = useQuery("fetchCurrentJob", fetchCurrentJob, { enabled: false });
  const printerState = printer?.state.flags;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Job control</Dialog.Title>
        <Dialog.Actions>
          {printerState?.printing && <Button onPress={pauseCurrentJob}>Pause Job</Button>}
          {printerState?.paused && <Button onPress={pauseCurrentJob}>Resume Job</Button>}
          {printerState?.printing || (printerState?.paused && <Button onPress={cancelCurrentJob}>Cancel Job</Button>)}
          {printerState?.ready && currentJob?.job.file && <Button onPress={startCurrentJob}>Restart last Job</Button>}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
