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
      <Text style={styles.title}>📊 Task Completion Overview</Text>
      {days.length === 0 ? (
        <Text style={styles.noData}>No data to display</Text>
      ) : (
        <View style={styles.card}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              data={data}
              width={days.length * 90}
              height={260}
              
              showValuesOnTopOfBars
              yAxisSuffix="%"
              style={styles.chart}
              chartConfig={{
                backgroundGradientFrom: "#f8faff",
                backgroundGradientTo: "#f8faff",
                color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                labelColor: () => "#555",
                decimalPlaces: 0,
                propsForVerticalLabels: { fontSize: 12 },
                propsForBackgroundLines: { strokeDasharray: "3", stroke: "#ddd" },
              }}
              verticalLabelRotation={20}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f0f4f8" 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 15, 
    textAlign: "center", 
    color: "#2c3e50" 
  },
  noData: { 
    textAlign: "center", 
    marginTop: 50, 
    fontSize: 16, 
    color: "#999" 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  },
});
