import {
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
import { CircleUser, Mail, Phone, Route } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
// import { pick } from "@react-native-documents/picker";
export default function Tab() {
  // const pickFile = async () => {
  //   try {
  //     const [pickResult] = await pick();
  //     // const [pickResult] = await pick({mode:'import'}) // equivalent
  //     // do something with the picked file
  //   } catch (err: unknown) {
  //     // see error handling
  //   }
  // };
  return (
    <ScrollView>
      <View
        style={{
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 60,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          // fontFamily="Poppins_700Bold"
          style={{
            fontWeight: "bold",
            fontSize: 24,
            textTransform: "uppercase",
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 35 * 0.75,
          }}
        >
          Thông tin cá nhân
        </Text>
        <Image
          mt={15}
          size="md"
          alt="avatar"
          style={styles.avaImage}
          source={require("../../../assets/images/avatar.jpg")}
        />
        <TouchableOpacity style={{ marginTop: 5 }}>
          <Text color="#56b7ea">Chọn ảnh đại diện</Text>
        </TouchableOpacity>
        <View
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          rowGap={15}
          style={{ width: "100%" }}
          mt={15}
        >
          <View
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text>Họ và tên</Text>
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={3}
              style={{
                borderRadius: 20,
                borderWidth: 0.3,
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Icon as={CircleUser} size="xl" />
              <Input
                variant="outline"
                size="md"
                style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Họ và tên" />
              </Input>
            </View>
          </View>
          <View
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text>Username</Text>
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={3}
              style={{
                borderRadius: 20,
                borderWidth: 0.3,
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Icon as={CircleUser} size="xl" />
              <Input
                variant="outline"
                size="md"
                style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Username" />
              </Input>
            </View>
          </View>
          <View
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text>Email</Text>
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={3}
              style={{
                borderRadius: 20,
                borderWidth: 0.3,
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Icon as={Mail} size="xl" />
              <Input
                variant="outline"
                size="md"
                style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Email" />
              </Input>
            </View>
          </View>
          <View
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text>Số điện thoại</Text>
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={3}
              style={{
                borderRadius: 20,
                borderWidth: 0.3,
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Icon as={Phone} size="xl" />
              <Input
                variant="outline"
                size="md"
                style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Số điện thoại" />
              </Input>
            </View>
          </View>
          <View
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text>Địa chỉ</Text>
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={3}
              style={{
                borderRadius: 20,
                borderWidth: 0.3,
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Icon as={Route} size="xl" />
              <Input
                variant="outline"
                size="md"
                style={{ borderWidth: 0, width: "90%", marginLeft: 5 }}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Địa chỉ" />
              </Input>
            </View>
          </View>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isFocusVisible={false}
            bg="#56b7ea"
            $hover-bg="$#56b7ea"
            $active-bg="#56b7ea"
            $_text-hover-color="$white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={"100%"}
            mt={20}
            mb={70}
          >
            <ButtonText textTransform="uppercase">Lưu</ButtonText>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  avaImage: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: 9999,
  },
});
