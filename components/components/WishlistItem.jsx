import {
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Button,
  ButtonText,
  Icon,
  Image,
  Progress,
  ProgressFilledTrack,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { BookCheck, Clock9, Flame, User } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
const WishlistItem = () => {
  const router = useRouter();
  return (
    <View style={styles.myCourseContainer}>
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        <Image
          source={{
            uri: "https://glints.com/vn/blog/wp-content/uploads/2022/08/Google-Digital-Marketing-khoa%CC%81-ho%CC%A3c-free.jpeg",
          }}
          alt="coverImg"
          style={styles.myCourseImg}
        />
        <Box ml={10} mt={-15}>
          <Text
            fontSize={16}
            fontWeight="bold"
            textTransform="uppercase"
            // fontFamily="Poppins_600SemiBold"
            style={{
              lineHeight: 35 * 0.75,
              paddingTop: 35 - 35 * 0.75,
              fontWeight: "bold",
            }}
          >
            Khoá học lùa gà
          </Text>
          <Box display="flex">
            <Box display="flex" flexDirection="row" alignItems="center">
              <Icon as={User} size="xs" color="#6c757d" />
              <Text
                // fontFamily="Poppins_400Regular"
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  color: "#6c757d",
                }}
              >
                Phan Lâm
              </Text>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Icon as={BookCheck} size="xs" color="#69b4ff" />
              <Text
                // fontFamily="Poppins_400Regular"
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  color: "#6c757d",
                }}
              >
                20 bài giảng
              </Text>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Icon as={Clock9} size="xs" color="$yellow500" />
              <Text
                // fontFamily="Poppins_400Regular"
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  color: "#6c757d",
                }}
              >
                10 giờ
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={5} display="flex" flexDirection="row" alignItems="center">
        <Text
          // fontFamily="Poppins_600SemiBold"
          style={{
            fontSize: 16,
            color: "#56b7ea",
          }}
        >
          199.999đ
        </Text>
        <Badge
          ml={10}
          size="sm"
          variant="solid"
          borderRadius="$lg"
          action="error"
        >
          <BadgeIcon as={Flame} mr="$2" />
          <BadgeText>Best Seller</BadgeText>
        </Badge>
      </Box>
      <Box mt={5}>
        <Button
          onPress={() => {
            router.push("/CourseDetails/");
          }}
          size="md"
          variant="outline"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          borderColor="#69b4ff"
        >
          <ButtonText color="#69b4ff">Bắt đầu học </ButtonText>
        </Button>
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  myCourseContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "100%",
    padding: 15,
  },
  myCourseImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
export default WishlistItem;
