import DefaultHeader from "@/components/components/Header/DefaultHeader";
import Notification from "@/components/components/Notification";
import { useGlobalState } from "@/context/globalContext";
import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  useToast,
} from "@gluestack-ui/themed";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Bell, LogIn, ShoppingCart } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
const roadmap = () => {
  const router = useRouter();
  const { userData, cartList, isLogin } = useGlobalState();
  const toast = useToast();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#2E8B57",
        flex: 1,
        display: "flex",
        paddingBottom: -insets.bottom,
      }}
    >
      <DefaultHeader />
      <View
        style={{
          backgroundColor: "#f7f7f7",
          paddingTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 40,
          flex: 1
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "#000",
            fontWeight: "bold",
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 35 * 0.75,
          }}
        >
          Bạn là ...
        </Text>
        <Box
          style={{ marginTop: 70 }}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <TouchableOpacity
            // onPress={() => {
            //   router.push("/recommend/");
            // }}
            style={{
              width: "48%",
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              height: 160,
              position: "relative",
              paddingBottom: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              size="md"
              alt="avatar"
              style={{
                width: "100%",
                height: 200,
                marginTop: -70,
                objectFit: "cover",
              }}
              source={require("../../../assets/images/beginer.png")}
            />
            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
              Nghiệp dư
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   router.push("/recommend/");
            // }}
            style={{
              width: "48%",
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              height: 160,
              position: "relative",
              paddingBottom: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              size="md"
              alt="avatar"
              style={{
                width: "100%",
                height: 200,
                marginTop: -70,
                objectFit: "cover",
              }}
              source={require("../../../assets/images/pro.png")}
            />
            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
              Chuyên nghiệp
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          display="flex"
          style={{
            marginTop: 30,
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            padding: 20,
            paddingStart: 10,
          }}
          flexDirection="column"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Icon as={Bell} size="lg" color="#000" />
            <Text
              style={{
                fontSize: 14,
                color: "#000",
                marginLeft: 5,
              }}
            >
              Tham gia cộng đồng
            </Text>
          </Box>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              color: "#000",
              marginLeft: 5,
              fontWeight: "bold",
            }}
          >
            Cộng đồng lùa gà và đàn gà lớn nhất Việt Nam
          </Text>
          <Box
            style={{ marginTop: 20 }}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              style={{
                borderRadius: 20,
                backgroundColor: "#230B41",
                paddingLeft: 25,
                paddingRight: 25,
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onPress={() => Linking.openURL("https://expo.dev")}
            >
              <ButtonText>Tham gia ngay</ButtonText>
            </Button>
          </Box>
        </Box>
      </View>
    </SafeAreaView>
  );
};

export default roadmap;
