import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import ThemedContainer from "@/components/ThemedContainer"
import { FontAwesome6 } from "@expo/vector-icons"
import { catrgories, common, theme, images } from "@/constants"
import { AntDesign } from "@expo/vector-icons"
import Categories from "@/components/Categories"
import { apiCall } from "@/api"
import ImagesGrid from "@/components/ImagesGrid"
import _ from "lodash"

let page = 1

const HomeScreen = () => {
  const [search, setSearch] = useState<any>()
  const searchInputRef = useRef<any>()
  const [category, setCategory] = useState<any>()
  const [images, setImages] = useState<any>([])
  const [someSearch, setsomeSearch] = useState(false)

  const handleCategory = useCallback(
    (item: any) => {
      // if (category === item) {
      // alert("es")
      // setCategory("")
      // }
      setCategory(item)
      clearText()
      setImages([])
      let params = { page }
      if (item) params = { category: item, page }
      fetchImages(params, false)
    },
    [category],
  )

  const handleSearch = useCallback(
    (value: any) => {
      setSearch(value)
    },
    [search],
  )

  useEffect(() => {
    fetchImages({ page: 1 }, true)

    return () => {}
  }, [])

  const fetchImages = async (params = { page: 1 }, append = false) => {
    const response = await apiCall(params)
    if (response.success && response.data.hits.length > 0) {
      if (append) {
        setImages([...images, ...response.data.hits])
      } else {
        setImages([...response.data.hits])
      }
    }
  }

  const handleSearchDebounce = useCallback(
    _.debounce((text) => {
      // setSearch(text)
      if (text.length > 2) {
        // setSearch(true)
        setsomeSearch(true)
        setTimeout(() => {}, 2000)
        page = 1
        setImages([])
        fetchImages({ q: text, page: 1 })
      }
      if (text === "") {
        setsomeSearch(false)
        page = 1
        setImages([])
        fetchImages({ page: 1 })
      }
    }, 400),
    [],
  )

  const onChangeText = (text) => {
    // searchInputRef.current = text.toString().trim()
    handleSearchDebounce(text)
    setSearch(text)
    setCategory("")
  }

  function clearText() {
    setSearch("")
    searchInputRef.current.clear()
    fetchImages({ page })
  }

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
              ref={searchInputRef}
              // value={search}
              onChangeText={onChangeText}
              placeholder="search something"
              style={{
                fontSize: common.hp(1.9),
                color: theme.colors.neutral(0.5),
                paddingVertical: 4,
                borderWidth: 0,
                borderColor: "red",
              }}
            />
          </View>
          {search && (
            <TouchableOpacity style={styles.closeIcon} onPress={clearText}>
              <AntDesign
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingRight: common.wp(0) }}>
          <Categories category={category} handleCategory={handleCategory} />
        </View>
        {/* <Text style={{ margin: 20 }}>{images?.length}</Text> */}
        {someSearch && images?.length === 0 ? (
          <Text style={{ margin: 20 }}>No result found</Text>
        ) : (
          <ImagesGrid images={images} />
        )}
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
    padding: 8,
    borderRadius: theme.radius.sm,
  },
})

// 43631310 - d68b96cf3fd0acd74f5306b77

// https://pixabay.com/api/?key=43631310-d68b96cf3fd0acd74f5306b77&per_page=100&safesearch=true&editors_choice=true&page=1&q=programming
