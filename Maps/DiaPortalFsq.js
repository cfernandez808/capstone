import React from "react";
import {
  Portal,
  Dialog,
  Button,
  Paragraph,
} from 'react-native-paper';

const DiaPortalFsq = (props) => {
  const {bus, address, handleVis, city, st} = props
  return (
    <Portal>
      <Dialog visible={bus.visible} onDismiss={() => handleVis(bus)}>
        <Dialog.Title>{bus.name}</Dialog.Title>
        <Dialog.Content>
          {
            address && city && st ?
            <Paragraph>Business at {`${address}`}, {`${city}`, `${st}`}</Paragraph> :
            city ? <Paragraph>Business in {`${city}`, `${st}`}</Paragraph> :
            <Paragraph>Business in {`${st}`}</Paragraph>
          }
          <Paragraph>
            This business is not apart of the Big Brother Ecosystem, have them sign up for free to help your country!
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => handleVis(bus)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

  )
}
export default DiaPortalFsq;
