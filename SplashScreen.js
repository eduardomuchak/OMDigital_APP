import React from "react";
import { Image } from "react-native";

const SplashScreen = () => {
  return (
    <Image
      source={require("../assets/splash.png")}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
    />
  );
};

export default SplashScreen;
