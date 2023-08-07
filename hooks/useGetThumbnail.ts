import { File } from "@/models/Files";
import { fetchWithKey } from "@/services/withKeys";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useGetThumbnail = (thumbnailRef: File["refs"]["thumbnail"]) => {
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

  return { image, hasThumbnail, isFetching };
};
