import { useGlobalState } from "@/context/globalContext";
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
import { StyleSheet, TouchableOpacity } from "react-native";

const MyCourseItem = ({
  avatar,
  title,
  author,
  totalLearn,
  totalLessons,
  data,
}) => {
  const { setIdLesson, setGlobalState } = useGlobalState();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        setGlobalState({
          id: data?.course?.id,
        });
        router.push(`/CourseInfo`);
      }}
      style={styles.myCourseContainer}
    >
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        <Image
          source={{
            uri: avatar,
          }}
          alt="coverImg"
          style={styles.myCourseImg}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          ml={10}
        >
          <Text
            fontSize={14}
            fontWeight="bold"
            textTransform="uppercase"
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{
              // lineHeight: 35 * 0.75,
              // paddingTop: 35 - 35 * 0.75,
              fontWeight: "bold",
              // width: 280,
              width: 200,
            }}
          >
            {title}
          </Text>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Icon as={User} size="xs" color="#6c757d" />
            <Text
              style={{
                fontSize: 12,
                marginLeft: 5,
                color: "#6c757d",
              }}
            >
              {author}
            </Text>
          </Box>
          <Badge
            mt={5}
            size="sm"
            variant="solid"
            borderRadius="$lg"
            action="error"
            width={120}
            direction="flex"
            alignItems="center"
            justifyContent="center"
          >
            <BadgeIcon as={Flame} mr="$2" />
            <BadgeText>Best Seller</BadgeText>
          </Badge>
        </Box>
      </Box>
      <Box mt={6}>
        <Text
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
            style={{
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {totalLearn} / {totalLessons} lessons
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {Math.floor((20 / 29) * 100)}% Hoàn thành
          </Text>
        </Box>
        <Box mt={10}>
          <Progress
            value={Math.floor((totalLearn / totalLessons) * 100)}
            h="$2"
            size="sm"
          >
            <ProgressFilledTrack bg="#2E8B57" />
          </Progress>
        </Box>
        <Button
          onPress={(e) => {
            e.stopPropagation();
            if (totalLearn !== 0) {
              setIdLesson(data.course.lessions[totalLearn - 1].id);
              router.push(`/lessonDetails/`);
            }else{
              setIdLesson(data.course.lessions[0].id);
              router.push(`/lessonDetails/`);
            }
          }}
          mt={15}
          size="md"
          variant="outline"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          borderColor="#2E8B57"
        >
          <ButtonText color="#2E8B57">Bắt đầu học </ButtonText>
        </Button>
      </Box>
    </TouchableOpacity>
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
