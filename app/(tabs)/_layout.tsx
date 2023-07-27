import { Header } from "@/components/Header";
import Colors from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
          headerRight: (props) => <Header {...props} />,
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
