// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




import { TasksProvider } from './TasksContext'; 
import Accueil from './pages/Accueil1';
import AddTask from './pages/AddTask';
import TaskList from './pages/TaskList';
import NvTask from './pages/NvTask';
import Prete from './pages/Prete';
import Termine from './pages/Termine';
import EnTest from './pages/EnTest'; 
import EnCours from './pages/EnCours';
import Approuve from './pages/approuve';
import TaskDetails from './pages/TaskDetails';
import EditTask from './pages/EditTask';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TasksProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Accueil" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Accueil" component={Accueil} />



          <Stack.Screen name="AddTask" component={AddTask} />
         
          {/* <Stack.Screen name="TaskList" component={TaskList} /> */}
         
          <Stack.Screen name="TaskList" component={TaskList} />
          <Stack.Screen name="NvTask" component={NvTask} />
          <Stack.Screen name="Prete" component={Prete} />
          <Stack.Screen name="Termine" component={Termine} />
          <Stack.Screen name="EnTest" component={EnTest} />
          <Stack.Screen name="EnCours" component={EnCours} />
          <Stack.Screen name="Approuve" component={Approuve} />
          <Stack.Screen name="TaskDetails" component={TaskDetails} />
          <Stack.Screen name="EditTask" component={EditTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}
