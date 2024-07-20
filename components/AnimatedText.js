import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

import { StyleSheet, Text } from "react-native";

import React, { useState, useRef, useEffect } from "react";

const WIDTH = 90;
const HEIGHT = 90;

const AnimatedText = ({ word, ornamentRef }) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);
  const imagePos = useSharedValue({ x: 0, y: 0 });

  const start = useSharedValue({ x: 0, y: 0 });

  const delta = useSharedValue({ x: 0, y: 0 });
  const secondRef = useRef(null);
  const [absolutePosition, setAbsolutePosition] = useState({ x: 0, y: 0 });

  const calculateDistance = (x, y) => {
    if (ornamentRef.current) {
      ornamentRef.current.measure((fx, fy, fw, fh, fpx, fpy) => {
        imagePos.value = { x: fpx + WIDTH / 1.55, y: fpy + HEIGHT / 0.8 };
        const dx = x - imagePos.value.x;
        const dy = y - imagePos.value.y;
        delta.value = { x: dx, y: dy };
      });
    }
  };

  const getAbsolutePosition = () => {
    if (secondRef.current) {
      secondRef.current.measure((x, y, width, height, pageX, pageY) => {
        setAbsolutePosition({ x: pageX, y: pageY });
      });
    }
  };

  useEffect(() => {
    getAbsolutePosition();
  }, []);

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
      runOnJS(calculateDistance)(e.absoluteX, e.absoluteY);
    })
    .onEnd((e) => {
      if (Math.abs(delta.value.x) < 30 && Math.abs(delta.value.y) < 30)
        offset.value = withSpring({
          x: imagePos.value.x - absolutePosition.x - WIDTH / 1.5 + 2,
          y: imagePos.value.y - absolutePosition.y - 13,
        });
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
      <Animated.View
        style={[styles.textContainer, animatedPanStyles]}
        ref={secondRef}
        onLayout={getAbsolutePosition}
      >
        <Text style={styles.text}>{word}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#17A",
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 10,
    padding: 3,
    height: 32,
  },

  text: {
    fontSize: 16,
    color: "#ffa",
    fontWeight: "bold",
  },
});

export default AnimatedText;
