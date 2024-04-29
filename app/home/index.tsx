import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"
import ThemedContainer from "@/components/ThemedContainer"
import { FontAwesome6 } from "@expo/vector-icons"
import { common, theme } from "@/constants"
import { AntDesign } from "@expo/vector-icons"

const HomeScreen = () => {
  const [search, setSearch] = useState<any>()
  const [searchInputRef, setsearchInputRef] = useState<any>()
  return (
    <ThemedContainer>
      <View
        style={{
          marginHorizontal: common.wp(4),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: common.hp(1),
        }}
      >
        <Pressable>
          <Text
            style={{
              fontSize: common.hp(4),
              color: theme.colors.neutral(0.6),
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            PixelPrime
          </Text>
        </Pressable>
        <TouchableOpacity>
          <FontAwesome6 name="bars-staggered" size={22} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <AntDesign
              name="search1"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <View style={styles.searchInput}>
            <TextInput
              ref={setsearchInputRef}
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholder="search something"
              style={{
                fontSize: common.hp(1.9),
                color: theme.colors.neutral(0.5),
              }}
            />
          </View>
          {search && (
            <TouchableOpacity style={styles.closeIcon}>
              <AntDesign
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ThemedContainer>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  searchBox: {
    marginHorizontal: common.wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.white,
    padding: common.hp(1),
    borderRadius: theme.radius.lg,
    borderColor: theme.colors.grayBG,
    borderWidth: 1,
  },
  searchIcon: {
    padding: common.hp(1),
  },
  searchInput: {
    flex: 1,
    padding: common.hp(1),
    borderRadius: theme.radius.sm,
    color: theme.colors.neutral(0.7),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 6,
    borderRadius: theme.radius.sm,
  },
})
