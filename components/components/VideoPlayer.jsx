import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Video, ResizeMode, VideoFullscreenUpdate } from "expo-av";
import { Button, View } from "@gluestack-ui/themed";
const { width: screenWidth } = Dimensions.get("window");
import * as ScreenOrientation from "expo-screen-orientation";
const VideoPlayer = ({ src, onSubmit }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [duration, setDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const onBuffer = () => {
    // Xử lý sự kiện khi video đang được buffer
  };

  const videoError = () => {
    // Xử lý sự kiện khi video không thể tải được
  };
  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
      }
    } else {
      setStatus(playbackStatus);
      setDuration(playbackStatus.durationMillis);
      setCurrentPosition(playbackStatus.positionMillis);
    }
  };
  useEffect(() => {
    if (duration && duration !== 0) {
      if (currentPosition / duration >= 0.8) {
        setIsDone(true);
      }
    }
  }, [duration, currentPosition]);
  useEffect(() => {
    if (isDone === true) {
      onSubmit();
    }
  }, [isDone]);
  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
      await ScreenOrientation.unlockAsync();
    } else if (
      fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS
    ) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };
  return (
    <View style={styles.container}>
      <Video
        onFullscreenUpdate={onFullscreenUpdate}
        ref={videoRef}
        style={styles.video}
        source={{
          uri: src,
          type: "m3u8",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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
    height: (screenWidth * 9) / 16,
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
