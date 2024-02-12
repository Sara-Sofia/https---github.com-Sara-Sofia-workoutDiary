import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { PaperProvider, Text } from 'react-native-paper';
import { useState } from 'react';
import { UnitSelectionContext, WorkOutContext } from './components/Contexts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Workout from './components/Workout';
import Exercises from './components/Exercises';
import Settings from './components/Settings';
import { MyTheme } from './style/Styles';
import { useFonts } from 'expo-font';



export default function App() {

  const [workouts, setWorkouts] = useState([]);
  const [units, setUnits] = useState();

  let [fontsLoaded] = useFonts({
    'RussoOne': require('./assets/fonts/RussoOne-Regular.ttf'),
    // Add more fonts here if needed
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <WorkOutContext.Provider value={{workouts, setWorkouts}}>
      <UnitSelectionContext.Provider value={{units, setUnits}}>
        <PaperProvider theme={MyTheme}>
          <SafeAreaProvider>
            <Navigation/>
          </SafeAreaProvider>
        </PaperProvider>
      </UnitSelectionContext.Provider>
    </WorkOutContext.Provider>
  );
}

const Tab = createBottomTabNavigator();

function Navigation () {
  return(
     <NavigationContainer>
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#164863',
      tabBarInactiveTintColor: '#427D9D',
      tabBarLabelStyle: {fontSize: 12}
    }}
    >
      <Tab.Screen name="Workout"component={Workout}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="accessibility" color={color} size={size}/>
        ),
      }}
    />
      <Tab.Screen name="Exercises" component={Exercises} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ribbon" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Settings" component={Settings}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  </NavigationContainer>
    )
}

