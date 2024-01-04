import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import Issue from "./components/Issue";

export default function App() {
  const [issue, setIssue] = useState();
  const [issues, setIssues] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2 seconds
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
      setSplashVisible(false);
    };

    const timer = setTimeout(() => {
      hideSplash();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAddIssue = () => {
    Keyboard.dismiss();
    if (issue && issue.trim() !== "") {
      if (editingIndex !== null) {
        // Editing existing issue
        const updatedIssues = [...issues];
        updatedIssues[editingIndex] = issue;
        setIssues(updatedIssues);
        setEditingIndex(null);
      } else {
        // Adding new issue
        setIssues([...issues, issue]);
      }
      setIssue("");
    }
  };

  const handleDeleteIssue = (index) => {
    // Show an alert for confirmation
    Alert.alert("Delete Issue", "Are you sure you want to delete this issue?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          let newIssues = [...issues];
          newIssues.splice(index, 1);

          setIssues(newIssues);
          setEditingIndex(null); // Reset editingIndex when deleting an issue
          setIssue(""); // Delete content from text input if it exists
        },
        style: "destructive",
      },
    ]);
  };

  const handleEditIssue = (index) => {
    setIssue(issues[index]);
    setEditingIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity>
      <Issue
        text={item}
        onDelete={() => handleDeleteIssue(index)}
        onEdit={() => handleEditIssue(index)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isSplashVisible && (
        <View style={styles.splashContainer}>
          {/* Your splash screen content goes here */}
          <Text style={styles.splashText}>Issues Logger©</Text>
          <Octicons name="issue-closed" size={30} color="green" />
          <Text style={styles.splashMiniText}>A Zamara™ Product </Text>
        </View>
      )}
      {!isSplashVisible && (
        <>
          <View style={styles.issuesWrapper}>
            <Text style={styles.sectionTitle}>Issues Logger</Text>

            {issues.length === 0 ? (
              <Text style={styles.noIssuesText}>No issues logged!!!</Text>
            ) : (
              <FlatList
                data={issues}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>

          {/* add an issue */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeIssueWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder={"Add an Issue..."}
              value={issue}
              onChangeText={(text) => setIssue(text)}
              multiline
            />
            <TouchableOpacity onPress={() => handleAddIssue()}>
              <View style={styles.addWrapper}>
                <FontAwesome name="plus" size={24} color="green" />
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    padding: 10,
    marginTop: 10,
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8EAED",
  },
  splashText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  splashMiniText: {
    fontSize: 14,
    margin: 10,
  },
  issuesWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  issues: { marginTop: 30 },
  writeIssueWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  noIssuesText: {
    fontSize: 16,
    color: "crimson",
    textAlign: "center",
    marginVertical: 200,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
