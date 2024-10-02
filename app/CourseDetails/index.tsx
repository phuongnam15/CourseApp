import Notification from "@/components/components/Notification";
import { useGlobalState } from "@/context/globalContext";
import {
  Box,
  Button,
  ButtonText,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  useToast,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ChevronLeftCircle, Star } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const index = () => {
  const {isLogin} = useGlobalState();
  const toast = useToast();
  const router = useRouter();
  return (
    <View style={{ position: "relative" }}>
      <ScrollView
        style={{
          height: "100%",
          position: "relative",
          backgroundColor: "#e7f1f5",
        }}
      >
        <View
          style={{
            width: "100%",
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 15,
            backgroundColor: "#e7f1f5",
            marginTop: 45,
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 15,
              top: 7.5,
            }}
            onPress={() => {
              router.back();
            }}
          >
            <Icon as={ChevronLeftCircle} size="xl" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              textTransform: "uppercase",
              lineHeight: 35 * 0.75,
              paddingTop: 35 - 35 * 0.75,
            }}
          >
            Chi tiết khoá học
          </Text>
        </View>
        <Image
          source={{
            uri: "https://glints.com/vn/blog/wp-content/uploads/2022/08/Google-Digital-Marketing-khoa%CC%81-ho%CC%A3c-free.jpeg",
          }}
          alt="coverImg"
          style={styles.coverImg}
        />
        <View marginVertical={20} paddingHorizontal={20}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              fontSize={24}
              fontWeight="bold"
              textTransform="uppercase"
              style={{
                lineHeight: 35 * 0.75,
                paddingTop: 35 - 35 * 0.75,
              }}
            >
              Lùa gà Đại pháp
            </Text>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Icon color="#ffc107" size="xs" as={Star} />
              <Text
                ml={3}
                style={{ fontSize: 12 }}
              >
                4.9 (2000+)
              </Text>
            </Box>
          </Box>
          <Text>Phan Lâm - 20 giờ học - 20 bài giảng</Text>
          <Text
            style={{
              fontSize: 24,
              color: "#61bc84",
              lineHeight: 35 * 0.75,
              paddingTop: 35 - 35 * 0.75,
            }}
          >
            299.999đ
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#000",
            }}
          >
            Mô tả
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#000",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
            justo suscipit, faucibus nunc nec, euismod velit. Vivamus tincidunt
            imperdiet risus ac commodo. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Nulla pretium ex bibendum nulla convallis
            egestas. In vel gravida mauris. Curabitur in velit vel lacus
            accumsan feugiat. Morbi malesuada ullamcorper egestas. Vestibulum
            tincidunt ipsum et odio malesuada consectetur. Donec hendrerit sem
            ac tincidunt scelerisque. Aenean laoreet orci eu lobortis rutrum. In
            venenatis nulla eget nisl mollis, at congue turpis accumsan. Vivamus
            at massa convallis, aliquet tortor fermentum, accumsan quam. Mauris
            elementum nec velit rutrum luctus. Aenean convallis est nisi, sit
            amet elementum ipsum dignissim vitae. Proin ut orci faucibus,
            ultrices ligula id, hendrerit nisi. Curabitur ornare gravida arcu,
            id interdum lacus ultrices a. Sed eleifend enim nec justo
            consectetur, in convallis nisl venenatis. Aenean et lacus turpis.
            Praesent congue, eros ac rutrum dapibus, nibh arcu lobortis libero,
            at viverra velit quam quis mauris. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Sed nec nunc
            laoreet, pretium quam eleifend, tempor velit. Sed eget augue ac diam
            imperdiet placerat. Nullam in tincidunt ipsum, sit amet lobortis
            risus. Aliquam pharetra porta pulvinar. Sed scelerisque ullamcorper
            ligula a rutrum. Cras convallis et diam id sagittis. Aliquam ut leo
            a tellus fermentum volutpat non at urna. In hac habitasse platea
            dictumst. Ut gravida dolor enim, sit amet cursus dolor egestas a.
            Cras lacinia, ligula eget fermentum sollicitudin, metus velit
            hendrerit elit, in tempus dolor risus quis mauris. Vestibulum
            lacinia vel metus vel dictum. Cras et elit maximus, congue ante nec,
            aliquet quam. In elementum non est vel viverra. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Vivamus porta ipsum in lorem cursus, a bibendum lacus malesuada.
            Maecenas nisi sem, cursus id dui vel, fermentum iaculis risus.
            Curabitur sagittis efficitur sagittis. Fusce faucibus lectus in
            blandit tincidunt. Sed non risus ullamcorper arcu venenatis vehicula
            ac a lectus. Fusce semper lectus laoreet neque pellentesque porta.
          </Text>
        </View>
      </ScrollView>

      <Button
        onPress={() => {
          if(isLogin){
            router.push("/Checkout/");
          }else{
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
        size="md"
        variant="solid"
        action="primary"
        isFocusVisible={false}
        style={{
          borderRadius: 20,
          paddingLeft: 25,
          paddingRight: 25,
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
        }}
        display="flex"
        backgroundColor="#61bc84"
        justifyContent="center"
        alignItems="center"
      >
        <ButtonText textTransform="uppercase">Đăng ký mua khoá học</ButtonText>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  coverImg: {
    width: "100%",
    height: 250,
    objectFit: "cover",
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
  },
  lessonCount: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 35 * 0.75,
    color: "#EE1D52",
  },
});
export default index;
