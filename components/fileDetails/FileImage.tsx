import { View } from "@/components/Themed";
import { File } from "@/models/Files";
import { fetchWithKey } from "@/services/withKeys";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { useQuery } from "react-query";

interface Props {
  thumbnailRef: File["refs"]["thumbnail"];
}

export const FileImage = ({ thumbnailRef }: Props): JSX.Element | null => {
  const [image, setImage] = useState<string>("");
  const hasThumbnail = Boolean(thumbnailRef);
  const { data: thumbnail, isFetching } = useQuery(
    "getThumbnail",
    () => fetchWithKey<Blob>(thumbnailRef ?? "", "blob"),
    { enabled: hasThumbnail },
  );

  useEffect(() => {
    if (thumbnail) {
      setImage(URL.createObjectURL(thumbnail));
    }
  }, [thumbnail]);

  return hasThumbnail ? (
    isFetching || !image ? (
      <View style={[styles.image, styles.imageContainer]}>
        <ActivityIndicator />
      </View>
    ) : (
      <Image source={{ uri: image }} style={styles.image} />
    )
  ) : null;
};

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 120,
    alignSelf: "center",
  },
  imageContainer: {
    borderWidth: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
