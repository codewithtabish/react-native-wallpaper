import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ThemedContainer = ({ children }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>{children}</View>
          <StatusBar style="dark" />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default ThemedContainer;

const styles = StyleSheet.create({});
