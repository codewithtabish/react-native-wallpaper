import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { Image } from "expo-image"
import { common, theme } from "@/constants"

const ImageCard = ({ item, index, column }: any) => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

  const lastInRow = () => {
    return (index + 1) % column === 0
    // return {index+1} %column===0
  }
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item
    return { height: common.getImageSize(width, height) }
  }

  //

  return (
    <Pressable style={[styles.imageWrapper, !lastInRow() && styles.spacing]}>
      <Image
        style={[styles.itemImage, getImageHeight()]}
        source={{ uri: item?.webformatURL }}
        placeholder={blurhash}
        contentFit="cover"
        transition={100}
      />
    </Pressable>
  )
}

export default ImageCard

const styles = StyleSheet.create({
  itemImage: {
    // height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    marginBottom: common.wp(1),
    borderCurve: "continuous",
    overflow: "hidden",
    borderColor: theme.colors.neutral(0.4),
  },
  spacing: {
    marginRight: common.wp(1),
  },
})
