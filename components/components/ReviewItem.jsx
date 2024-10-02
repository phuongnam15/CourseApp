import { Box, Image, Text } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";

const ReviewItem = () => {
  return (
    <Box style={styles.reviewContainer}>
      <Image
        size="md"
        alt="avatar"
        style={styles.reviewAvatar}
        source={require("../../assets/images/avatar.jpg")}
      />
      <Box
        style={{
          marginTop: 10,
          marginLeft: 15,
        }}
      >
        <Text 
        // fontFamily="Poppins_600SemiBold"
         style={{ fontWeight: "bold", marginBottom: 10 }}>Người dùng Review</Text>
        <Text 
        // fontFamily="Poppins_400Regular" 
        style={{ fontSize: 12, lineHeight: 16 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          fermentum pharetra sem et placerat. Nam rutrum at magna non pharetra.
          Aliquam erat volutpat. Nulla eget lobortis purus, blandit malesuada
          augue. Duis mauris nisl, maximus in lacus id, condimentum ...
        </Text>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  reviewContainer: {
    position: "relative",
    width: "100%",
    minHeight: 100,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: "absolute",
    left: -20,
    top: 10,
  },
});
export default ReviewItem;
