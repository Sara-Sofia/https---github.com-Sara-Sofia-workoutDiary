import React, { useContext, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Card, Chip, Icon, Text } from "react-native-paper";
import Styles from "../style/Styles";
import { UnitSelectionContext, WorkOutContext } from "./Contexts";

// Function to convert kilometers to miles when needed:
function convertToMiles(kilometers) {
  return kilometers / 1.60934;
}

export default function Exercises() {

  const { workouts } = useContext(WorkOutContext);
  const { units } = useContext(UnitSelectionContext);

  // Function for calculating the sum of distances for each activity:
  const calculateDistanceSum = (activity) => {
    const filteredWorkouts = workouts.filter((workout) => workout.selection === activity);
    let sum = 0;

    // Converting the sums of distances to miles if units are miles:
    filteredWorkouts.forEach((workout) => {
      const distance = units === 'miles' ? convertToMiles(parseFloat(workout.distance)) : parseFloat(workout.distance);
      sum += distance;
    });

    return sum;
  };

  // Everytime workouts or units change calculate and set the sums for activities:
  const [distanceSums, setDistanceSums] = useState({});

  useEffect(() => {
    const uniqueActivities = [...new Set(workouts.map((workout) => workout.selection))];
    const sums = {};

    uniqueActivities.forEach((activity) => {
      sums[activity] = calculateDistanceSum(activity);
    });

    setDistanceSums(sums);
  }, [workouts, units]);

  return (
    <View style={Styles.exerciseContainer}>
      <Text variant='headlineSmall' style={Styles.headlines}>Exercise History</Text>
      <View style={Styles.chip}>
        <Chip icon='walk' textStyle={{ fontSize: 15 }}>
          {Number(distanceSums['0']).toFixed(2) + ' ' + units}
        </Chip>
        <Chip icon='bike' textStyle={{ fontSize: 15 }}>
          {Number(distanceSums['1']).toFixed(2) + ' ' + units}
        </Chip>
        <Chip icon='horse' textStyle={{ fontSize: 15 }}>
          {Number(distanceSums['2']).toFixed(2) + ' ' + units}
        </Chip>
      </View>
      <FlatList data={workouts} renderItem={({ item }) => <Item workout={item} units={units} />} />
    </View>
  );
}

function Item({ workout, units }) {

  // Convert added workouts single distance if units are miles. Proceed without converting if they are km:
  const distance = units === 'km' ? parseFloat(workout.distance) : convertToMiles(parseFloat(workout.distance));

  return (
    <Card mode="elevated" style={Styles.card}>
      <Card.Content>
        <View>
          <View style={Styles.cardContentIcons}>
            <Icon source={workout.icon} size={30} />
          </View>
          <Text variant="bodyMedium" style={Styles.text}>{'Date: ' + workout.date}</Text>
        </View>
        <Text variant="bodyMedium" style={Styles.text}>
          {'Distance: ' + Number(distance).toFixed(2) + ' ' + units}
        </Text>
        <Text variant="bodyMedium" style={Styles.text}>
          {'Duration: ' + workout.duration + ' (minutes)'}
        </Text>
      </Card.Content>
    </Card>

  );
}
