import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Issue from "./components/Issue";

export default function App() {
  const [issue, setIssue] = useState();
  const [issues, setIssues] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddIssue = () => {
    Keyboard.dismiss();
    if (issue.trim() !== "") {
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
    let newIssues = [...issues];
    newIssues.splice(index, 1);

    setIssues(newIssues);
    setEditingIndex(null); // Reset editingIndex when deleting an issue

    setIssue(""); //delete content from text input if it exists
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
      <View style={styles.issuesWrapper}>
        <Text style={styles.sectionTitle}>Issues Logger</Text>

        <FlatList
          data={issues}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
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
  issuesWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 180,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  issues: { marginTop: 30 },
  writeIssueWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
