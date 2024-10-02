import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
const SlideUpTransition = ({children}) => {
  const translateY = useSharedValue(0); // Khởi tạo giá trị động

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    // Khởi chạy animation khi component được mount
    translateY.value = withTiming(0, { duration: 500});
  }, []);

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
        {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
});
export default SlideUpTransition;
