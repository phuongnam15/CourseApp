import { sendGet } from "@/api/axiosClient";
import { useGlobalState } from "@/context/globalContext";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Button,
  ButtonIcon,
  FlatList,
  Icon,
  Image,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Flame, Heart, Star, User } from "lucide-react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const { width: screenWidth } = Dimensions.get("window");
import { Skeleton } from "@rneui/themed";
function formatCurrency(number) {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
export const CourseItem = ({ item }) => {
  const router = useRouter();
  const { setGlobalState } = useGlobalState();
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    if (item && Object.keys(item).length !== 0) {
      setIsloading(false);
    }
  }, [item]);
  return (
    <>
      {isLoading ? (
        <Skeleton height={120} animation="wave" />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setGlobalState({
              id: item?.id,
            });
            router.push(`/CourseInfo`);
          }}
          style={[styles.item, styles.content]}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            style={styles.rating}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>4.9</Text>
            <Icon color="#ffc107" size="xs" ml={1} as={Star} />
          </Box>
          <Button
            style={styles.likeButton}
            borderRadius="$full"
            size="sm"
            padding={10}
            paddingHorizontal={10}
            bg="#e1ffff"
            borderColor="#e1ffff"
          >
            <ButtonIcon as={Heart} color="#006fff" />
          </Button>
          <Image
            source={{ uri: item?.image?.url }}
            style={styles.image}
            alt="category image"
          />
          <Text
            fontFamily="Poppins_600SemiBold"
            style={{
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
            }}
            numberOfLines={2}
          >
            {item?.name}
          </Text>
          <Box
            marginLeft={10}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Icon as={User} size="xs" color="#6c757d" />
            <Text
              // fontFamily="Poppins_400Regular"
              style={{
                fontSize: 12,
                marginLeft: 3,
                color: "#6c757d",
              }}
            >
              {item?.author?.name}
            </Text>
          </Box>

          <Box
            marginLeft={10}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Text
              // fontFamily="Poppins_600SemiBold"
              style={{
                fontSize: 16,
                color: "#56b7ea",
              }}
            >
              {formatCurrency(item?.promote_price)}
            </Text>
            <Badge
              ml={3}
              size="sm"
              variant="solid"
              borderRadius="$lg"
              action="error"
            >
              <BadgeIcon as={Flame} mr="$2" />
              <BadgeText>Best Seller</BadgeText>
            </Badge>
          </Box>
        </TouchableOpacity>
      )}
    </>
  );
};
const Course = ({ data }) => {
  const [listCourse, setListCourse] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: screenWidth / 2,
          marginRight: 15,
          alignItems: "stretch",
        }}
      >
        <CourseItem key={index} item={item} />
      </View>
    );
  };

  // const handleGetListCourse = async () => {
  //   try {
  //     const input = {
  //       category_id: data?.id,
  //     };
  //     const res = await sendGet("/user/course");
  //     setIsloading(false);
  //     setListCourse(
  //       res?.data?.data?.map((item) => {
  //         return {
  //           id: item?.id,
  //           thumbnail:
  //             "https://glints.com/vn/blog/wp-content/uploads/2022/08/Google-Digital-Marketing-khoa%CC%81-ho%CC%A3c-free.jpeg",
  //           text: item?.name,
  //           author: item?.user_name,
  //           description: "20 bài",
  //           price: formatCurrency(item?.price),
  //         };
  //       })
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   if (data) {
  //     handleGetListCourse();
  //   }
  // }, [data]);
  useEffect(() => {
    if (data) {
      setListCourse(data?.courses);
      setIsloading(false);
    }
  }, [data]);
  return (
    <Box style={{ marginTop: 10 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {isLoading ? (
          <Skeleton width={100} height={15} />
        ) : (
          <Text
            // fontFamily="Poppins_700Bold"
            style={{ fontSize: 18, fontWeight: "bold" }}
          >
            {data?.name}
          </Text>
        )}
        <Text
          // fontFamily="Poppins_400Regular"
          style={{ fontSize: 14, fontWeight: "bold", borderBottomWidth: 0.5 }}
        >
          Xem tất cả
        </Text>
      </Box>
      {isLoading ? (
        <Box display="flex" flexDirection="row" columnGap={10}>
          <Skeleton width={200} height={120} />
          <Skeleton width={200} height={120} />
        </Box>
      ) : (
        <FlatList
          data={listCourse}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          initialNumToRender={7}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{
            marginTop: 10,
          }}
        />
      )}
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    position: "relative",
    // width: screenWidth / 2 - 45,
    // width: 230,
    width: "100%",
    // backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 10,
  },
  rating: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  image: {
    resizeMode: "cover",
    objectFit: "cover",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderRadius: 10,
    height: 120,
  },
  content: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#fff",
  },
});
export default Course;
