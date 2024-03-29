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
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import {
  FontAwesome,
  Octicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import Issue from "../components/Issue";
import { auth } from "../firebase";

const API_ENDPOINT =
  "https://crudcrud.com/api/0745a5df504d4ca0a45b44995d953ebf/issues";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);

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

  const fetchIssues = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setIssues(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleAddIssue = async () => {
    Keyboard.dismiss();
    if (!issue) {
      Alert.alert("Error", "Please enter an issue before adding.");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: issue,
          createdDate:
            new Date().toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }) +
            ", " +
            new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
        }),
      });

      const data = await response.json();
      setIssues([...issues, data]);
      setIssue(""); // Clear input field after adding issue
    } catch (error) {
      console.error("Error adding issue:", error);
    }
  };

  // Update operation
  const handleEditIssue = async (id, index) => {
    setIssue(issues[index].text);
    setEditingIndex(index);
  };

  const handleUpdateIssue = async () => {
    Keyboard.dismiss();
    if (!issue) {
      Alert.alert("Error", "Cannot update with blank info.");
      return;
    }

    if (editingIndex === null) {
      Alert.alert("Error", "No issue selected for editing.");
      return;
    }

    try {
      const updatedIssues = [...issues];
      updatedIssues[editingIndex].text = issue;

      await fetch(`${API_ENDPOINT}/${issues[editingIndex]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: issue }),
      });

      setIssues(updatedIssues);
      setIssue("");
      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  const handleDeleteIssue = async (id) => {
    Alert.alert("Delete Issue", "Are you sure you want to delete this issue?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await fetch(`${API_ENDPOINT}/${id}`, {
              method: "DELETE",
            });

            const updatedIssues = issues.filter((item) => item._id !== id);
            setIssues(updatedIssues);
          } catch (error) {
            console.error("Error deleting issue:", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert.log(error);
      });
  };

  const renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity>
        <Issue
          id={item._id}
          text={item.text}
          createdDate={item.createdDate}
          onDelete={() => handleDeleteIssue(item._id)}
          onEdit={() => handleEditIssue(item._id, index)}
        />
      </TouchableOpacity>
      {index !== issues.length - 1 && <View style={styles.divider} />}
    </View>
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
            <Text style={styles.sectionTitle}>Issues Logger 🎯</Text>
            <View style={styles.issuesUserDetails}>
              <Text style={{fontFamily: "SpaceMono-Regular"}}>
                <Entypo name="email" size={12} color="black" />:{" "}
                {auth.currentUser?.email}
              </Text>
              <TouchableOpacity onPress={handleSignOut}>
                <MaterialIcons name="logout" size={24} color="#af0000" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {isLoading ? ( // Render a spinner while data is being fetched
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {issues.length === 0 ? (
                  <Text style={styles.noIssuesText}>No issues logged 🙁</Text>
                ) : (
                  <FlatList
                    data={issues}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </>
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
            {editingIndex === null ? (
              <TouchableOpacity onPress={handleAddIssue}>
                <View style={styles.addWrapper}>
                  <FontAwesome name="plus" size={24} color="green" />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleUpdateIssue}>
                <View style={styles.addWrapper}>
                  <FontAwesome name="edit" size={24} color="blue" />
                </View>
              </TouchableOpacity>
            )}
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
    // marginTop: 10,
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8EAED",
  },
  splashText: {
    fontSize: 36,
    fontFamily: "SpaceMono-Regular",
  },
  splashMiniText: {
    fontFamily: "SpaceMono-Regular",
    fontSize: 14,
    margin: 10,
  },
  issuesWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "SpaceMono-Regular",
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
    fontFamily: "SpaceMono-Regular",
    fontSize: 16,
    color: "crimson",
    textAlign: "center",
    marginVertical: 200,
  },
  input: {
    fontFamily: "SpaceMono-Regular",
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
  divider: {
    height: 2,
    backgroundColor: "#C0C0C0",
    marginVertical: 10,
  },
  issuesUserDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
