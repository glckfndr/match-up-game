import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AnimatedText from "./components/AnimatedText";
import OrnamentImage from "./components/OrnamentImage";
import { useRef, useEffect } from "react";
import { HEIGHT, ornaments, WIDTH } from "./constants/ornaments";
import {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import shuffle from "./services/shuffle";

export default function App() {
  const rotateZ = Array(8)
    .fill(null)
    .map(() => useSharedValue(0));
  const indexes = useRef([...Array(8).keys()]);

  const triggerAnimations = (i) => {
    return (shouldAnimate) => {
      rotateZ[i].value = withTiming(20, { duration: 100 }, () => {
        rotateZ[i].value = withSpring(0, { duration: 500 });
      });
    };
  };

  const pictureRef = Array(8)
    .fill(null)
    .map(() => useRef(null));

  shuffle(indexes.current);
  shuffle(indexes.current);

  console.log(indexes.current);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text
          style={[styles.intro, { textShadowOffset: { width: 3, height: 4 } }]}
        >
          Принципи побудови статичних та динамічних мотивів
        </Text>
        <Text style={styles.title}>Знайти відповідність</Text>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 12,
          }}
        >
          {indexes.current.slice(0, 4).map((i) => (
            <OrnamentImage
              key={i}
              image={ornaments[i].img}
              ref={pictureRef[i]}
              rotateZ={rotateZ[i]}
            />
          ))}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {indexes.current.slice(4, 8).map((i) => (
            <OrnamentImage
              key={i}
              image={ornaments[i].img}
              ref={pictureRef[i]}
              rotateZ={rotateZ[i]}
            />
          ))}
        </View>
        {/* {shuffle(indexes)} */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 40,
          }}
        >
          {indexes.current.slice(0, 4).map((i, ind) => (
            <AnimatedText
              key={i}
              ornamentRef={pictureRef[ind]}
              word={ornaments[ind].name} //56_1
              triggerAnimation={triggerAnimations(ind)}
            />
          ))}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 40,
          }}
        >
          {indexes.current.slice(4, 8).map((i, ind) => (
            <AnimatedText
              key={i}
              ornamentRef={pictureRef[ind + 4]}
              word={ornaments[ind + 4].name} //56_1
              triggerAnimation={triggerAnimations(ind + 4)}
            />
          ))}
        </View>
        {/* <Button onPress={handleRef} title="Click me on ref" /> */}
        {/* <Button onPress={handleTranslate} title="Click me on move" /> */}
        {/* <StatusBar style="auto" /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bba",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 5,
    borderRadius: 12,
    borderColor: "#a66",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  intro: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "500",
    marginTop: 12,
    textAlign: "center",
    marginVertical: 32,
    marginHorizontal: 12,
    color: "#008800",
    textShadowColor: "#777",
  },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 32 },
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
