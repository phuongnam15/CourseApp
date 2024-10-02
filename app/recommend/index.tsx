import { CourseItem } from "@/components/components/Course";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Icon,
  Image,
  Input,
  InputField,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const index = () => {
  const router = useRouter();
  return (
    <View style={{ backgroundColor: "#69b4ff" }}>

      <ScrollView
        style={{
          marginTop: 60,
          backgroundColor: "#f7f7f7",
        }}
      >
        <View style={{ backgroundColor: "#f7f7f7" }}>
          <View
            style={{
              backgroundColor: "#69b4ff" ,
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
                  source={require("../../assets/images/avatar.jpg")}
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
            height: "88%",
            backgroundColor: "#f7f7f7",
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
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
              Bạn là nghiệp dư
            </Text>
            <Button
              onPress={() => {
                router.push("/tabs/(tabs)/roadmap");
              }}
              size="sm"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              style={{
                borderRadius: 20,
                backgroundColor: "#230B41",
                paddingLeft: 10,
                paddingRight: 10,
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ButtonIcon as={ChevronLeft} />
              <ButtonText>Quay lại </ButtonText>
            </Button>
          </Box>
          <Text
            // fontFamily="Poppins_400Regular_Italic"
            style={{
              marginTop: 10,
              fontSize: 16,
              fontStyle: "italic",
              color: "#000",
              lineHeight: 35 * 0.75,
            }}
          >
            Những khoá học dưới đây có thể sẽ phù hợp với bạn ...
          </Text>
          <Box
            style={{ marginTop: 10, rowGap: 10 }}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="stretch"
          >
            <CourseItem
              item={{
                thumbnail:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNPXo7OdCu_a_ZC3zJ5g5InnXrOxD6phT3l6TgKBiRw&s",
                text: "Lùa gà căn bản",
                author: "Phan Lâm",
                description: "20 bài",
                price: "199.999đ",
              }}
            />
            <CourseItem
              item={{
                thumbnail:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNPXo7OdCu_a_ZC3zJ5g5InnXrOxD6phT3l6TgKBiRw&s",
                text: "Lùa gà căn bản",
                author: "Phan Lâm",
                description: "20 bài",
                price: "199.999đ",
              }}
            />
            <CourseItem
              item={{
                thumbnail:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNPXo7OdCu_a_ZC3zJ5g5InnXrOxD6phT3l6TgKBiRw&s",
                text: "Lùa gà căn bản",
                author: "Phan Lâm",
                description: "20 bài",
                price: "199.999đ",
              }}
            />
            <CourseItem
              item={{
                thumbnail:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNPXo7OdCu_a_ZC3zJ5g5InnXrOxD6phT3l6TgKBiRw&s",
                text: "Lùa gà căn bản",
                author: "Phan Lâm",
                description: "20 bài",
                price: "199.999đ",
              }}
            />
            <CourseItem
              item={{
                thumbnail:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNPXo7OdCu_a_ZC3zJ5g5InnXrOxD6phT3l6TgKBiRw&s",
                text: "Lùa gà căn bản",
                author: "Phan Lâm",
                description: "20 bài",
                price: "199.999đ",
              }}
            />
          </Box>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
