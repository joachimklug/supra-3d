import Axis from "@/components/dashboard/Axis";
import BedTemp from "@/components/dashboard/BedTemp";
import JobImage from "@/components/dashboard/JobImage";
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
        <JobImage key="JobImage" />,
        <NozzleTemp key="NozzleTemp" />,
        <BedTemp key="BedTemp" />,
        <Axis axis="z" key="zAxis" />,
        <Axis axis="y" key="yAxis" />,
        <Axis axis="x" key="xAxis" />,
      ]}
      renderItem={({ item }) => cloneElement(item, { itemStyles: styles.item })}
      spacing={2 * 8}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    ...flexColumn,
    borderColor: "white",
    borderRadius: 8,
    borderWidth: 0.8,
    padding: 2 * 8,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
});
