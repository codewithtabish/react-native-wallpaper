import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { theme } from "@/constants"

const ThemedContainer = ({ children }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
            {children}
          </View>
          <StatusBar style="dark" />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  )
}

export default ThemedContainer

const styles = StyleSheet.create({})
