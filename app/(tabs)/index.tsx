import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  // State to handle the list of todos
  const [todos, setTodos] = useState<string[]>([]);

  // State to handle the current input text
  const [currentTodo, setCurrentTodo] = useState<string>("");

  // State to handle which todo is being edited
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Function to handle adding a new todo
  const addTodo = () => {
    if (currentTodo.trim()) {
      setTodos([...todos, currentTodo]);
      setCurrentTodo("");
    }
  };

  // Function to handle deleting a todo
  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Function to handle editing a todo
  const editTodo = (index: number) => {
    setEditIndex(index); // Store the index of the todo being edited
    setCurrentTodo(todos[index]); // Set the selected todo into the input field for editing
  };

  // Function to handle updating the todo
  const updateTodo = () => {
    if (editIndex !== null) {
      const updatedTodos = todos.map((item, index) =>
        index === editIndex ? currentTodo : item
      );
      setTodos(updatedTodos);
      setCurrentTodo(""); // Clear the input after updating
      setEditIndex(null); // Reset the edit mode
    }
  };

  return (
    <View style={{ marginTop: 50, marginHorizontal: 16 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 12,
        }}
        placeholder="Add or Edit a Task..."
        value={currentTodo}
        onChangeText={(text) => setCurrentTodo(text)}
      />

      {/* Conditional rendering based on whether we're editing or adding */}
      {editIndex !== null ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#222",
            borderRadius: 6,
            paddingVertical: 10,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={updateTodo}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            Update
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#222",
            borderRadius: 6,
            paddingVertical: 10,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={addTodo}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      <View style={{ marginTop: 40 }}>
        {todos.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              marginVertical: 5,
              backgroundColor: "#1e90ff",
              padding: 15,
              borderRadius: 6,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
              }}
            >
              {item}
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              {/* Edit button */}
              <TouchableOpacity onPress={() => editTodo(index)}>
                <Ionicons name="pencil" style={{ fontSize: 20, color: "white" }} />
              </TouchableOpacity>

              {/* Delete button */}
              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Ionicons name="trash" style={{ fontSize: 20, color: "white" }} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
