import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { common, theme } from "@/constants"

const FilterOptions = ({ filterArray }) => {
  return (
    <View style={styles.container}>
      {Object.keys(filterArray).map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.optionsContainer}>
            {filterArray[category].map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={styles.optionContainer}
                onPress={() => console.log(`Selected ${option}`)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  categoryContainer: {
    marginVertical: common.hp(2),
  },
  categoryTitle: {
    fontSize: common.hp(2.5),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.7),
    marginBottom: common.hp(1),
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionContainer: {
    paddingHorizontal: common.wp(3),
    paddingVertical: common.hp(1),
    backgroundColor: theme.colors.neutral(0.1),
    borderRadius: 8,
    marginRight: common.wp(3),
    marginBottom: common.hp(1),
  },
  optionText: {
    fontSize: common.hp(2),
    color: theme.colors.neutral(0.7),
  },
})

export default FilterOptions
