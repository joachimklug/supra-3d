import Axis from "@/components/dashboard/Axis";
import BedTemp from "@/components/dashboard/BedTemp";
import JobStatus from "@/components/dashboard/JobStatus";
import NozzleTemp from "@/components/dashboard/NozzleTemp";
import { flexColumn } from "@/utils/commonStyles";
import { cloneElement } from "react";
import { StyleSheet } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export default function Dashboard() {
  return (
    <FlatGrid
      itemDimension={160}
      data={[
        <JobStatus key="JobStatus" />,
        <NozzleTemp key="NozzleTemp" />,
        <BedTemp key="BedTemp" />,
        <Axis axis="x" key="xAxis" />,
        <Axis axis="y" key="yAxis" />,
        <Axis axis="z" key="zAxis" />,
      ]}
      renderItem={({ item }) => cloneElement(item, { itemStyles: styles.item })}
      spacing={2 * 8}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: "white",
    borderRadius: 8,
    borderWidth: 0.8,
    padding: 2 * 8,
    ...flexColumn,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
});
