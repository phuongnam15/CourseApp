import { sendGet, sendPost } from "@/api/axiosClient";
import CheckoutItem from "@/components/components/CheckoutItem";
import { formatCurrency } from "@/components/components/Course";
import { useGlobalState } from "@/context/globalContext";
import {
  Box,
  Button,
  ButtonText,
  Icon,
  Image,
  Input,
  InputField,
  ScrollView,
  Spinner,
  Text,
  View,
} from "@gluestack-ui/themed";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import { ChevronLeftCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, TouchableOpacity } from "react-native";
const index = () => {
  const router = useRouter();
  const { cartList, setCartList } = useGlobalState();
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [orderDetail, setOrderDetail] = useState({} as any);
  const [paymentState, setPaymentState] = useState(false);
  const handleGetListCart = async () => {
    try {
      const res: any = await sendGet(`/user/cart`);
      if (res.success) {
        setCartList(res.data.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleCreateOrder = async () => {
    try {
      setLoadingOrder(true);
      const res: any = await sendPost("/user/order");
      if (res.success) {
        setLoadingOrder(false);
        setOrderDetail(res?.data?.data);
        setPaymentState(true);
        handleGetListCart();
      } else {
        setLoadingOrder(false);
      }
      // Call API to create order
      // If success, navigate to order detail page
      // If fail, show error message
      // setLoadingOrder(false)
    } catch (err) {
      setLoadingOrder(false);
      console.log(err);
    }
  };
  const saveImage = async (imageUri: string) => {
    try {
      // Kiểm tra và yêu cầu quyền truy cập thư viện ảnh
      if (Platform.OS === "ios") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access media library is required!");
          return;
        } else {
        }
      }

      // Tải ảnh xuống thư mục tạm thời
      const fileUri = FileSystem.cacheDirectory + "qr_image.jpg"; // Đặt tên tệp có phần mở rộng phù hợp
      const downloadResumable = FileSystem.createDownloadResumable(
        imageUri,
        fileUri
      );
      const downloadResult = await downloadResumable.downloadAsync();
      // Kiểm tra kết quả tải xuống
      if (!downloadResult || !downloadResult.uri) {
        Alert.alert("Error downloading image!");
        return;
      }

      // // Lưu ảnh vào thư viện
      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      Alert.alert("Image saved to library!");
    } catch (error) {
      console.log(error, "erorrrrr");
      Alert.alert("Error saving image!");
    }
  };

  return (
    <ScrollView
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      {paymentState ? (
        <>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              width: "100%",
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 15,
              marginTop: 45,
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
            {loadingOrder ? (
              <Box
                my={10}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner size="large" />
              </Box>
            ) : (
              <Box>
                {orderDetail && orderDetail.id && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    margin={10}
                    marginTop={50}
                  >
                    <Image
                      source={{ uri: orderDetail?.qr }}
                      style={{ width: 300, height: 400 }}
                      alt="QR Code"
                    />
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
                      bg="#22c55e"
                      $hover-bg="#22c55e"
                      $active-bg="#22c55e"
                      $_text-hover-color="$white"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <ButtonText
                        onPress={() => {
                          saveImage(orderDetail?.qr);
                        }}
                        textTransform="uppercase"
                      >
                        Tải ảnh xuống
                      </ButtonText>
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              width: "100%",
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 15,
              marginTop: 45,
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
          <View style={styles.border}>
            <View style={styles.container}>
              <View rowGap={20}>
                {cartList && cartList.length !== 0 && (
                  <>
                    {cartList.map((item: any, index: any) => (
                      <CheckoutItem data={item} key={index} />
                    ))}
                  </>
                )}
              </View>
            </View>
          </View>
          <View margin={10}>
            <Text
              fontSize={18}
              fontWeight="bold"
              textTransform="uppercase"
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
                bg="#61bc84"
                $hover-bg="#61bc84"
                $active-bg="#61bc84"
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
                <Text style={styles.itemPrice}>
                  {formatCurrency(
                    cartList
                      ?.map((item: any) =>
                        item.course.is_promote == 0
                          ? item?.course?.price
                          : item?.course?.promote_price
                      )
                      .reduce(
                        (accumulator: any, currentValue: any) =>
                          accumulator + currentValue,
                        0
                      )
                  )}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.itemName}>Giảm giá</Text>
                <Text style={styles.itemPrice}>{formatCurrency(0)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.itemName}>Thuế</Text>
                <Text style={styles.itemPrice}>{formatCurrency(0)}</Text>
              </View>
              <View
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={10}
                paddingHorizontal={10}
              >
                <Text style={styles.itemName} fontSize={18} fontWeight="bold">
                  Tổng tiền
                </Text>
                <Text fontSize={18} fontWeight="bold" style={styles.itemPrice}>
                  {formatCurrency(
                    cartList
                      ?.map((item: any) =>
                        item.course.is_promote == 0
                          ? item?.course?.price
                          : item?.course?.promote_price
                      )
                      .reduce(
                        (accumulator: any, currentValue: any) =>
                          accumulator + currentValue,
                        0
                      )
                  )}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}

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
            {formatCurrency(
              paymentState
                ? orderDetail?.total
                : cartList
                    ?.map((item: any) =>
                      item.course.is_promote == 0
                        ? item?.course?.price
                        : item?.course?.promote_price
                    )
                    .reduce(
                      (accumulator: any, currentValue: any) =>
                        accumulator + currentValue,
                      0
                    )
            )}
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
          isDisabled={loadingOrder}
          bg="#61bc84"
          $hover-bg="#61bc84"
          $active-bg="#61bc84"
          $_text-hover-color="$white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onPress={handleCreateOrder}
        >
          <ButtonText textTransform="uppercase">Thanh toán</ButtonText>
        </Button>
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
    borderColor: "#61bc84", // Đặt màu sắc của border là trong suốt
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
  itemPrice: {},
});
export default index;
