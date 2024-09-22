import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import handleLogin from "@/api/handleLogin";
import { useUser } from "@/contexts/userContext";

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = () => {
    handleLogin(email, password, navigation, setUser, setIsLoading);
  };
  const handleCreateProject = () => {
    // Handle create project logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
        <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tertiaryButton}
        onPress={handleCreateProject}
      >
        <Text style={styles.tertiaryButtonText}>Create a New Project</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#888887",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  tertiaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007BFF",
    width: "100%",
  },
  tertiaryButtonText: {
    color: "#007BFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
