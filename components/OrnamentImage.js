import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import { LocalSvg } from "react-native-svg/css";

const WIDTH = 90;
const HEIGHT = 90;

export default function OrnamentImage({ image }) {
  return (
    <View style={styles.ornamentContainer}>
      <LocalSvg asset={image} height={HEIGHT} width={WIDTH} />
      <View style={styles.textContainer}>
        <Text style={styles.text}></Text>
      </View>
    </View>
  );
}

export const Picture = forwardRef(({ image }, ref) => (
  <View style={styles.ornamentContainer} ref={ref}>
    <LocalSvg asset={image} height={HEIGHT} width={WIDTH} />
    <View style={styles.textContainer}>
      <Text style={styles.text}></Text>
    </View>
  </View>
));

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
