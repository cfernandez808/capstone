import React, {useState, useEffect} from "react";
import {
  Portal,
  Dialog,
  Button,
  Paragraph
} from 'react-native-paper';
import { API } from "aws-amplify";
import * as queries from '../../graphql/queries'

/* DIALOGUE BOX WRAPPED IN A PORTAL FOR OUR ECOSYSTEM'S BUSINESSES
WHICH IS TIED TO GRAPHQL AND AWS/AMPLIFY */
const DiaPortalEco = (props) => {
  const [visits, setVisits] = useState([])
  const {bus, handleVis} = props
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    loadVisits(bus.id)
  }, [])

  const loadVisits = async busId => {
    const {visits} = await getVisits(busId)
    setVisits(visits.items)
  }
  const getVisits = async busId => {
    const {data} = await API.graphql({query: queries.getBusiness, variables: {id:busId}})
    const busInfo = data.getBusiness
    return busInfo
  }
  /* CLOSING THE DIALOGUE BOX IN ANYWAY CAUSES A STATE CHANGE TO ACCOUNT FOR LIVE UPDATES TO DYNAMO BACKEND */
  const closeDialogue = () => {
    handleVis(bus)
    setIsDismissed(!isDismissed)
    console.log(isDismissed)
  }
  /* FINDS NUMBER OF INFECTED FOR AN INDIVIDUAL BUSINESS */
  const infected = visits.filter(el => el.hasSymptom.toLowerCase() === 'yes').length
  return (
    <Portal>
      <Dialog visible={bus.visible} onDismiss={() => closeDialogue()}>
        <Dialog.Title>{bus.name}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            {bus.name} at {bus.address} has had {infected} Covid-19 related cases reported recently!
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => closeDialogue()}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
export default DiaPortalEco;
