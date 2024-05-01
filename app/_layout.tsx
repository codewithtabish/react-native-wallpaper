import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="home/image"
            options={{
              headerShown: false,
              gestureEnabled: true,
              presentation: "modal",
              // presentation: "fullScreenModal",
              // presentation: "transparentModal",
              animation: "fade",
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default _layout
