import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Portal, Button, Paragraph, Dialog, DataTable } from "react-native-paper"

const BusinessVisitors = ({ navigation, route }) => {
  const { currentVisits } = route.params;
  const [visible, setVisible] = useState(true);
  const [page, setPage] = useState(0);
  const visitsPerPage =  10;
  const from = page * visitsPerPage;
  const to = (page + 1) * visitsPerPage;

  const hideDialog = () => setVisible(false);

  const handlePress = ((customerID) => {
      navigation.navigate("Visitor Profile", { customerID })
    })

  return (
    <View style={styles.view}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.title}>
          {`${currentVisits.length} total visits and ${currentVisits.filter(visit => visit.hasSymptom.toLowerCase().includes('yes')).length} COVID case(s)`}
          </Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}><Paragraph style={styles.title}>OK</Paragraph></Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <DataTable>
        <DataTable.Header style={styles.dialog}>
          <DataTable.Title><Paragraph style={styles.title}>Date</Paragraph></DataTable.Title>
          <DataTable.Title><Paragraph style={styles.title}>Time</Paragraph></DataTable.Title>
          <DataTable.Title><Paragraph style={styles.title}>Symptom</Paragraph></DataTable.Title>
          <DataTable.Title><Paragraph style={styles.title}>Info</Paragraph></DataTable.Title>
        </DataTable.Header>
        { currentVisits.map(visit => {
          const dateArray = visit.createdAt.split("T");
          const date = dateArray[0];
          const time = dateArray[1].split(".")[0];
          return  <DataTable.Row key={visit.id}>
          <DataTable.Cell>{date}</DataTable.Cell>
          <DataTable.Cell>{time}</DataTable.Cell>
          <DataTable.Cell>{visit.hasSymptom.toUpperCase()}</DataTable.Cell>
          <DataTable.Cell>
            <TouchableOpacity onPress={() => handlePress(visit.customerID)}><Text>View</Text></TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
        })}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.floor(currentVisits.length / visitsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1} - ${to} of ${currentVisits.length}`}
        />
      </DataTable>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    backgroundColor: "#DBEFFB",
    height: 800,
  },
  dialog: {
    backgroundColor: "#259EE4",
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
});
export default BusinessVisitors;

