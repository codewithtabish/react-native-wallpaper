import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { BlurView } from "expo-blur"
import { common, theme } from "@/constants"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Image } from "expo-image"
import { Entypo, Octicons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import Toast from "react-native-toast-message"

const image = () => {
  const params = useLocalSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState("loading")
  const fileName = params?.previewURL.split("/").pop()
  const filePath = `${FileSystem.documentDirectory}${fileName}`

  const onLoad = () => {
    setStatus("")
    // setTimeout(() => {}, 3000)
  }

  useEffect(() => {
    requestMediaLibraryPermissions()

    return () => {}
  }, [])

  const getSize = () => {
    const aspectRation = params?.imageWidth / params?.imageHeight
    const maxWidth = Platform.OS == "web" ? common.wp(50) : common.wp(92)
    const calculatedHeight = maxWidth / aspectRation

    let calculatedWidth = maxWidth
    if (aspectRation < 1) {
      calculatedWidth = calculatedHeight * aspectRation
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    }
  }

  const handleDownloadImage = async () => {
    try {
      setStatus("downloading")
      const uri = await dowloadImage()
      if (uri) {
        setStatus("")
        showToast("Image Downloaded")
      }
    } catch (error) {
      setStatus("")
      return null
    }
  }
  const handleShareImage = async () => {
    try {
      setStatus("sharing")
      const uri = await dowloadImage()
      if (uri) {
        await Sharing.shareAsync(uri)
        setStatus("")
      }
    } catch (error) {
      Alert.alert(error.message)
      setStatus("")
    }
  }

  const dowloadImage = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        params?.webformatURL,
        filePath,
      )
      return uri
    } catch (error) {
      Alert.alert(error.message)
      return null
    }
  }

  const requestMediaLibraryPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to save the image!")
    }
  }

  const toastConfig = {
    success: ({ text1, props, ...rest }) => (
      <View style={styles.toastContainer}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
  }

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message + " 👋",
      position: "bottom",
    })
  }

  // Rest of the component...

  return (
    <BlurView style={styles.container} intensity={100} tint="dark">
      <View style={[]}>
        <View style={getSize()}>
          {status === "loading" && (
            <View style={styles.imageLoader}>
              <ActivityIndicator size={"large"} color={"white"} />
            </View>
          )}
          <Image
            transition={50}
            style={[styles.image, getSize()]}
            source={{ uri: params?.webformatURL }}
            onLoad={onLoad}
          />
        </View>
        <View style={styles.iconContainer}>
          <Animated.View entering={FadeInDown.springify()}>
            <Pressable style={styles.button}>
              <Octicons
                name="x"
                size={30}
                color={"white"}
                onPress={() => router.back()}
              />
            </Pressable>
          </Animated.View>
          <Animated.View entering={FadeInDown.springify().delay(100)}>
            {status === "downloading" ? (
              <Pressable style={styles.button}>
                <ActivityIndicator size={"small"} color={"white"} />
                {/* <Octicons name="download" size={30} color={"white"} /> */}
              </Pressable>
            ) : (
              <Pressable style={styles.button} onPress={handleDownloadImage}>
                <Octicons name="download" size={30} color={"white"} />
              </Pressable>
            )}
          </Animated.View>
          <Animated.View entering={FadeInDown.springify().delay(100)}>
            {status === "sharing" ? (
              <Pressable style={styles.button}>
                <ActivityIndicator size={"small"} color={"white"} />
                {/* <Octicons name="download" size={30} color={"white"} /> */}
              </Pressable>
            ) : (
              <Pressable style={styles.button} onPress={handleShareImage}>
                <Entypo name="share" size={30} color={"white"} />
              </Pressable>
            )}
          </Animated.View>
        </View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
    </BlurView>
  )
}

export default image

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: common.wp(4),
    backgroundColor: "rgba(0,0,0,.3)",
    // backgroundColor: theme.colors.neutral(0.1),
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,.3)",
    borderColor: "rgba(255,255,255,.2)",
  },
  imageLoader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    zIndex: 10,
  },
  button: {},
  iconContainer: {
    marginTop: common.hp(3),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: common.wp(15),
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255,255,255,.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",

    // padding: common.hp(2.5),
  },
  toastContainer: {
    padding: 12,
    paddingHorizontal: 30,
    borderRadius: theme.radius.lg,
    backgroundColor: "rgba(255,255,255,.15)",
  },
  toastText: {
    color: "white",
    fontSize: 11,
  },
})
