import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ecf0f1"
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "15%"
  },
  searchNav: {
    height: 35,
    backgroundColor: "#019CDE",
    flexDirection: "row",
    justifyContent: "center"
  },
  textInputBox: {
    height: 20,
    backgroundColor: "white",
    flex: 1,
    margin: 5,
    borderRadius: 180
  },
  optionStyle: {
    flex: 1,
    backgroundColor: "white",
    height: 20,
    margin: 5,
    borderRadius: 180
  }
});
