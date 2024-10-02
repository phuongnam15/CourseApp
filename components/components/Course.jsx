import { sendPost } from "@/api/axiosClient";
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
  useToast,
} from "@gluestack-ui/themed";
import { Skeleton } from "@rneui/themed";
import { useRouter } from "expo-router";
import { Flame, ShoppingCart, Star, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Notification from "./Notification";
const { width: screenWidth } = Dimensions.get("window");
export function formatCurrency(number) {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
export const CourseItem = ({ item }) => {
  const router = useRouter();
  const { setGlobalState, setCartList, isLogin, myCourseList } =
    useGlobalState();
  const [isLoading, setIsloading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    if (item && Object.keys(item).length !== 0) {
      setIsloading(false);
    }
  }, [item]);
  const handleAddCart = async () => {
    try {
      if (isLogin) {
        const res = await sendPost(`/user/cart`, {
          course_id: item?.id,
        });
        if (res.success === true) {
          setCartList((prevState) => [...prevState, res.data.data]);
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Notification
                  id={toastId}
                  description="Thêm vào giỏ hàng thành công"
                  color="success"
                  title="Thành công"
                />
              );
            },
          });
        }
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
    } catch (err) {
      console.log(err);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Notification
              id={toastId}
              description={err?.response?.data?.error_msg}
              color="error"
              title="Lỗi"
            />
          );
        },
      });
    }
  };
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
          {/* <Button
            style={styles.likeButton}
            borderRadius="$full"
            size="sm"
            padding={10}
            paddingHorizontal={10}
            bg="#c6ffe6"
            borderColor="#c6ffe6"
          >
            <ButtonIcon as={Heart} color="#2E8B57" />
          </Button> */}
          {!myCourseList?.map((item) => item.course.id).includes(item.id) && (
            <Button
              style={styles.cartButton}
              borderRadius="$full"
              size="sm"
              padding={10}
              paddingHorizontal={10}
              bg="#c6ffe6"
              borderColor="#c6ffe6"
              onPress={handleAddCart}
            >
              <ButtonIcon as={ShoppingCart} color="#2E8B57" />
            </Button>
          )}
          <Image
            source={{ uri: item?.image?.url }}
            style={styles.image}
            alt="category image"
          />
          <Text
            style={{
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 14,
              marginLeft: 10,
              marginRight: 10
            }}
            marginBottom={5}
            numberOfLines={2}
          >
            {item?.name}
          </Text>
          <Box
            marginLeft={10}
            marginRight={10}
            marginBottom={5}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Icon as={User} size="xs" color="#6c757d" />
            <Text
              style={{
                fontSize: 10,
                marginLeft: 3,
                color: "#6c757d",
              }}
            >
              {item?.author?.name}
            </Text>
          </Box>

          <Box
            marginLeft={10}
            marginRight={10}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#61bc84",
              }}
            >
              {formatCurrency(item?.is_promote == 0
                          ? item?.price
                          : item?.promote_price)}
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
          // width: screenWidth / 2,
          width: 280,
          marginRight: 15,
          alignItems: "stretch",
        }}
      >
        <CourseItem key={index} item={item} />
      </View>
    );
  };

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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data?.name}</Text>
        )}
        <Text
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
  cartButton: {
    position: "absolute",
    top: 10,
    // right: 50,
    right: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  image: {
    resizeMode: "cover",
    objectFit: "cover",
    width: "100%",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderRadius: 10,
    height: 120,
  },
  content: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#fff",
  },
});
export default Course;
