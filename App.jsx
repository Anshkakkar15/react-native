import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FormInput } from "./components/FormInput";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const storedTodos = AsyncStorage.getItem("todos");
    storedTodos.then((res) => {
      setTodo(JSON.parse(res));
    });
  }, [setTodo]);

  const addTodo = async () => {
    const todoSchema = {
      id: Math.random(),
      title: text,
    };
    if (text?.length >= 1) {
      try {
        setTodo([...todo, todoSchema]);
        setText("");
      } catch (err) {
        Alert.alert("Error adding todo");
      }
    } else {
      Alert.alert("Field Cannot be empty");
    }
  };

  const deleteTodo = (id) => {
    setTodo(todo?.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  return (
    <>
      <Text style={styles.header}>To-do List</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FormInput
            placeholder="Enter Title"
            value={text}
            onChangeText={(title) => setText(title)}
            style={styles.input}
          />
        </View>
        <Pressable style={styles.button} onPress={addTodo}>
          <Text style={styles.btnTxt}>Add</Text>
        </Pressable>

        <Text
          color="#090a11"
          style={{ fontSize: 25, marginTop: 15, fontWeight: "600" }}
        >
          Todos
        </Text>

        <ScrollView>
          {todo?.length >= 1 ? (
            todo?.map((elm) => {
              return (
                <View key={elm?.id} style={styles.card}>
                  <Text>{elm?.title}</Text>
                  <Pressable onPress={() => deleteTodo(elm?.id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="#a30000"
                      style={{ lineHeight: 21 }}
                    />
                  </Pressable>
                </View>
              );
            })
          ) : (
            <Text>No Todo Found</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 30,
    paddingRight: 30,
    overflow: "scroll",
    height: "100vh",
  },
  header: {
    padding: 20,
    textAlign: "center",
    fontSize: 25,
    color: "#000000de",
    backgroundColor: "#f7f7f7",
    paddingTop: 50,
    fontWeight: "700",
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 10,
  },
  button: {
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: "#090a11",
    padding: 10,
    width: "100%",
  },
  btnTxt: {
    color: "#fff",
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});
