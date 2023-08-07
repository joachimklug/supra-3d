import { View } from "@/components/Themed";
import { useGetThumbnail } from "@/hooks/useGetThumbnail";
import { File } from "@/models/Files";
import { ActivityIndicator, Dimensions, Image, StyleSheet } from "react-native";

interface Props {
  thumbnailRef: File["refs"]["thumbnail"];
  horizontalPadding?: number;
}

export const FileImage = ({ thumbnailRef, horizontalPadding = 0 }: Props): JSX.Element | null => {
  const windowWidth = Dimensions.get("window").width;
  const styles = stylesWithProps((windowWidth - 2 * horizontalPadding * 8) / 160);
  const { image, hasThumbnail, isFetching } = useGetThumbnail(thumbnailRef);

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
