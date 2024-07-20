import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AnimatedText from "./components/AnimatedText";
import OrnamentImage from "./components/OrnamentImage";
import { useRef, useEffect } from "react";
import { HEIGHT, ornaments, WIDTH } from "./constants/ornaments";

function shuffle(array) {
  var random = array.map(Math.random);
  array.sort(function (a, b) {
    return random[array.indexOf(a)] - random[array.indexOf(b)];
  });
}

export default function App() {
  const pictureRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const ind2 = [0, 1, 2, 3, 4, 5, 6, 7];

  function handleRef() {
    // for (let key in pictureRef.current) {
    //   console.log(key);
    // }
    // pictureRefs.current.measure((x, y, width, height, pageX, pageY) => {
    //   console.log(pageX, pageY, width);
    // })
    // pictureRefs.current.getBoundingClientRect()
    // pictureRefs.current.measure((rect) => {
    //   console.log("Element coordinates:", rect);
    //   console.log(`X: ${rect.x}`);
    //   console.log(`Y: ${rect.y}`);
    //   console.log(`Width: ${rect.width}`);
    //   console.log(`Height: ${rect.height}`);
    //   console.log(`PageX: ${rect.pageX}`);
    //   console.log(`PageY: ${rect.pageY}`);
    // });
  }

  // shuffle(ind2);
  // shuffle(ind2);
  // res = [];
  // for (let i = 0; i < ind2.length; i++) {
  //   res[i] = ind2[i] - i;
  // }
  // console.warn(res, ind2);
  res = ind2;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Знайти відповідність</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 12,
          }}
        >
          <OrnamentImage image={ornaments[0].img} ref={pictureRef[0]} />
          <OrnamentImage image={ornaments[1].img} ref={pictureRef[1]} />
          <OrnamentImage image={ornaments[2].img} ref={pictureRef[2]} />
          <OrnamentImage image={ornaments[3].img} ref={pictureRef[3]} />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <OrnamentImage image={ornaments[4].img} ref={pictureRef[4]} />
          <OrnamentImage image={ornaments[5].img} ref={pictureRef[5]} />
          <OrnamentImage image={ornaments[6].img} ref={pictureRef[6]} />
          <OrnamentImage image={ornaments[7].img} ref={pictureRef[7]} />
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
            ornamentRef={pictureRef[1]}
            word={ornaments[ind2[1]].name} //56_1
          />

          <AnimatedText
            ornamentRef={pictureRef[2]}
            word={ornaments[ind2[2]].name} //56_1
          />

          <AnimatedText
            ornamentRef={pictureRef[3]}
            word={ornaments[ind2[3]].name} //56_1
          />

          <AnimatedText
            ornamentRef={pictureRef[0]}
            word={ornaments[ind2[0]].name} //56_1
          />
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
            ornamentRef={pictureRef[5]}
            word={ornaments[ind2[5]].name} //56_1
          />
          <AnimatedText
            ornamentRef={pictureRef[4]}
            word={ornaments[ind2[4]].name} //56_1
          />

          <AnimatedText
            ornamentRef={pictureRef[6]}
            word={ornaments[ind2[6]].name} //56_1
          />

          <AnimatedText
            ornamentRef={pictureRef[7]}
            word={ornaments[ind2[7]].name} //56_1
          />
        </View>
        {/* <Button onPress={handleRef} title="Click me on ref" /> */}
        {/* <Button onPress={handleTranslate} title="Click me on move" /> */}
      </View>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bba",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderRadius: 12,
    borderColor: "#a66",
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
