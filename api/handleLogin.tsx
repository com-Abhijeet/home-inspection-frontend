import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { baseUrl } from "./baseUrl";

const handleLogin = async (
  email: string,
  password: string,
  navigation: NavigationProp<any>,
  setUser: (user: {
    _id: string;
    email: string;
    name: string;
    role: string;
  }) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  try {
    setIsLoading(true);
    console.log(email);
    const response = await fetch(`${baseUrl}/user/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      await AsyncStorage.setItem("token", data.token);
      if (data.expiryTime) {
        await AsyncStorage.setItem("tokenExpiry", data.expiryTime.toString());
      }
      const { _id, email, name, role } = data.isUser;
      setUser({ _id, email, name, role });
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Projects" }], // Reset stack and set Projects as the initial route
      });
    } else {
      console.error("Login failed:", data.message);
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Error logging in:", error);
    setIsLoading(false);
  }
};

export default handleLogin;
