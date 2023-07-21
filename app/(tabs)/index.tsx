import { StyleSheet } from "react-native";

import EditScreenInfo from "@/supra-components/EditScreenInfo";
import { Text } from "@/components";
import { Box } from "@/supra-components/Themed";
import { config } from "@/gluestack-ui.config";

export default function TabOneScreen() {
  return (
    // <View style={styles.container}>
    <Box style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text> */}
      {/* <StyledProvider config={config.theme} colorMode={"dark"}> */}
      <Text style={styles.title}>Text not styled but glued</Text>
      {/* </StyledProvider> */}
      <Box style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </Box>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: config.theme.tokens.colors.backgroundDark950,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
