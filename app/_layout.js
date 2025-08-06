import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function layout() {
  return (
    <Tabs

      screenOptions={{
        headerShown:false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#FAF2FC"
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 18,
          color: "grey",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (color, size) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: "graph",
          tabBarIcon: (color, size) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
