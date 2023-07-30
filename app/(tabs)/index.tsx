import BedTemp from "@/components/dashboard/BedTemp";
import NozzleTemp from "@/components/dashboard/NozzleTemp";
import { cloneElement } from "react";
import { StyleSheet } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export default function Dashboard() {
  return (
    <FlatGrid
      itemDimension={130}
      data={[<NozzleTemp key={1} />, <BedTemp key={2} />]}
      renderItem={({ item }) => cloneElement(item, { itemStyles: styles.item })}
      style={{ marginVertical: 4 * 8 }}
      spacing={2 * 8}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    padding: 2 * 8,
  },
});
