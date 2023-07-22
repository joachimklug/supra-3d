import { defaultNavDark, defaultNavLight, defaultTextDark, defaultTextLight } from "@/supra-components/Themed";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "light" ? defaultTextDark : defaultTextLight,
        tabBarActiveBackgroundColor: colorScheme === "light" ? defaultNavLight : defaultNavDark,
        tabBarInactiveBackgroundColor: colorScheme === "light" ? defaultNavLight : defaultNavDark,
        headerStyle: { backgroundColor: colorScheme === "light" ? defaultNavLight : defaultNavDark },
        headerTintColor: colorScheme === "light" ? defaultTextDark : defaultTextLight,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={colorScheme === "light" ? defaultTextDark : defaultTextLight}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
