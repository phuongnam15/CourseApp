import { sendGet } from "@/api/axiosClient";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({});
  const [groupId, setGroupId] = useState(null);
  const [idLesson, setIdLesson] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [cartList, setCartList] = useState([]);
  const [myCourseList, setMyCourseList] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    SecureStore.getItemAsync("token").then((value) => {
      if (value) {
        setToken(value);
      }
    });
  }, []);
  const handleGetProfile = async () => {
    try {
      const res = await sendGet(`/user/get-me`);
      if (res.success) {
        setIsLogin(true);
        setUserData(res.data.user);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetMyCourse = async () => {
    try {
      const input = {
        perPage: 1000,
      };
      const res = await sendGet(`/user/learn`, input);
      if (res.success === true) {
        setMyCourseList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetListCart = async () => {
    try {
      const res = await sendGet(`/user/cart`);
      if (res.success) {
        setCartList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token && token.length > 0) {
      handleGetProfile();
      handleGetListCart();
      handleGetMyCourse();
    }
  }, [token]);
  return (
    <GlobalStateContext.Provider
      value={{
        groupId,
        setGroupId,
        globalState,
        setGlobalState,
        isLogin,
        setIsLogin,
        cartList,
        userData,
        setUserData,
        setCartList,
        myCourseList,
        setMyCourseList,
        token,
        setToken,
        idLesson,
        setIdLesson,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
