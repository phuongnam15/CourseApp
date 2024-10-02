import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const FbImage = ({image}) => {
  const countFrom = 5;
  const conditionalRender = false;
  clickEventListener = () => {
    // Alert.alert("Alert", "image clicked");
  };

  const renderOne = () => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent1]}
          onPress={() => clickEventListener()}
        >
          <Image style={styles.image} source={{ uri: image[0] }} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTwo = () => {
    const conditionalRender =
      [3, 4].includes(image.length) ||
      (image.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent2]}
          onPress={() => clickEventListener()}
        >
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? image[1] : image[0] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent2]}
          onPress={() => clickEventListener()}
        >
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? image[2] : image[1] }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderThree = () => {
    const overlay =
      !countFrom ||
      countFrom > 5 ||
      (image.length > countFrom && [4, 5].includes(+countFrom))
        ? renderCountOverlay(true)
        : renderOverlay();
    const conditionalRender =
      image.length == 4 || (image.length > +countFrom && +countFrom == 4);

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent3]}
          onPress={() => clickEventListener()}
        >
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? image[1] : image[2] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent3]}
          onPress={() => clickEventListener()}
        >
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? image[2] : image[3] }}
          />
        </TouchableOpacity>
        {overlay}
      </View>
    );
  };

  const renderOverlay = () => {
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent3]}
        onPress={() => clickEventListener()}
      >
        <Image
          style={styles.image}
          source={{ uri: image[image.length - 1] }}
        />
      </TouchableOpacity>
    );
  };

  const renderCountOverlay = (more) => {
    const extra = image.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const conditionalRender =
      image.length == 4 || (image.length > +countFrom && +countFrom == 4);
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent3]}
        onPress={() => clickEventListener()}
      >
        <Image
          style={styles.image}
          source={{ uri: conditionalRender ? image[3] : image[4] }}
        />
        <View style={styles.overlayContent}>
          <View>
            <Text style={styles.count}>+{extra}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const imageToShow = [...image];

  if (countFrom && image.length > countFrom) {
    imageToShow.length = countFrom;
  }

  return (
    <View style={styles.container}>
      {[1, 3, 4].includes(imageToShow.length) && renderOne()}
      {imageToShow.length >= 2 && imageToShow.length != 4 && renderTwo()}
      {imageToShow.length >= 4 && renderThree()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
  },
  imageContent: {
    borderWidth: 1,
    borderColor: "black",
    height: 120,
  },
  imageContent1: {
    width: "100%",
  },
  imageContent2: {
    width: "50%",
  },
  imageContent3: {
    width: "33.33%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  //overlay efect
  overlayContent: {
    flex: 1,
    position: "absolute",
    zIndex: 100,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 50,
    color: "#ffffff",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 139, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
export default FbImage;
