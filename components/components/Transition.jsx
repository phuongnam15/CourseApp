import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const Transition = ({ children }) => {
  const translateX = useSharedValue(300); // Giá trị khởi đầu ở bên phải màn hình
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Transition;
