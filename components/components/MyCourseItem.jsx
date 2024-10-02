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
import { Flame, User } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";

const MyCourseItem = () => {
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
        <Box ml={10}>
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
          <Badge
            mt={5}
            size="sm"
            variant="solid"
            borderRadius="$lg"
            action="error"
          >
            <BadgeIcon as={Flame} mr="$2" />
            <BadgeText>Best Seller</BadgeText>
          </Badge>
        </Box>
      </Box>
      <Box mt={6}>
        <Text
          // fontFamily="Poppins_600SemiBold"
          style={{
            fontSize: 14,
            color: "#6c757d",
            fontWeight: "bold",
          }}
        >
          Progress
        </Text>
        <Box
          mt={3}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            // fontFamily="Poppins_600SemiBold"
            style={{
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            20 / 29 lessons
          </Text>
          <Text
            // fontFamily="Poppins_600SemiBold"
            style={{
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {Math.floor((20 / 29) * 100)}% Hoàn thành
          </Text>
        </Box>
        <Box mt={10}>
          <Progress value={Math.floor((20 / 29) * 100)} h="$2" size="sm">
            <ProgressFilledTrack bg="#69b4ff" />
          </Progress>
        </Box>
        <Button
          onPress={() => {
            router.push('/lessonDetails/')
          }}
          mt={15}
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
export default MyCourseItem;
