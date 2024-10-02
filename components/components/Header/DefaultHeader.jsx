import { useGlobalState } from "@/context/globalContext";
import { Badge, BadgeText, Box, Button, ButtonIcon, Text, useToast, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { LogIn, ShoppingCart } from "lucide-react-native";
import React from "react";

const DefaultHeader = () => {
  const { userData, cartList, isLogin } = useGlobalState();
  const toast = useToast();
  const router = useRouter();

  return (
    <View style={{ backgroundColor: "#f7f7f7" }}>
      <View
        style={{
          backgroundColor: "#2E8B57",
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
            <Text color="#fff" style={{ fontWeight: "bold", fontSize: 18 }}>
              Good Morning, {userData?.name ? userData?.name : "User"}
            </Text>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 14,
              }}
              color="#fff"
            >
              Let's start learning!
            </Text>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="flex-end">
            <Box>
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
                <BadgeText color="$white">
                  {cartList?.length > 0 ? cartList?.length : 0}
                </BadgeText>
              </Badge>
              <Button
                onPress={() => {
                  if (isLogin) {
                    router.push("/Checkout/");
                  } else {
                    toast.show({
                      placement: "top",
                      render: ({ id }) => {
                        const toastId = "toast-" + id;
                        return (
                          <Notification
                            id={toastId}
                            description="Bạn cần đăng nhập để tiếp tục"
                            color="error"
                            title="Lỗi"
                          />
                        );
                      },
                    });
                  }
                }}
                borderRadius="$full"
                size="lg"
                p={1}
                paddingHorizontal={15}
                bg="#61bc84"
                borderColor="#61bc84"
              >
                <ButtonIcon as={ShoppingCart} />
              </Button>
            </Box>
            {!isLogin && (
              <Button
                onPress={() => {
                  router.push("/login/");
                }}
                borderRadius="$full"
                size="lg"
                p={1}
                ml={5}
                paddingHorizontal={15}
                bg="#61bc84"
                borderColor="#61bc84"
              >
                <ButtonIcon as={LogIn} />
              </Button>
            )}
          </Box>
        </Box>
      </View>
    </View>
  );
};

export default DefaultHeader;
