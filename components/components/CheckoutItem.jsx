import { Box, Icon, Image, Text } from "@gluestack-ui/themed";
import { PlayCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";

const CheckoutItem = () => {
  return (
    <Box style={styles.checkoutContainer}>
      <Box position="relative">
        <Image
          source={{
            uri: "https://glints.com/vn/blog/wp-content/uploads/2022/08/Google-Digital-Marketing-khoa%CC%81-ho%CC%A3c-free.jpeg",
          }}
          alt="checkoutImg"
          style={styles.checkoutImg}
        />
        <Icon style={styles.iconCheckout} as={PlayCircle} size="xl" />
      </Box>
      <Box style={{ marginLeft: 5 }}>
        <Text
          fontSize={18}
          fontWeight="bold"
          textTransform="uppercase"
          // fontFamily="Poppins_600SemiBold"
          style={{
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 35 * 0.75,
          }}
        >
          Lùa gà Đại pháp
        </Text>
        <Text
          // fontFamily="Poppins_600SemiBold"
          style={{
            fontSize: 16,
            color: "#56b7ea",
          }}
        >
          299.999đ
        </Text>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  checkoutContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkoutImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  iconCheckout: {
    position: "absolute",
    right: 5,
    top: 2,
  },
});
export default CheckoutItem;
