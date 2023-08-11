import { AvoidKeyboard } from "@/components/AvoidKeyboard";
import Printer from "@/components/settings/Printer";
import { useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

export default function Settings() {
  const [printerOpen, setPrinterOpen] = useState(true);

  return (
    <AvoidKeyboard>
      <ScrollView>
        <List.Accordion
          title="Printer"
          left={(props) => <List.Icon {...props} icon="printer-3d-nozzle-outline" />}
          expanded={printerOpen}
          onPress={() => setPrinterOpen((isOpen) => !isOpen)}
        >
          <Printer />
        </List.Accordion>
        <List.Accordion title="Dashboard" left={(props) => <List.Icon {...props} icon="view-dashboard" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion title="Support" left={(props) => <List.Icon {...props} icon="lifebuoy" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </ScrollView>
    </AvoidKeyboard>
  );
}
