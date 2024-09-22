import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import { ReactNode } from "react";

const Background = ({ children }: { children: ReactNode }) => {
  return (
    <ImageBackground
      source={require("../assets/bg-cover.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Optional: Add an overlay color with transparency
  },
});

export default Background;
