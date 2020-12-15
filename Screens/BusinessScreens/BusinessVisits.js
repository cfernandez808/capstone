import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const BusinessVisitors = ({ navigation, route }) => {
  const { visits } = route.params;
  console.log("what are the visits", visits);

  const handlePress = (customerID) => {
    navigation.navigate("Visitor Profile", { customerID });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#AAB7B8",
      }}
    >
      {!visits.length ? (
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {" "}
          You have no visits yet{" "}
        </Text>
      ) : (
        visits.map((visit) => {
          return (
            <TouchableOpacity
              key={visit.id}
              onPress={() => handlePress(visit.customerID)}
            >
              <Text style={styles.title}>{`visit at ${visit.createdAt}, ${
                visit.hasSymptom.toLowerCase().includes("no") ? "no" : "had"
              } symptoms`}</Text>
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontSize: 14,
    marginRight: 10,
    justifyContent: "center",
    height: 30,
    fontWeight: "bold",
    color: "red",
    paddingTop: 10,
  },
});
export default BusinessVisitors;
