import React, { useCallback, useMemo, useRef, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"
import { BlurView } from "expo-blur"
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated"
import { catrgories, common, theme } from "@/constants"

const FilterModel = ({
  modalRef,
  filterData,
  setfilterData,
  closeModal,
  handleFilter,
  selectedOptions,
  setSelectedOptions,
  handleReset,
}) => {
  // ref

  // variables
  const snapPoints = useMemo(() => ["75%"], [])

  const CustomBackDrop = ({ animatedIndex, style }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => {
      let opacity = interpolate(
        animatedIndex?.value,
        [-1, 0],
        [0, 1],
        Extrapolation.CLAMP,
      )
      return {
        opacity,
      }
    })
    const containerStyle = [style, styles.overlay, StyleSheet.absoluteFill]

    return (
      <View style={containerStyle}>
        <BlurView tint="dark" intensity={15} style={StyleSheet.absoluteFill} />
      </View>
    )
  }

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={CustomBackDrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <FilterOptions
            filterArray={catrgories.myFilterArray}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.buttonReset,
                { backgroundColor: theme.colors.neutral(0.3) },
              ]}
              onPress={() => handleReset()}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonFilter,
                { backgroundColor: theme.colors.neutral(0.4) },
              ]}
              onPress={handleFilter}
            >
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const FilterOptions = ({
  filterArray,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleOptionSelect = (category, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [category]: prevSelectedOptions[category]
        ? prevSelectedOptions[category].includes(option)
          ? prevSelectedOptions[category].filter((o) => o !== option)
          : [...prevSelectedOptions[category], option]
        : [option],
    }))
  }

  return (
    <ScrollView style={styles.filterOptionsContainer}>
      {Object.keys(filterArray).map((category, index) => (
        <Animated.View
          entering={FadeInDown.delay(index * 500)
            .springify()
            .damping(11)}
          key={index}
          style={styles.categoryContainer}
        >
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.optionsContainer}>
            {filterArray[category].map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={[
                  {
                    backgroundColor: category === "Colors" ? option : "",
                  },

                  styles.optionContainer,
                  selectedOptions[category]?.includes(option)
                    ? styles.selectedOption
                    : null,
                  {
                    borderColor: selectedOptions[category]?.includes(option)
                      ? theme.colors.neutral(0.1)
                      : theme.colors.neutral(0.1),
                  },

                  {
                    padding:
                      category === "Colors" ? common.hp(1.6) : common.hp(1.2),
                    width: category === "Colors" ? common.hp(4) : null,
                    height: category === "Colors" ? common.hp(4) : null,
                    borderRadius: category === "Colors" ? 50 : 10,
                    paddingHorizontal:
                      category === "Colors" ? common.hp(1.6) : common.hp(2),
                  },
                ]}
                onPress={() => handleOptionSelect(category, option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedOptions[category]?.includes(option)
                      ? styles.selectedOptionText
                      : null,
                  ]}
                >
                  {category === "Colors" ? "" : option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 24,
    // justifyContent: "center",
    // backgroundColor: "grey",
  },
  contentContainer: {
    // flex: 1,
    // alignItems: "center",
    marginHorizontal: common.wp(5),
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.3)",
  },
  content: {
    marginTop: common.hp(1),
  },
  filterTitle: {
    fontSize: common.hp(3.3),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.7),
    marginBottom: 5,
  },
  filterOptionsContainer: {
    marginTop: common.hp(1),
  },
  categoryContainer: {
    // marginVertical: common.hp(2),
  },
  categoryTitle: {
    fontSize: common.hp(3.5),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.5),
    marginVertical: common.hp(1),
    fontStyle: "italic",
    // marginBottom: common.hp(2),
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: common.hp(1),
    // justifyContent: "center",
  },
  optionContainer: {
    // paddingHorizontal: common.wp(2.9),
    // paddingVertical: common.hp(0.7),
    // backgroundColor: theme.colors.neutral(0.1),
    borderRadius: 8,
    marginRight: common.wp(3),
    marginBottom: common.hp(1.6),
    marginHorizontal: 1,
    borderColor: theme.colors.neutral(0.2),
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: theme.colors.neutral(0.4),
  },
  selectedOptionText: {
    color: theme.colors.white,
  },
  optionText: {
    fontSize: common.hp(1.9),
    color: theme.colors.neutral(0.7),
    fontStyle: "italic",
  },
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: common.hp(2),
  },
  buttonReset: {
    paddingVertical: common.hp(1),
    paddingHorizontal: common.wp(4),
    backgroundColor: theme.colors.neutral(0.1),
    borderRadius: 8,
    flex: 1,
  },
  buttonFilter: {
    paddingVertical: common.hp(1),
    paddingHorizontal: common.wp(4),
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    fontSize: common.hp(2),
    color: theme.colors.white,
    fontWeight: theme.fontWeights.semibold,
    textAlign: "center",
  },
})

export default FilterModel
