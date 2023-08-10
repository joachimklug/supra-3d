import { useGetThumbnail } from "@/hooks/useGetThumbnail";
import { fetchFilesAndFolders } from "@/services/files";
import { fetchCurrentJob } from "@/services/job";
import { findFileByPath } from "@/utils/findFiles";
import { router } from "expo-router";
import { Image, StyleProp, TouchableOpacity, ViewStyle, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { View } from "../Themed";

const sizeFactor = 1;

interface Props {
  itemStyles?: StyleProp<ViewStyle>;
}

export default function JobImage({ itemStyles }: Props) {
  const { data: job, isLoading: isLoadingJob } = useQuery("fetchCurrentJob", fetchCurrentJob, { enabled: false });
  const { data: files = [], isLoading: isLoadingFiles } = useQuery("fetchFilesAndFolders", fetchFilesAndFolders);
  const file = findFileByPath(files, job?.job.file.path ?? "");
  const { image } = useGetThumbnail(file?.refs.thumbnail ?? "");
  const showPlaceholder = (!file?.refs.thumbnail && !isLoadingFiles && !isLoadingJob) || !file;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(showPlaceholder ? { pathname: "/Files" } : { pathname: "/FileDetails", params: { id: file.id } })
      }
      style={{ flex: 1 }}
    >
      <View style={[itemStyles, styles.imageContainer]}>
        <Image
          source={showPlaceholder ? require("../../assets/images/thumbnail.png") : { uri: image }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 0,
    backgroundColor: "#585858",
  },
  image: {
    width: 160 * sizeFactor,
    height: 120 * sizeFactor,
  },
});
