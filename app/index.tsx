import React from "react"
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import ThemedContainer from "@/components/ThemedContainer"
import { LinearGradient } from "expo-linear-gradient"
import { common, images, theme } from "@/constants"
import { useRouter } from "expo-router"

const WelcomeScreen = () => {
  const router = useRouter()
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
      <View
        style={{
          flex: 1,
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 0,
          top: 0,
          justifyContent: "flex-end",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <View
          style={{
            marginBottom: common.hp(8),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: common.hp(1),
          }}
        >
          <Animated.Text
            entering={FadeInDown.duration(500).springify()}
            style={styles.title}
          >
            WallScape
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.duration(500).springify()}
            style={styles.subTitle}
          >
            Explore our vast collection of high quality wallpapers
          </Animated.Text>
          <Animated.View entering={FadeInDown.duration(600).springify()}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("home")}
            >
              <Text style={styles.buttonText}>Start Explore</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <StatusBar style="dark" backgroundColor={"white"} />
    </ThemedContainer>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  title: {
    fontSize: common.hp(6),
    color: theme.colors.neutral(0.8),
    fontWeight: theme.fontWeights.bold,
  },
  subTitle: {
    fontSize: common.hp(2.1),
    letterSpacing: 1,
    color: theme.colors.neutral(0.4),
    fontWeight: theme.fontWeights.medium,
    width: common.wp(80),
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.neutral(0.8),
    padding: common.hp(2),
    marginTop: common.hp(2),
    borderRadius: theme.radius.xl,
    width: common.wp(60),
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: "center",
    letterSpacing: 1.3,
    fontSize: common.hp(2.5),
    fontWeight: theme.fontWeights.semibold,
  },
})
