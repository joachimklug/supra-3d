import { Button, FormControl, Input, AddIcon } from "@/components";
import { Box } from "../Themed";

export default function Printer() {
  return (
    <Box>
      <FormControl size="md">
        <FormControl.Label mb="$1">
          <FormControl.Label.Text>Hostname</FormControl.Label.Text>
        </FormControl.Label>
        <Input>
          <Input.Input type="text" defaultValue="" placeholder="" />
        </Input>
        <FormControl.Helper>
          <FormControl.Helper.Text>Hostname or IP address</FormControl.Helper.Text>
        </FormControl.Helper>
      </FormControl>
      <FormControl size="md" mt="$4">
        <FormControl.Label mb="$1">
          <FormControl.Label.Text>API Key</FormControl.Label.Text>
        </FormControl.Label>
        <Input>
          <Input.Input type="text" defaultValue="" placeholder="" />
        </Input>
        <FormControl.Helper>
          <FormControl.Helper.Text>API key can be found in Prusa connect under settings</FormControl.Helper.Text>
        </FormControl.Helper>
      </FormControl>
      <Button mt="$4" variant="outline">
        <Button.Text>Add </Button.Text>
        <Button.Icon as={AddIcon} />
      </Button>
    </Box>
  );
}
