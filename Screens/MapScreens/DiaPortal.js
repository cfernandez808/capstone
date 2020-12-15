import React from "react";
import {
  Portal,
  Dialog,
  Button,
  Paragraph
} from 'react-native-paper';

//
const DiaPortal = (props) => {
  const {bus, handleVis} = props
  return (
    <Portal>
      <Dialog visible={bus.visible} onDismiss={() => handleVis(bus)}>
        <Dialog.Title>{bus.name}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{bus.name} has had {bus.cases} Cases Reported in the last 4 weeks!</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => handleVis(bus)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default DiaPortal;
