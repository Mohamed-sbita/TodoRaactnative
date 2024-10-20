import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { TasksContext } from '../TasksContext';  
const EditTask = ({ route, navigation }) => {
  const { task } = route.params;  
  const { tasks, setTasks } = useContext(TasksContext);  
  
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [etat, setEtat] = useState(task.etat);
  const [category, setCategory] = useState(task.category);

  const handleUpdateTask = () => {
    if (title && description) {
      const updatedTask = {
        id: task.id, 
        title,
        description,
        etat,
        date: task.date, 
        heure: task.heure,
        category,
      };
  
    
      const taskIndex = tasks.findIndex(t => t.id === task.id);
  
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks]; 
        updatedTasks[taskIndex] = updatedTask;  

        
        setTasks(updatedTasks);

        
        navigation.navigate('TaskDetails', { task: updatedTask });
      } else {
        Alert.alert('Error', 'Task not found');
      }
    } else {
      Alert.alert('Error', 'Veuillez remplir tous les champs');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modifier la Tâche</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre de la tâche"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Picker
        selectedValue={etat}
        style={styles.picker}
        onValueChange={(itemValue) => setEtat(itemValue)}
      >
        <Picker.Item label="Nouveau" value="Nouveau" />
        <Picker.Item label="Approuvé" value="Approuvé" />
        <Picker.Item label="En cours" value="En cours" />
        <Picker.Item label="Prête" value="Prête" />
        <Picker.Item label="En test" value="En test" />
        <Picker.Item label="Terminé" value="Terminé" />
      </Picker>

      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Catégorie A" value="A" />
        <Picker.Item label="Catégorie B" value="B" />
        <Picker.Item label="Catégorie C" value="C" />
      </Picker>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTask}>
        <Text style={styles.updateButtonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditTask;
