import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonIcon,
  Icon,
  Input,
  InputField,
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Search, ShoppingCart } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import WhishlistItem from "@/components/components/WishlistItem";
import { useRouter } from "expo-router";
const recommend = () => {
  const router = useRouter();
  return (
    <View
      style={{backgroundColor: '#69b4ff'}}
    >
      <ScrollView
        style={{
          marginTop: 60,
        }}
      >
        <View style={{ backgroundColor: "#f7f7f7" }}>
          <View
            style={{
              backgroundColor: '#69b4ff',
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
                  style={{
                    fontWeight: "bold",
                    fontSize: 24,
                    lineHeight: 35 * 0.75,
                    paddingTop: 35 - 35 * 0.75,
                  }}
                >
                  Khoá học yêu thích
                </Text>
                {/* <Text
                fontFamily="Poppins_400Regular_Italic"
                style={{
                  fontStyle: "italic",
                  fontSize: 14,
                }}
                color="#fff"
              >
                Let's start learning!
              </Text> */}
              </Box>
              <VStack>
                <Badge
                  h={23}
                  w={23}
                  bg="$red600"
                  borderRadius="$full"
                  mb={-14}
                  mr={-5}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                >
                  <BadgeText color="$white">2</BadgeText>
                </Badge>
                <Button
                  onPress={() => {
                    router.push("/Checkout/");
                  }}
                  borderRadius="$full"
                  size="lg"
                  p={1}
                  paddingHorizontal={15}
                  bg="#56b7ea"
                  borderColor="#56b7ea"
                >
                  <ButtonIcon as={ShoppingCart} />
                </Button>
              </VStack>
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
            height: "100%",
            backgroundColor: "#f7f7f7",
            paddingTop: 30,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 40,
          }}
        >
          <View rowGap={15} >
            <WhishlistItem />
            <WhishlistItem />
            <WhishlistItem />
            <WhishlistItem />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});
export default recommend;
