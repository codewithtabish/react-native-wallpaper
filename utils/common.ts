import { Dimensions } from "react-native"

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window")
// to get the height percentage
const hp = (h: number) => (deviceHeight * h) / 100
// to get the width percentage
const wp = (w: number) => (deviceWidth * w) / 100
// to get the scale percentage
const sp = (s: number) => (deviceWidth * s) / 100

const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    return 4
  } else if (deviceWidth >= 768) {
    return 3
  } else return 2
}

const getImageSize = (width: any, height: any) => {
  if (width > height) {
    return 250
  } else if (width < height) {
    return 300
  } else {
    return 200
  }
}
// export { hp, wp, sp };

export default { hp, wp, sp, getColumnCount, getImageSize }
