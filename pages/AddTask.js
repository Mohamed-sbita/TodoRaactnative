import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TasksContext } from '../TasksContext'; 

export default function AddTask({ navigation }) {
  const { addTask } = useContext(TasksContext);  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [etat, setEtat] = useState('Nouveau');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [category, setCategory] = useState('A');

  const autoId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleAddTask = () => {
    if (title && description) {
      const newTask = {
        id: autoId(),
        title,
        description,
        etat,
        date: date.toLocaleDateString(),
        heure: time.toLocaleTimeString(),
        category,
      };
      addTask(newTask);
      navigation.navigate("Accueil");  
    } else {
      Alert.alert('Error', 'Veuillez remplir tous les champs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ajouter une Tâche</Text>

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

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>{`Date: ${date.toLocaleDateString()}`}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>{`Heure: ${time.toLocaleTimeString()}`}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            const currentTime = selectedTime || time;
            setShowTimePicker(false);
            setTime(currentTime);
          }}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Ajouter Tâche</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  dateInput: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#34495e',
  },
  addButton: {
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
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
