import React from "react";
import { TextInput } from "react-native";

export const FormInput = (props) => {
  return (
    <TextInput
      placeholder={props?.placeholder}
      onChangeText={props?.onChangeText}
      style={props?.style}
      {...props}
    />
  );
};
