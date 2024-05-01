import { StyleSheet, Text, View } from "react-native"
import React, { memo } from "react"
import { MasonryFlashList } from "@shopify/flash-list"
import { common } from "@/constants"
import ImageCard from "./ImageCard"

const ImagesGrid = memo(
  ({ images, router }: any) => {
    const column = common.getColumnCount()
    return (
      <View style={styles.container}>
        <MasonryFlashList
          data={images}
          keyExtractor={(item) => item?.id?.toString()}
          numColumns={column}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item, index }) => (
            <ImageCard
              item={item}
              index={index}
              column={column}
              router={router}
            />
          )}
          estimatedItemSize={30}
        />
      </View>
    )
  },
  (prevProps, nextProps) => {
    // Compare the `images` array between previous and next props
    return prevProps.images === nextProps.images
  },
)

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
