import { Box, Icon, Image, Text } from "@gluestack-ui/themed";
import { PlayCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { formatCurrency } from "./Course";

const CheckoutItem = ({data}) => {
  return (
    <Box style={styles.checkoutContainer}>
      <Box position="relative">
        <Image
          source={{
            uri: data?.course?.image?.url,
          }}
          alt="checkoutImg"
          style={styles.checkoutImg}
        />
        <Icon style={styles.iconCheckout} as={PlayCircle} size="xl" />
      </Box>
      <Box style={{ marginLeft: 5 }}>
        <Text
          isTruncated
          // fontSize={18}
          size="sm"
          fontWeight="bold"
          textTransform="uppercase"
          style={{
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 35 * 0.75,
            width: 300
          }}
        >
          {data?.course?.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#61bc84",
          }}
        >
         {formatCurrency(data?.course?.is_promote === 1 ? Number(data?.course?.promote_price) : Number(data?.course?.price))}
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
