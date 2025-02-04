import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { LocalSvg } from "react-native-svg/css";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const WIDTH = 90;
const HEIGHT = 90;

const OrnamentImage = forwardRef(function ({ image, rotateZ }, ref) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotateZ.value}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.ornamentContainer, animatedStyle]} ref={ref}>
      <LocalSvg asset={image} height={HEIGHT} width={WIDTH} />
      <View style={styles.textContainer}>
        <Text style={styles.text}></Text>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#17A",
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 10,
    marginTop: 7,
  },
  ornamentContainer: {
    backgroundColor: "#4AF",
    borderRadius: 12,
    height: HEIGHT + 40,
  },
  text: {
    fontSize: 24,
    color: "#A91",
    fontWeight: "bold",
  },
});

export default OrnamentImage;
