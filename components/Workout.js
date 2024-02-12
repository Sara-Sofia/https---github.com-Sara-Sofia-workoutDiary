import { useContext, useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, Modal, SegmentedButtons, Text, TextInput } from "react-native-paper";
import Styles from "../style/Styles";
import { UnitSelectionContext, WorkOutContext } from "./Contexts";


// Segmentet buttons:

const buttons = [
    {label: 'Walk', icon: 'walk', value: 0},
    {label: 'Cycle', icon: 'bike', value: 1},
    {label: 'Ride', icon: 'horse', value: 2},
  ]

export default function Workout () {

    const {setWorkouts} = useContext(WorkOutContext);
    const {units, setUnits} = useContext(UnitSelectionContext);

    const [selection, setSelection] = useState(buttons[0].value);
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState();
    const [duration, setDuration] = useState();
    const [distance, setDistance] = useState();

    // predefined workouts for the list to exist when opening application:
    const defaultWorkouts = [
      { distance: 2, units: 'km', duration: 30, selection: 0 , icon: 'walk', date: '2024-01-01' },
      { distance: 5, units: 'km', duration: 45, selection: 1 , icon: 'bike', date: '2023-03-03'}, 
      {distance: 5, units: 'km',  duration: 20, selection: 2, icon: 'horse', date: '2024-01-20'}
    ];

    useEffect(() => {
  
      setWorkouts((prev) => [...prev, ...defaultWorkouts]);
    }, []); 

    // Defining that units are by default km:
    useEffect(() => {
      setUnits('km');
    }, [setUnits]);

    // Handling selected day from the calendar:
    function dateSelected(day){
      setVisible(false);
      setDate(day);
    }

    function addWorkout () {

      // is value given for duration and distance a number:
      if (isNaN(duration) || isNaN(distance)) {

        Alert.alert('Error', 'Please enter a valid numeric value');

      // Date is picked:
      } else if (date === null || date === undefined){

        Alert.alert('Please select a date');

      } else {

      // saving wanted information to context so we can use it later:

        setDuration(duration)
        setDistance(distance)
        setWorkouts( prev => [...prev, {distance, duration, selection, date: date.dateString, icon: buttons.find(b => b.value === selection)?.icon, units}]);
      }

      // Empty inputs and date selection after:

        setDuration('');
        setDistance('');
        setDate(null);
  }
  
  return(
    
  <View style={Styles.container}>
    <Text variant='headlineSmall' style={Styles.headlines}>Add workouts</Text>
    <SegmentedButtons
      value={selection}
      onValueChange={setSelection}
      buttons={buttons}
    />
    <TextInput 
      style={Styles.textInputs}
      mode='outlined'
      label={'Distance (km)'}
      keyboardType='numeric'
      outlineColor='#164863'
      activeOutlineColor='#427D9D'
      onChangeText={setDistance}
      value={distance}
    />
    <TextInput
      style={Styles.textInputs}
      mode='outlined'
      label='Duration (minutes)'
      keyboardType='numeric'
      outlineColor="#164863"
      activeOutlineColor='#427D9D'
      onChangeText={setDuration}
      value={duration}
    />
    <Modal visible={visible} transparent={true} onDismiss={() => setVisible(false)} contentContainerStyle={Styles.modalContainer}>
      <Calendar onDayPress={dateSelected} style={Styles.calendar}/>
    </Modal>
    <Pressable style={Styles.buttons} onPress={()=>setVisible(true)}>
      <Text style={Styles.date}>{date ? date.dateString: 'SELECT DATE'}</Text>
    </Pressable>
    <Button style={Styles.buttons} mode='contained' buttonColor='#9BBEC8' labelStyle={{fontWeight: 'bold', fontSize: 15}} onPress={addWorkout}>ADD WORKOUT</Button>
  </View>
  )
  }