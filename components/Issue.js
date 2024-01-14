import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, Octicons } from "@expo/vector-icons";
const Issue = ({ id, text, createdDate, onDelete, onEdit }) => {
  return (
    <>
      <Text style={styles.itemHeader}>
        <Text style={styles.itemPrefix}>Issue #</Text>: {id}
      </Text>
      <Text style={styles.itemCreatedDate}>
        <Text style={styles.itemPrefix}>Created on</Text>: {createdDate}
      </Text>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          {/* <TouchableOpacity style={styles.square}></TouchableOpacity> */}
          <Octicons
            name="issue-opened"
            size={24}
            color="green"
            style={styles.square}
          />
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onEdit} style={styles.button}>
            <FontAwesome name="edit" size={24} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Issue;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemPrefix: { fontFamily: "SpaceMono-Bold" },
  itemHeader: { fontFamily: "SpaceMono-Regular", overflow: "hidden", marginTop: 10 },
  itemCreatedDate: { marginVertical: 10 },
  itemText: { fontFamily: "SpaceMono-Regular", maxWidth: "70%", overflow: "hidden" },
  square: {
    marginRight: 15,
    paddingHorizontal: 5,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  button: { marginRight: 20 },
  delete: {
    color: "red",
  },
});
