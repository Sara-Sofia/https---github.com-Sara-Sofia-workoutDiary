import { useContext, useState } from "react";
import { Card, RadioButton, Text } from "react-native-paper";
import { UnitSelectionContext } from "./Contexts";
import { View } from "react-native";
import Styles from "../style/Styles";


export default function Settings() {

  const { setUnits } = useContext(UnitSelectionContext);
  const [checked, setChecked] = useState('km');

  // function to handle radiobuttons selection:
  function handleRadioButtons(selectedUnit) {
    setChecked(selectedUnit);
    setUnits(selectedUnit);
  }

  return (
    <View>
      <Text variant='headlineSmall' style={Styles.headlines}>Adjust Settings</Text>
      <Card mode='elevated' style={Styles.card}>
        <Card.Title title='Select units' style={Styles.text} titleStyle={{ fontWeight: 'bold', textAlign: 'center' }} />
        <Card.Content>
          <View style={Styles.radiobutton}>
            <Text style={Styles.text} >Kilometers</Text>
            <RadioButton
              uncheckedColor='#427D9D'
              color='#164863'
              value='km'
              status={checked === 'km' ? 'checked' : 'unchecked'}
              onPress={() => handleRadioButtons('km')}
            />
          </View>
          <View style={Styles.radiobutton}>
            <Text style={Styles.text} >Miles</Text>
            <RadioButton
              uncheckedColor='#427D9D'
              color='#164863'
              value='miles'
              status={checked === 'miles' ? 'checked' : 'unchecked'}
              onPress={() => handleRadioButtons('miles')}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}