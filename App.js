import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Issue from "./components/Issue";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.issuesWrapper}>
        <Text style={styles.sectionTitle}>Issues Logger</Text>
        <View style={styles.issues}>
          <Issue />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  issuesWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  issues: { marginTop: 30 },
});
