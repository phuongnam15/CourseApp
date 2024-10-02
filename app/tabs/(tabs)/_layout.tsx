import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { View } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";
const RoundedIconButton = ({ color }: any) => {
  return (
    <LinearGradient
      colors={["#0097b2", "#7ed957"]}
      start={{ x: 0, y: 0 }} // Điểm bắt đầu ở góc trên bên trái
      end={{ x: 1, y: 0 }} // Điểm kết thúc ở góc trên bên phải
      style={{
        ...styles.buttonContainer,
      }}
    >
      <View style={styles.shadowButton}>
        <Plus size={40} color="#fff" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    top: -23,
    // Sử dụng bóng nhưng chỉ áp dụng cho nửa trên của hình tròn
  },
  shadowButton: {
    shadowColor: "#0097b2",
    shadowOffset: {
      width: 0,
      height: 12, // Điều chỉnh độ cao của bóng theo nhu cầu của bạn
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    color: "#fff",
  },
});
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#69b4ff",
        headerShown: useClientOnlyValue(false, true),
        headerShadowVisible: true,
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          // borderTopLeftRadius: 21,
          // borderTopRightRadius: 21,
          backgroundColor: "#fff",
          position: "relative",
          bottom: 0,
          width: "100%",
          zIndex: 0,
          borderWidth: 0,
          borderTopWidth: 0,
          paddingBottom: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                paddingTop: 10,
                borderTopLeftRadius: 30,
              }}
            >
              <Svg height={28} viewBox="0 0 512 512" width={28}>
                <Path
                  d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0"
                  fill={color} // Thay đổi màu fill ở đây
                />
              </Svg>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          title: "roadmap",

          tabBarIcon: ({ color }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                paddingTop: 10,
              }}
            >
              <Svg
                id="Bahan_copy_2"
                height={28}
                viewBox="0 0 64 64"
                width={28}
                data-name="Bahan copy 2"
              >
                <G fill={color}>
                  <Path d="m33.42 56.71h-8.76a7.55849 7.55849 0 0 1 -2.1-.21 4.02472 4.02472 0 0 0 3.98 3.5h4.99a4.03477 4.03477 0 0 0 3.99-3.5 7.56093 7.56093 0 0 1 -2.1.21z" />
                  <Path d="m42.32 4.63a12.185 12.185 0 1 0 12.18 12.18 12.20371 12.20371 0 0 0 -12.18-12.18zm-.88 19.46a1.0002 1.0002 0 0 1 2 .00006 1.0002 1.0002 0 0 1 -2-.00006zm3.34-8.09a3.401 3.401 0 0 0 -1.46 2.89v1.39a1.00011 1.00011 0 0 1 -2 0v-1.39a5.42049 5.42049 0 0 1 2.38-4.58 2.58791 2.58791 0 1 0 -3.97-2.18 1.00012 1.00012 0 0 1 -2-.00008 4.59044 4.59044 0 1 1 7.05 3.87008z" />
                  <Path d="m19.21 50.02a5.04891 5.04891 0 0 0 5.04 4.69h9.58a5.04891 5.04891 0 0 0 5.04-4.69z" />
                  <Path d="m19.19 44.87v3.15c.30085-.002 19.7 0 19.7 0v-3.15z" />
                  <Path d="m42.67 30.99a14.17894 14.17894 0 0 1 -9.96-24.61 13.08336 13.08336 0 0 1 2.02-1.53 19.17483 19.17483 0 0 0 -3.46-.73c-11.34541-1.51062-21.95971 8.01841-21.76984 19.42016a19.51656 19.51656 0 0 0 6.63984 14.67984 8.963 8.963 0 0 1 2.79 4.65c.26059.01728 20.23 0 20.23 0a9.54 9.54 0 0 1 2.92-4.77 19.71734 19.71734 0 0 0 5.39-8.07 13.7311 13.7311 0 0 1 -4.8.96z" />
                </G>
              </Svg>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          tabBarShowLabel: false,
          title: "tab2",
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                paddingVertical: 10,
                borderRadius: 50,
                position: 'absolute',
                top: -30
              }}
            >
              <View style={{
                padding: 10,
                backgroundColor: "#69b4ff",
                borderRadius: 50,
              }}>
                <Svg
                  id="a24c74f5-a39f-47b8-9d42-b9c6ea82ba6c"
                  height={30}
                  viewBox="0 0 64 64"
                  width={30}
                  data-name="gllyph"
                >
                  <Path
                    fill="#fff"
                    d="m56.15 7.6h-48.3a3.85807 3.85807 0 0 0 -3.85 3.85v3.92h56v-3.92a3.85807 3.85807 0 0 0 -3.85-3.85zm-44.68 5.35a1.47014 1.47014 0 0 1 0-2.94 1.47014 1.47014 0 0 1 0 2.94zm7.41 0a1.47016 1.47016 0 0 1 .00007-2.94 1.47016 1.47016 0 0 1 -.00007 2.94zm7.42 0a1.47014 1.47014 0 0 1 .00006-2.94 1.47014 1.47014 0 0 1 -.00006 2.94z"
                  />
                  <Path
                    fill="#fff"
                    d="m4 17.37v35.18a3.85805 3.85805 0 0 0 3.85 3.85h48.3a3.85805 3.85805 0 0 0 3.85-3.85v-35.18zm14.06 3.86a1.001 1.001 0 0 1 1.17-.98l12.77 2.26 12.77-2.26a.99239.99239 0 0 1 1.17.98v19.27a.98713.98713 0 0 1 -.72.96l-12.95 3.65a.93205.93205 0 0 1 -.54 0l-12.95-3.65a.98713.98713 0 0 1 -.72-.96zm30.64 30.13h-7.01a3.18647 3.18647 0 0 1 -6.04 0h-20.35a1.00012 1.00012 0 0 1 0-2h20.35a3.17726 3.17726 0 0 1 6.04 0h7.01a1.00011 1.00011 0 0 1 0 2z"
                  />
                  <Path
                    fill="#fff"
                    d="m43.94 39.74v-17.32l-10.94 1.94v13.28a1.00011 1.00011 0 0 1 -2 0v-13.28l-10.94-1.94v17.32l11.94 3.37zm-15.23-5.29-4.54 2.49a1.90919 1.90919 0 0 1 -2.81-1.7l.12-5.18a1.85844 1.85844 0 0 1 .98-1.62 1.87863 1.87863 0 0 1 1.89.04l4.43 2.69a1.90419 1.90419 0 0 1 -.07 3.28z"
                  />
                  <Path fill="#fff" d="m23.37 35.1 4.22-2.32-4.12-2.5z" />
                  <Path
                    fill="#fff"
                    d="m38.67 49.17a1.18012 1.18012 0 0 0 0 2.36 1.18012 1.18012 0 0 0 0-2.36z"
                  />
                </Svg>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="recommend"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          title: "recommend",

          tabBarIcon: ({ color }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                paddingTop: 10,
              }}
            >
              <Svg
                id="Capa_1"
                height={28}
                viewBox="0 0 512.001 512.001"
                width={28}
              >
                <Path
                  fill={color}
                  d="m256.001 477.407c-2.59 0-5.179-.669-7.499-2.009-2.52-1.454-62.391-36.216-123.121-88.594-35.994-31.043-64.726-61.833-85.396-91.513-26.748-38.406-40.199-75.348-39.982-109.801.254-40.09 14.613-77.792 40.435-106.162 26.258-28.848 61.3-44.734 98.673-44.734 47.897 0 91.688 26.83 116.891 69.332 25.203-42.501 68.994-69.332 116.891-69.332 35.308 0 68.995 14.334 94.859 40.362 28.384 28.563 44.511 68.921 44.247 110.724-.218 34.393-13.921 71.279-40.728 109.632-20.734 29.665-49.426 60.441-85.279 91.475-60.508 52.373-119.949 87.134-122.45 88.588-2.331 1.354-4.937 2.032-7.541 2.032z"
                />
              </Svg>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          title: "setting",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                paddingTop: 10,
                borderTopRightRadius: 30,
              }}
            >
              <Svg
                id="Layer_2_00000148651498550338436600000007652232191917608622_"
                height={28}
                viewBox="0 0 512 512"
                width={28}
              >
                <G fill={color} id="Icon">
                  <G id="UserGear">
                    <Path d="m360.1 467.2h-312.7c-27.1 0-46.4-26.4-38.1-52.2l32.9-102.8c10.6-33 46.7-50.1 78.9-37.6 21.4 8.3 48.9 14.8 82.6 14.8s61.2-6.5 82.6-14.8c6.8-2.6 13.9-4 20.8-4.1l1.4.8c-.1 1.5-.1 2.9-.1 4.4s0 3 .1 4.4l-1.6.9c-16.1 9.3-21.7 30-12.4 46.1l11.8 20.4c6 10.4 17.2 16.9 29.3 16.9 5.9 0 11.8-1.6 16.9-4.5l1.6-.9c2.5 1.6 5 3 7.6 4.4v1.8c0 17.8 13.9 32.5 31.4 33.7l5.1 15.9c8.3 26-10.9 52.4-38.1 52.4z" />
                    <Circle cx="203.8" cy="147.9" r="103.1" />
                    <Path d="m497.7 298.4-13-7.5c1-4.9 1.5-10 1.5-15.2s-.5-10.3-1.5-15.2l13-7.5c6.6-3.8 8.9-12.2 5-18.8l-11.7-20.4c-3.8-6.6-12.2-8.9-18.8-5l-13 7.5c-7.6-6.6-16.5-11.8-26.3-15.2v-14.9c0-7.6-6.2-13.8-13.8-13.8h-23.6c-7.6 0-13.8 6.2-13.8 13.8v14.9c-9.8 3.3-18.7 8.5-26.3 15.2l-13-7.5c-6.6-3.8-15-1.6-18.8 5l-11.8 20.4c-3.8 6.6-1.5 15 5 18.8l12.9 7.5c-1 4.9-1.5 10-1.5 15.2s.5 10.3 1.5 15.2l-12.9 7.5c-6.6 3.8-8.9 12.2-5 18.8l11.8 20.4c3.8 6.6 12.2 8.9 18.8 5l13-7.5c7.6 6.6 16.5 11.8 26.3 15.2v15c0 7.6 6.2 13.8 13.8 13.8h23.6c7.6 0 13.8-6.2 13.8-13.8v-15c9.8-3.3 18.7-8.5 26.3-15.2l13 7.5c6.6 3.8 15 1.5 18.8-5l11.8-20.4c3.8-6.6 1.5-15-5.1-18.8zm-90.4 11.7c-19 0-34.3-15.4-34.3-34.3s15.4-34.3 34.3-34.3 34.3 15.4 34.3 34.3-15.3 34.3-34.3 34.3z" />
                  </G>
                </G>
              </Svg>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
