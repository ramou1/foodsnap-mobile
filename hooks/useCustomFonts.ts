import { useFonts } from "expo-font";

export function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        'Rubik-Light': require('../assets/fonts/Rubik/Rubik-Light.ttf'),
        'Rubik-Regular': require('../assets/fonts/Rubik/Rubik-Regular.ttf'),
        'Rubik-Medium': require('../assets/fonts/Rubik/Rubik-Medium.ttf'),
        'Rubik-Bold': require('../assets/fonts/Rubik/Rubik-Bold.ttf'),
        'Rubik-SemiBold': require('../assets/fonts/Rubik/Rubik-SemiBold.ttf'),
        'Rubik-ExtraBold': require('../assets/fonts/Rubik/Rubik-ExtraBold.ttf'),
        'Rubik-Black': require('../assets/fonts/Rubik/Rubik-Black.ttf'),
    });

    return fontsLoaded;
}

// "fonts": [
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-Light.ttf",
//     "family": "Rubik-Light",
//     "weight": "300",
//     "style": "normal"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-LightItalic.ttf",
//     "family": "Rubik-Light",
//     "weight": "300",
//     "style": "italic"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-Regular.ttf",
//     "family": "Rubik",
//     "weight": "400",
//     "style": "normal"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-Italic.ttf",
//     "family": "Rubik",
//     "weight": "400",
//     "style": "italic"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-Medium.ttf",
//     "family": "Rubik-Medium",
//     "weight": "500",
//     "style": "normal"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-MediumItalic.ttf",
//     "family": "Rubik-Medium",
//     "weight": "500",
//     "style": "italic"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-SemiBold.ttf",
//     "family": "Rubik-SemiBold",
//     "weight": "600",
//     "style": "normal"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-SemiBoldItalic.ttf",
//     "family": "Rubik-SemiBold",
//     "weight": "600",
//     "style": "italic"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-Bold.ttf",
//     "family": "Rubik-Bold",
//     "weight": "700",
//     "style": "normal"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-BoldItalic.ttf",
//     "family": "Rubik-Bold",
//     "weight": "700",
//     "style": "italic"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-ExtraBold.ttf",
//     "family": "Rubik-ExtraBold",
//     "weight": "800",
//     "style": "normal"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-ExtraBoldItalic.ttf",
//     "family": "Rubik-ExtraBold",
//     "weight": "800",
//     "style": "italic"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-Black.ttf",
//     "family": "Rubik-Black",
//     "weight": "900",
//     "style": "normal"
//   },
//   {
//     "asset": "/assets/fonts/Rubik/Rubik-BlackItalic.ttf",
//     "family": "Rubik-Black",
//     "weight": "900",
//     "style": "italic"
//   }
// ]