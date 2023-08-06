import { View } from "@/components/Themed";
import { File } from "@/models/Files";
import { fetchWithKey } from "@/services/withKeys";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Dimensions } from "react-native";
import { useQuery } from "react-query";

interface Props {
  thumbnailRef: File["refs"]["thumbnail"];
  horizontalPadding?: number;
}

export const FileImage = ({ thumbnailRef, horizontalPadding = 0 }: Props): JSX.Element | null => {
  const windowWidth = Dimensions.get("window").width;
  const [image, setImage] = useState<string>("");
  const hasThumbnail = Boolean(thumbnailRef);
  const { data: thumbnail, isFetching } = useQuery(
    "getThumbnail",
    () => fetchWithKey<Blob>(thumbnailRef ?? "", "blob"),
    { enabled: hasThumbnail },
  );
  const styles = stylesWithProps((windowWidth - 2 * horizontalPadding * 8) / 160);

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
  ) : (
    <Image source={require("../../assets/images/thumbnail.png")} style={styles.image} />
  );
};

const stylesWithProps = (sizeFactor: number) =>
  StyleSheet.create({
    image: {
      width: 160 * sizeFactor,
      height: 120 * sizeFactor,
      alignSelf: "center",
      borderRadius: 8,
    },
    imageContainer: {
      borderWidth: 0.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
