import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { MasonryFlashList } from "@shopify/flash-list"
import { common } from "@/constants"
import ImageCard from "./ImageCard"

const ImagesGrid = ({ images }: any) => {
  const column = common.getColumnCount()
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={column}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} column={column} />
        )}
        estimatedItemSize={30}
      />
    </View>
  )
}

export default ImagesGrid

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: common.wp(100),
  },
  contentContainer: {
    paddingHorizontal: common.wp(4),
  },
})
