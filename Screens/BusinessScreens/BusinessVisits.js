import React from "react";
import { View, Text, TouchableOpacity } from "react-native"

const BusinessVisitors = ({ navigation, route }) => {
  const { visits } = route.params;
  console.log("what are the visits", visits)

const handlePress = ((customerID) => {
    navigation.navigate("Visitor Profile", { customerID })
  })

  return (<View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
    { !visits.length ?
    <Text> You have no visits yet </Text> :
    visits.map((visit) => {
      return <TouchableOpacity key={visit.id} onPress={() => handlePress(visit.customerID)}>
        <Text>{`visit at ${visit.createdAt}, ${visit.hasSymptom} symptoms`}</Text>
      </TouchableOpacity>
    })}
    </View>
  );
}

export default BusinessVisitors;
