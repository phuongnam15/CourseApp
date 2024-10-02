import React from "react";
import Transition from "../Transition";
import LessonItem from "../LessonItem";

const Tab1 = ({courseInfo}) => {
  return (
    <Transition>
      {courseInfo?.lessions?.map((item) => (
        <LessonItem data={item} key={item?.id} />
      ))}
    </Transition>
  );
};

export default Tab1;
