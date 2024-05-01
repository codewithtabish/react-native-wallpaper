import {
  ActivityIndicator,
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
import FilterModel from "@/components/FilterModel"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"

let page = 1

const HomeScreen = () => {
  const [search, setSearch] = useState<any>()
  const searchInputRef = useRef<any>()
  const [category, setCategory] = useState<any>()
  const [images, setImages] = useState<any>([])
  const [someSearch, setsomeSearch] = useState(false)
  const modalRef = useRef(null)
  const [filterData, setfilterData] = useState()
  const [selectedOptions, setSelectedOptions] = useState({})
  const scrollRef = useRef(null)
  const [isEndReached, setisEndReached] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
      setSelectedOptions({})
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

  const fetchImages = async (params = { page: 1 }, append = true) => {
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

  // callbacks
  const openModal = useCallback(() => {
    modalRef?.current?.present()
  }, [])
  const closeModal = () => {
    modalRef?.current?.close()
  }

  const handleFilter = () => {
    // Implement your filter logic here
    console.log("Applying filters:", selectedOptions)
    // setCategory("")
    // Extract the selected options based on the category
    const { Colors, Order, Orientation, Type } = selectedOptions
    const obj = {
      colors: Colors,
      order: Order,
      Orientation,
      page,
    }
    if (category) obj.category = category
    if (search) obj.q = search

    fetchImages(obj)
    setSelectedOptions({})

    closeModal()
    // const { Type, Colors, Corder } = selectedOptions
    // const data = [...Type, ...Colors, ...Corder]
    // console.log(data)
    // console.log(Type, Colors, Corder)
  }

  const handleReset = () => {
    setSelectedOptions({})
    fetchImages({ page })
  }

  const handleScroll = (event) => {
    const { contentSize, contentOffset, layoutMeasurement } = event.nativeEvent
    const scrollHeight = contentSize.height - layoutMeasurement.height
    const scrollOffset = contentOffset.y

    if (scrollOffset >= scrollHeight - 0.8 && !isEndReached && !isLoading) {
      setIsLoading(true)
      page = page + 1
      let params = {
        ...selectedOptions,
        page,
      }
      if (search) params.q = search
      if (category) params.category = category
      console.log("YES I AM HERE ")

      fetchImages(params)
        .then(() => {
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
      // setPage((prevPage) => prevPage + 1)
    }
  }

  const handleScrollB = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height
    const scrollHeight = event.nativeEvent.layoutMeasurement.height
    const offset = event.nativeEvent.contentOffset.y
    const bottomPosition = contentHeight - scrollHeight
    if (offset >= bottomPosition - 1) {
      if (!isEndReached) {
        setisEndReached(true)
        page = page + 1
        let params = {
          // ...selectedOptions,
          page,
        }
        if (search) params.q = search
        if (category) params.category = category
        console.log("YES I AM HERE ")

        fetchImages(params)
      } else if (isEndReached) {
        setisEndReached(false)
      }
    }

    // if (offset + scrollHeight >= contentHeight - 10) {
    //   console.log("yes")
    //   page = page + 1
    //   let params = {
    //     // ...selectedOptions,
    //     page,
    //   }
    //   if (search) params.q = search
    //   if (category) params.category = category

    //   fetchImages(params)
    // }
  }

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({ y: 0, animated: true })
  }

  return (
    <>
      <ThemedContainer>
        <StatusBar style="dark" backgroundColor={"white"} />
        <Pressable
          onPress={handleScrollUp}
          style={{
            marginHorizontal: common.wp(4),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: common.hp(1),
          }}
        >
          <Pressable onPress={handleScrollUp}>
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
          <TouchableOpacity onPress={openModal}>
            <FontAwesome6 name="bars-staggered" size={22} />
          </TouchableOpacity>
        </Pressable>
        <ScrollView
          contentContainerStyle={{}}
          onScroll={handleScroll}
          scrollEventThrottle={10}
          ref={scrollRef}
        >
          <Pressable style={styles.searchBox} onPress={handleScrollUp}>
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
          </Pressable>
          <View style={{ paddingRight: common.wp(0) }}>
            <Categories category={category} handleCategory={handleCategory} />
          </View>
          {/* <Text style={{ margin: 20 }}>{images?.length}</Text> */}
          {someSearch && images?.length === 0 ? (
            <Text style={{ margin: 20 }}>No result found</Text>
          ) : (
            <ImagesGrid images={images} router={router} />
          )}
          {isLoading && (
            <View style={[styles.loaderContainer]}>
              <ActivityIndicator size="large" color={"gray"} />
            </View>
          )}
        </ScrollView>

        {/* <View style={{ height: common.hp(100) }}> */}
        {/* </View> */}
        <FilterModel
          modalRef={modalRef}
          closeModal={closeModal}
          filterData={filterData}
          setfilterData={setfilterData}
          handleFilter={handleFilter}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          handleReset={handleReset}
        />
      </ThemedContainer>
    </>
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
  loaderContainer: {
    paddingVertical: 20,
    alignItems: "center",
    // marginBottom: 70,
  },
})

// 43631310 - d68b96cf3fd0acd74f5306b77

// https://pixabay.com/api/?key=43631310-d68b96cf3fd0acd74f5306b77&per_page=100&safesearch=true&editors_choice=true&page=1&q=programming
