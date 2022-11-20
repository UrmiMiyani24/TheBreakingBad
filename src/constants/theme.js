import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#18CA75",

    // colors
    white: "#FFFFFF",
    grey: "#242424",
    grey1: "#3D3D3D",
    grey2: "#ABABAB",
    lightGray: "#C4C4C4",
    red: "#CA184E"

};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 16,
    padding2: 36,

    // font sizes
    largeTitle: 24,
    title: 23,
    h1: 16,
    h2: 14,
    body1: 30,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-Thin", fontSize: SIZES.largeTitle, lineHeight: 28 },
    largeTitleDark: { fontFamily: "Roboto-Bold", fontSize: SIZES.body1, lineHeight: 36 },
    title: { fontFamily: "Roboto-Bold", fontSize: SIZES.title, lineHeight: 27},
    h1: { fontFamily: "Roboto-Bold", fontSize: SIZES.h1, color: COLORS.white, lineHeight: 19 },
    h2: { fontFamily: "Roboto-Thin", fontSize: SIZES.h2, color: COLORS.white, lineHeight: 16 },
    h3: { fontFamily: "Roboto-Light", fontSize: SIZES.h2, color: COLORS.white, lineHeight: 16 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;