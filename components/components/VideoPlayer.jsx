import React, { useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Button, View } from "@gluestack-ui/themed";
const { width: screenWidth } = Dimensions.get("window");

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [status, setStatus] = React.useState({});
  const onBuffer = () => {
    // Xử lý sự kiện khi video đang được buffer
  };

  const videoError = () => {
    // Xử lý sự kiện khi video không thể tải được
  };
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri: "https://vannt.click/test/a.m3u8",
          type: 'm3u8',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    position: "relative",
    width: "100%",
    height: screenWidth * 9 / 16,
  },
  video: {
    // alignSelf: "center",
    // width: 320,
    // height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default VideoPlayer;
