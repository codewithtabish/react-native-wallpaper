import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { common, images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import ThemedContainer from "@/components/ThemedContainer";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";

const WelcomeScreen = () => {
  return (
    <ThemedContainer>
      <ImageBackground
        resizeMode="cover"
        style={{
          width: common.wp(100),
          height: common.hp(100),
          position: "absolute",
        }}
        source={images.welcomeImage}
      />
      <Animated.View entering={FadeInDown.duration(700)} style={{ flex: 1 }}>
        <LinearGradient
          style={{
            position: "absolute",
            width: common.wp(100),
            height: common.hp(65),
            bottom: 0,
          }}
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
      </Animated.View>
      <StatusBar style="dark" />
    </ThemedContainer>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
