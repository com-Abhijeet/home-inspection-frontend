import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const expiryTime = await AsyncStorage.getItem("tokenExpiry");

        if (token && expiryTime && Date.now() < Number(expiryTime)) {
          setIsLoggedIn(true);
          console.log("Token Found");
        } else {
          setIsLoggedIn(false);
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("tokenExpiry");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  console.log("user logged token", isLoggedIn);
  return isLoggedIn;
};

export default useUserLoggedIn;
