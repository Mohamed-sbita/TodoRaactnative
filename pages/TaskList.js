import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { TasksContext } from "../TasksContext";

export default function TaskList({ navigation }) {
  const { tasks, setTasks } = useContext(TasksContext);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

 
  const filteredList = tasks.filter((task) => {
    let categoryMatch = true;
    if (selectedCategory !== "Tous") {
      categoryMatch = task.category === selectedCategory;
    }
    return categoryMatch;
  });

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setModalVisible(true);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(updatedTasks);
    console.log(`Deleted task with ID: `, taskToDelete);
    setModalVisible(false); // Close modal after deletion
  };

  const handleViewTask = (task) => {
    navigation.navigate("TaskDetails", { task });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.navigate("Accueil")}
      >
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{`Tous les tâches : `}</Text>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.filterButtonText}>
          {showFilters ? "X" : "Filters"}
        </Text>
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filterContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Tous" value="Tous" />
            <Picker.Item label="Catégorie A" value="A" />
            <Picker.Item label="Catégorie B" value="B" />
            <Picker.Item label="Catégorie C" value="C" />
          </Picker>
        </View>
      )}

      {filteredList.length > 0 ? (
        filteredList.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <View style={styles.taskDetails}>
              <Text style={styles.etat}>{`État: ${task.etat}`}</Text>
              <Text>{`Catégorie: ${task.category}`}</Text>
              <Text>{`Date: ${task.date}`}</Text>
              <Text>{`Heure: ${task.heure}`}</Text>
            </View>

            {/* Buttons container */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleViewTask(task)}
              >
                <Icon name="eye" size={20} color="#fff" />
                <Text style={styles.buttonText}></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDeleteTask(task.id)}
              >
                <Icon name="trash" size={20} color="#fff" />
                <Text style={styles.buttonText}></Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noTasks}>Aucune tâche.</Text>
      )}

     
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              supprimer cette tâche ?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmDeleteTask}
              >
                <Text style={styles.buttonText}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    flexGrow: 1,
    paddingTop: 60,
  },
  backArrow: {
    marginBottom: 20,
  },
  backArrowText: {
    fontSize: 40,
    color: "#2980b9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    marginBottom: 15,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  description: {
    fontSize: 16,
    color: "#7f8c8d",
    marginVertical: 5,
  },
  taskDetails: {
    marginVertical: 10,
  },
  etat: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495e",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2980b9",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    width: "48%",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  noTasks: {
    fontSize: 18,
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#34495e",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
  },
  confirmButton: {
    backgroundColor: "#27ae60",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
  },
});

