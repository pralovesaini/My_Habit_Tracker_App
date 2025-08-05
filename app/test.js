import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function Test() {
  const [taskData, setTaskData] = useState([]);

  useFocusEffect(() => {
    AsyncStorage.getItem("taskData").then((data) => {
      if (data) setTaskData(JSON.parse(data));
    });
  });

  // Prepare labels and percentages
  const days = taskData.map((_, i) => `Day ${i + 1}`);
  const percentages = taskData.map((day) => {
    const total = day.length;
    const completed = day.filter((t) => t.isCompleted).length;
    return total > 0 ? (completed / total) * 100 : 0;
  });

  const data = {
    labels: days,
    datasets: [{ data: percentages }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Completion</Text>
      {days.length === 0 ? (
        <Text>No data to display</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={data}
            width={days.length * 80} // Scrollable width
            height={250}
            fromZero
            showValuesOnTopOfBars
            yAxisSuffix="%"
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: () => "#4A90E2", // Blue bars
              labelColor: () => "#333",
              decimalPlaces: 0,
            }}
            verticalLabelRotation={20}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
});
