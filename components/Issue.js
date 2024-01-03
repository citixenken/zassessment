import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const Issue = ({ text, onDelete, onEdit }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
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
  itemText: { maxWidth: "70%", overflow: "hidden" },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
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
