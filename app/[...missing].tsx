import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Text , Link } from "@/components";
import { Box } from "@/supra-components/Themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Box style={styles.container}>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>

        <Link style={styles.link} href="/">
          <Link.Text>Go to home screen!</Link.Text>
        </Link>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
