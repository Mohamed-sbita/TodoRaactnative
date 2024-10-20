import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TasksContext } from '../TasksContext';  

export default function EnCoursTasks({ navigation }) {
  const { tasks } = useContext(TasksContext);  
  const filteredTasks = tasks.filter(task => task.etat === 'En test');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Tâches En test</Text>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.title}>{task.title}</Text>
            <Text>{task.description}</Text>
            <Text style={styles.etat}>{`État: ${task.etat}`}</Text>
            <Text>{`Catégorie: ${task.category}`}</Text>
            <Text>{`Date: ${task.date}`}</Text>
            <Text>{`Heure: ${task.heure}`}</Text>
          </View>
        ))
      ) : (
        <Text>Aucune tâche En test disponible.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    paddingTop: 60,
  },
  backArrow: {
    marginBottom: 20,
  },
  backArrowText: {
    fontSize: 40,
    color: '#2980b9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  etat: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginTop: 5,
  },
});
