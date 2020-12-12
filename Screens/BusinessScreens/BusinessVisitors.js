import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native"
import { API } from "aws-amplify";
import * as queries from '../../graphql/queries'
import { LongPressGestureHandler } from "react-native-gesture-handler";

const BusinessVisitors = ({ route }) => {
  const { visitors } = route.params;
  const [visitLogs, setVisitLogs] = useState([])

  const fetchCustomerInfo = async (visitors) => {
    try {
      const logs = await visitors.map(async (visitor) => {
        const { hasSymptom, createdAt, customerID} = visitor;
        const customer = await getCustomerWithVisits(customerID);
        console.log("who is customer", customer);
        return `${customer["firstName"]} ${customer["lastName"]}, ${hasSymptom} symptoms, visited on ${createdAt}`;
      })
      setVisitLogs(logs);
    } catch (error) {
      console.log('failed to load customers', error)
    }
  }

  useEffect(() => {
    fetchCustomerInfo(visitors);
  }, [])

  return (<View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
    { !visitors.length ?
    <Text> You have no visitors yet </Text> :
    console.log(visitLogs)}
    </View>
  );
}

export default BusinessVisitors;

//helper functions

const getCustomerWithVisits = async (customerID) => {
  try {
  const { data } = await API.graphql({ query: queries.getCustomer, variables: { id: customerID }})
  return data.getCustomer;
  } catch (error) {
    console.log("failed to get customer with visits", error);
  }
}
