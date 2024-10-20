import React, { useContext } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TasksContext } from '../TasksContext';  

const TaskDetails = ({ route, navigation }) => {
  const { task } = route.params;  
  const { tasks ,setTasks} = useContext(TasksContext);  

  console.log(task);
  console.log(tasks);

  const handleEditTask = () => {
    navigation.navigate('EditTask', { task, tasks, setTasks});  
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('TaskList')} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Retour</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.details}>{`État: ${task.etat}`}</Text>
        <Text style={styles.details}>{`Catégorie: ${task.category}`}</Text>
        <Text style={styles.details}>{`Date: ${task.date}`}</Text>
        <Text style={styles.details}>{`Heure: ${task.heure}`}</Text>
        
       
        <TouchableOpacity onPress={handleEditTask} style={styles.editButton}>
          <Icon name="edit" size={24} color="#fff" />
          <Text style={styles.editButtonText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#2980b9",
    fontWeight: "bold",
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: "#34495e",
    marginBottom: 15,
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 5,
    textAlign: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    elevation: 3,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default TaskDetails;
