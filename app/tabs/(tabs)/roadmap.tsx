import {
  Box,
  Button,
  ButtonText,
  Icon,
  Image,
  Input,
  InputField,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Bell, Search } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
const roadmap = () => {
  const router = useRouter();
  return (
    <View style={{ backgroundColor: "#69b4ff" }}>
      <ScrollView
        style={{
          marginTop: 60,
          backgroundColor: "#f7f7f7",
          height: "100%",
        }}
      >
        <View style={{ backgroundColor: "#f7f7f7" }}>
          <View
            style={{
              backgroundColor: "#69b4ff",
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              paddingBottom: 20,
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              <Box display="flex" flexDirection="column">
                <Text
                  // fontFamily="Poppins_700Bold"
                  color="#fff"
                  style={{ fontWeight: "bold", fontSize: 18 }}
                >
                  Good Morning, Đatprs
                </Text>
                <Text
                  // fontFamily="Poppins_400Regular_Italic"
                  style={{
                    fontStyle: "italic",
                    fontSize: 14,
                  }}
                  color="#fff"
                >
                  Let's start learning!
                </Text>
              </Box>

              <Box>
                <Image
                  size="md"
                  alt="avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                  }}
                  source={require("../../../assets/images/avatar.jpg")}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                style={{
                  marginTop: 10,
                  borderRadius: 20,
                  backgroundColor: "#fff",
                  width: "85%",
                  paddingHorizontal: 20,
                }}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Icon as={Search} size="xl" />
                <Input
                  variant="outline"
                  size="md"
                  style={{
                    width: "90%",
                    borderRadius: 20,
                    marginLeft: 5,
                    borderWidth: 0,
                  }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    // id="username"
                    // value={formData.username}
                    // onChangeText={(e) => {
                    //   handleChange("username", e);
                    // }}
                    placeholder="Search for anything ..."
                  />
                </Input>
              </Box>
            </Box>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#f7f7f7",
            paddingTop: 30,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 40,
          }}
        >
          <Text
            // fontFamily="Poppins_700Bold"
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
              onPress={() => {
                router.push("/recommend/");
              }}
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
              <Text
                // fontFamily="Poppins_600SemiBold"
                style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}
              >
                Nghiệp dư
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/recommend/");
              }}
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
              <Text
                // fontFamily="Poppins_600SemiBold"
                style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}
              >
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
                // fontFamily="Poppins_400Regular"
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
              // fontFamily="Poppins_600SemiBold"
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
      </ScrollView>
    </View>
  );
};

export default roadmap;
