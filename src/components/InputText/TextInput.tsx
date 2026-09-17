import React, { FC } from "react";
import {
  TextInput,
  View,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  TextStyle,
} from "react-native";
import { FormikErrors, FormikTouched } from "formik";
import TextView from "../TextView/textView";
import styles from "./styles";
import { heightPercentageToDP as hp } from "../../constant/dimentions";

interface TextInputProps {
  refs?: React.RefObject<TextInput>;
  placeholder?: string;
  placeHolderTextStyle?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  inputStyle?: TextStyle;
  inputLabel?: string;
  multiline?: boolean;
  editable?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  textOnSubmit?: () => void;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions | undefined;
  pointerEvents?: "box-none" | "none" | "box-only" | "auto" | undefined;
  error?: FormikErrors<string> | any;
  touched?: FormikTouched<boolean> | any;
}

const InputText: FC<TextInputProps> = ({
  refs,
  placeholder,
  placeHolderTextStyle,
  value,
  onChangeText,
  inputStyle,
  editable,
  multiline,
  returnKeyType,
  textOnSubmit,
  error,
  touched,
  keyboardType,
  maxLength,
  pointerEvents,
}) => {
  return (
    <View>
      <TextInput
        ref={refs}
        placeholder={placeholder}
        placeholderTextColor={placeHolderTextStyle}
        onSubmitEditing={textOnSubmit}
        onChangeText={onChangeText}
        style={[inputStyle, { height: multiline ? hp(20) : undefined }]}
        editable={editable}
        pointerEvents={pointerEvents}
        value={value}
        maxLength={maxLength}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
      />
      {error && touched && <TextView style={styles.error}>{error}</TextView>}
    </View>
  );
};

export default InputText;
