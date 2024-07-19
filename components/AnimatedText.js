import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

import { StyleSheet, Text, View } from "react-native";
import React from "react";
const WIDTH = 90;
export default function AnimatedText({ word, correctPosition, ornament }) {
  const offset = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);

  const start = useSharedValue({ x: 0, y: 0 });
  const end = useSharedValue(correctPosition);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      if (
        Math.abs(offset.value.y - end.value.y) < 30 &&
        Math.abs(offset.value.x - end.value.x) < 30
      )
        offset.value = withSpring(end.value);
      else offset.value = withSpring(start.value);
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedPanStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
      backgroundColor: isPressed.value ? "#149" : "#17A",
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.textContainer, animatedPanStyles]}>
        <Text style={styles.text}>{word}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#17A",
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 10,
    padding: 3,
    // position: "absolute",
  },

  text: {
    fontSize: 16,
    color: "#ffa",
    fontWeight: "bold",
  },
});
