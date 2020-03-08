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
    justifyContent: "flex-start"
  },
  textInputBox: {
    height: 20,
    backgroundColor: "white",
    flex: 3,
    margin: 5,
    borderRadius: 180,
    paddingHorizontal: 5
  },
  optionStyle: {
    flex: 2,
    backgroundColor: "white",
    height: 20,
    margin: 5,
    borderRadius: 180
  },
  buttonStyle: {
    backgroundColor: "#019CDE",
    height: 40,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 180,
  }
});
