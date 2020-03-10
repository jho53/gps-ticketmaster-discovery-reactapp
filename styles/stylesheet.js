import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ecf0f1",
    flex: 1
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
    paddingHorizontal: 10
  },
  optionStyle: {
    flex: 2,
    backgroundColor: "white",
    height: 20,
    margin: 5,
    borderRadius: 180
  },
  /** Event Details */
  eventTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginHorizontal: 5,
    marginVertical: 15
  },
  iconText: {
    alignSelf: "center"
  },
  buttonStyle: {
    backgroundColor: "#019CDE",
    height: 40,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 180
  }
});
