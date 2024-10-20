import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TasksContext } from '../TasksContext';  

export default function Accueil({ navigation }) {
  const { tasks } = useContext(TasksContext);  
  const [taskCounts, setTaskCounts] = useState({});

  const getTaskCountByEtat = (etat) => {
    return tasks.filter(task => task.etat === etat).length;
  };

  useFocusEffect(
    React.useCallback(() => {
      const counts = {
        Nouveau: getTaskCountByEtat('Nouveau'),
        Approuvé: getTaskCountByEtat('Approuvé'),
        'En cours': getTaskCountByEtat('En cours'),
        Prête: getTaskCountByEtat('Prête'),
        'En test': getTaskCountByEtat('En test'),
        Terminé: getTaskCountByEtat('Terminé'),
      };
      setTaskCounts(counts);
    }, [tasks])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ToDo App</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.fullWidthButton]}
          onPress={() => navigation.navigate('TaskList', { etat: 'Toutes' })}
        >
          <Text style={styles.buttonText}>Tous les Tâches ({tasks.length})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NvTask', { etat: 'Nouveau' })}>
          <Text style={styles.buttonText}>Nouveau ({taskCounts.Nouveau })</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Approuve', { etat: 'Approuvé' })}>
          <Text style={styles.buttonText}>Approuv ({taskCounts.Approuvé})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnCours', { etat: 'En cours' })}>
          <Text style={styles.buttonText}>En cours ({taskCounts['En cours']})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Prete', { etat: 'Prête' })}>
          <Text style={styles.buttonText}>Prête ({taskCounts.Prête})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnTest', { etat: 'En test' })}>
          <Text style={styles.buttonText}>En test ({taskCounts['En test']})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Termine', { etat: 'Terminé' })}>
          <Text style={styles.buttonText}>Terminé ({taskCounts.Terminé})</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 130,
    height: 50,
  },
  fullWidthButton: {
    width: 270,
    marginHorizontal: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
