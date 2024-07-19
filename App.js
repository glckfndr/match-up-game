import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { LocalSvg } from "react-native-svg/css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import AnimatedText from "./components/AnimatedText";
import OrnamentImage, { Picture } from "./components/OrnamentImage";
import { forwardRef, useRef } from "react";

const ornaments = [
  { img: require("./assets/p56_1.svg"), name: "хрещик" },
  { img: require("./assets/p56_2.svg"), name: "млинок" },
  { img: require("./assets/p56_3.svg"), name: "колісниця" },
  { img: require("./assets/p56_4.svg"), name: "сонечко" },
  { img: require("./assets/p56_5.svg"), name: "косиця" },
  { img: require("./assets/p56_6.svg"), name: "віночок" },
  { img: require("./assets/p56_8.svg"), name: "вітрячок" },
  { img: require("./assets/p56_9.svg"), name: "гачки" },

  // require("./assets/p56_7.svg"), // сонечко
  // require("./assets/p56_10.svg"), // ружа
  // require("./assets/p56_11.svg"), // ружа
  // require("./assets/p56_12.svg"), // вітрячок
];

const WIDTH = 80;
const HEIGHT = 80;
const SHIFT_Y = -74;
const SHIFT_X = 98;

function shuffle(array) {
  var random = array.map(Math.random);
  array.sort(function (a, b) {
    return random[array.indexOf(a)] - random[array.indexOf(b)];
  });
}
export default function App() {
  const pictureRefs = useRef([]);
  const ind2 = [0, 1, 2, 3];

  shuffle(ind2);
  shuffle(ind2);
  res = [];
  for (let i = 0; i < ind2.length; i++) {
    res[i] = ind2[i] - i;
  }
  console.warn(res, ind2);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <OrnamentImage image={ornaments[0].img} />
          <OrnamentImage image={ornaments[1].img} />
          <OrnamentImage image={ornaments[2].img} />
          <OrnamentImage image={ornaments[3].img} />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 40,
          }}
        >
          <AnimatedText
            ornament={pictureRefs.current}
            word={ornaments[ind2[0]].name} //56_1
            correctPosition={{ x: SHIFT_X * res[0], y: SHIFT_Y }}
          />
          <AnimatedText
            ornament={pictureRefs.current}
            word={ornaments[ind2[1]].name}
            correctPosition={{ x: SHIFT_X * res[1], y: SHIFT_Y }}
          />
          <AnimatedText
            ornament={pictureRefs.current}
            word={ornaments[ind2[2]].name}
            correctPosition={{ x: SHIFT_X * res[2], y: SHIFT_Y }}
          />

          <AnimatedText
            ornament={pictureRefs.current}
            word={ornaments[ind2[3]].name}
            correctPosition={{ x: SHIFT_X * res[3], y: SHIFT_Y }}
          />
        </View>
        {/* <Button onPress={handleWidth} title="Click me on size" />
        <Button onPress={handleTranslate} title="Click me on move" /> */}

        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "#f91",
    fontWeight: "bold",
  },
  textContainer: {
    backgroundColor: "#171",
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 10,
  },
});
