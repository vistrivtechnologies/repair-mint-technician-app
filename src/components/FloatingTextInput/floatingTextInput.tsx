import React, {FC, useState} from 'react';
import {
  View,
  ViewStyle,
  KeyboardTypeOptions,
  TextInput,
  Text,
} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import TextView from '../TextView/textView';
import styles from './styles';
import {Images, Colors} from '../../constant';
import {FormikErrors, FormikTouched} from 'formik';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';

interface TextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  label?: string | null;
  editable?: boolean;
  returnKeyType?: any;
  isSecure?: boolean;
  rightIcon?: boolean;
  rightImage?: any;
  style?: ViewStyle;
  isRequired?: boolean;
  onSecureTextPress?: () => void;
  error?: FormikErrors<string> | any;
  touched?: FormikTouched<boolean> | any;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  isMultiline?: boolean;
  oPressIn?: () => void;
  mode?: 'flat' | 'outlined';

  // New props for password comparison
  compareWith?: string;
  compareErrorText?: string;
  placeholder?: string;
}

const FloatingTextInput: FC<TextInputProps> = ({
  label,
  value,
  style,
  onChangeText,
  editable = true,
  returnKeyType,
  isSecure,
  rightIcon,
  rightImage,
  isRequired,
  onSecureTextPress,
  error,
  touched,
  keyboardType,
  maxLength,
  pointerEvents,
  isMultiline,
  oPressIn,
  mode = 'outlined',
  compareWith,
  compareErrorText = 'Passwords do not match',
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const showCompareError =
    compareWith !== undefined && value !== undefined && value !== compareWith;

  const hasValidationError = (error && touched) || showCompareError;

  const getBackgroundColor = () => {
    if (!editable) return '#E0E0E0';
    return isFocused ? Colors.LIGHT_GREY_2 : Colors.LIGHT_GREY_2;
  };
  const getBorderColor = () => {
    if (error) return Colors.ERROR[100];
    return isFocused ? Colors.PRIMARY[100] : Colors.LIGHT_GREY;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>

      <View
        style={[
          style,
          {
            borderColor: getBorderColor(),
            height: heightPercentageToDP(6.5),
            backgroundColor: getBackgroundColor(),
            borderRadius: moderateScale(6),
            borderWidth: 1.5,
            justifyContent: 'center',
          },
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          editable={editable}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          multiline={isMultiline}
          placeholderTextColor={Colors.GREY}
          placeholder={placeholder ? placeholder : ''}
          maxLength={maxLength}
          onPressIn={oPressIn}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input]}
          pointerEvents={pointerEvents}
          // right={
          //   rightIcon ? (
          //     <PaperTextInput.Icon
          //       icon={rightImage}
          //       onPress={onSecureTextPress && onSecureTextPress}
          //       size={18}
          //     />
          //   ) : undefined
          // }
        />

        {error && touched && <TextView style={styles.error}>{error}</TextView>}

        {showCompareError && (
          <TextView style={styles.error}>{compareErrorText}</TextView>
        )}
      </View>
    </View>
  );
};

export default FloatingTextInput;
