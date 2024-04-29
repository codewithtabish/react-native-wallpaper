import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { catrgories, common, theme } from "@/constants"
import Animated, { FadeIn } from "react-native-reanimated"

const Categories = ({ category, handleCategory }: any) => {
  const Category = ({ item, index, active, handleCategory }: any) => {
    let color: any = active ? theme.colors.white : theme.colors.neutral(0.4)
    let backgroundColor: any = active
      ? theme.colors.neutral(0.6)
      : theme.colors.white

    return (
      <Animated.View
        entering={FadeIn.delay(index * 200)
          .duration(1000)
          .springify()
          .damping(14)}
        style={{}}
      >
        <Pressable
          style={[styles.category, { backgroundColor: backgroundColor }]}
          onPress={() => {
            if (category === item) {
              handleCategory("")
            } else {
              handleCategory(item)
            }
          }}
        >
          <Text style={[styles.title, { color: color }]}>{item}</Text>
        </Pressable>
      </Animated.View>
    )
  }
  return (
    <FlatList
      data={catrgories.categories}
      renderItem={({ item, index }) => (
        <Category
          item={item}
          index={index}
          handleCategory={handleCategory}
          active={category === item}
        />
      )}
      keyExtractor={(item) => item.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

export default React.memo(Categories)

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: common.wp(4),
    marginVertical: common.hp(1),
    gap: common.wp(3),
  },
  category: {
    padding: common.hp(1.5),
    paddingHorizontal: common.wp(4),
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: common.hp(2.1),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
  },
})
