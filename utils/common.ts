import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
// to get the height percentage
const hp = (h: number) => (deviceHeight * h) / 100;
// to get the width percentage
const wp = (w: number) => (deviceWidth * w) / 100;
// to get the scale percentage
const sp = (s: number) => (deviceWidth * s) / 100;

// export { hp, wp, sp };

export default { hp, wp, sp };
