import {
  Box,
  Button,
  ButtonText,
  Icon,
  Input,
  InputField,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ChevronLeftCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CheckoutItem from "@/components/components/CheckoutItem";
import { LinearGradient } from "expo-linear-gradient";

const index = () => {
  const router = useRouter();
  return (
    <ScrollView
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 15,
          marginTop: 60,
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 15,
            top: 7.5,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <Icon as={ChevronLeftCircle} size="xl" />
        </TouchableOpacity>
        <Text
          // fontFamily="Poppins_700Bold"
          style={{
            fontWeight: "bold",
            fontSize: 24,
            textTransform: "uppercase",
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 35 * 0.75,
          }}
        >
          Thanh toán
        </Text>
      </View>
      <View
        style={styles.border}
      >
        <View style={styles.container}>
          <View rowGap={20}>
            <CheckoutItem />
            <CheckoutItem />
          </View>
        </View>
      </View>
      <View margin={10}>
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
          Voucher
        </Text>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            style={{
              marginTop: 10,
              borderRadius: 20,
              backgroundColor: "#fff",
              width: "70%",
              paddingHorizontal: 20,
              borderWidth: 0.5,
            }}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Input
              variant="outline"
              size="md"
              style={{
                width: "100%",
                borderRadius: 20,
                borderWidth: 0,
              }}
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="Nhập mã khuyến mại ..." />
            </Input>
          </Box>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isFocusVisible={false}
            style={{
              marginTop: 8,
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            bg="#56b7ea"
            $hover-bg="#56b7ea"
            $active-bg="#56b7ea"
            $_text-hover-color="$white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ButtonText textTransform="uppercase">Đổi mã</ButtonText>
          </Button>
        </Box>
      </View>
      <View margin={10}>
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
          Summary
        </Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.itemName}>Khoá học</Text>
            <Text style={styles.itemPrice}>299.999đ</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.itemName}>Giảm giá</Text>
            <Text style={styles.itemPrice}>0đ</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.itemName}>Thuế</Text>
            <Text style={styles.itemPrice}>29.999đ</Text>
          </View>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={10}
            paddingHorizontal={10}
          >
            <Text
              style={styles.itemName}
              fontSize={18}
              fontWeight="bold"
              // fontFamily="Poppins_600SemiBold"
            >
              Tổng tiền
            </Text>
            <Text fontSize={18} fontWeight="bold" style={styles.itemPrice}>
              319.999đ
            </Text>
          </View>
        </View>
        <View
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          margin={10}
          marginTop={20}
          alignItems="center"
        >
          <Box>
            <Text>Tổng tiền</Text>
            <Text mt={5} fontSize={18} fontWeight="bold" style={styles.itemPrice}>
              319.999đ
            </Text>
          </Box>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isFocusVisible={false}
            style={{
              marginTop: 8,
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            bg="#56b7ea"
            $hover-bg="#56b7ea"
            $active-bg="#56b7ea"
            $_text-hover-color="$white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ButtonText textTransform="uppercase">Thanh toán</ButtonText>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // Màu nền của container
    padding: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: "#56b7ea", // Đặt màu sắc của border là trong suốt
    borderRadius: 10,
    overflow: "hidden", // Đảm bảo LinearGradient không bị tràn ra ngoài border
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 1,
  },
  summaryContainer: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#ededed",
    padding: 10,
  },
  summaryItem: {
    borderBottomWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 4,
    marginBottom: 10,
  },
  itemName: {},
  itemPrice: {
    // fontFamily: "Poppins_600SemiBold",
  },
});
export default index;
