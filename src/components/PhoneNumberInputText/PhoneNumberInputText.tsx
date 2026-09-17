import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  Platform,
} from 'react-native';
import {Colors, Fonts} from '../../constant';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FormikErrors, FormikTouched} from 'formik';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import TextView from '../TextView/textView';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface CustomPhoneNumberInputFieldProps {
  label: string;
  value?: string;
  marginTop?: number;
  placeholder?: string;
  password?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  onChangeText: (text: string) => void;
  error?: FormikErrors<string> | any;
  touched?: FormikTouched<boolean> | any;
  onSelectCountry: (countryCode: Country) => void;
}

const CustomPhoneNumberInput: React.FC<CustomPhoneNumberInputFieldProps> = ({
  label,
  marginTop = 0,
  placeholder = '',
  onChangeText,
  password = false,
  keyboardType = 'default',
  onSelectCountry,
  error,
  touched,
}) => {
  const [showCountry, setShowCountry] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [country, setCountry] = useState<Country | null>(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const defaultCountry: Partial<Country> = {
      cca2: 'IN',
      callingCode: ['91'],
      name: 'India',
    };
    setCountry(defaultCountry as Country);
  }, []);

  const onSelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    onSelectCountry(selectedCountry);
    setCountry(selectedCountry);
  };

  const getBorderColor = () => {
    if (error) return Colors.ERROR[100];
    return isFocused ? Colors.PRIMARY[100] : Colors.LIGHT_GREY;
  };
  return (
    <View style={{marginTop}}>
      <Text style={styles.labelText}>{label}</Text>
      <View
        style={[
          styles.textBoxContainer,
          {
            borderColor: getBorderColor(),
          },
        ]}>
        <TouchableOpacity
          onPress={() => setShowCountry(!showCountry)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: moderateScale(4),
          }}>
          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
            visible={showCountry}
          />
          <Text style={styles.callingCodeText}>
            {country?.callingCode ? `+${country.callingCode[0]}` : ''}
          </Text>
          <MaterialIcons
            style={{marginLeft: moderateScale(2)}}
            name={'keyboard-arrow-down'}
            size={22}
            color={Colors.BLACK}
          />
        </TouchableOpacity>
        <TextInput
          placeholder={placeholder}
          autoCorrect={false}
          style={[styles.inputBoxText]}
          secureTextEntry={hidePassword}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={10}
          placeholderTextColor={Colors.GREY}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && touched && (
        <TextView style={styles.validationTextStyle}>{error}</TextView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: Colors.PRIMARY[200],
    fontFamily: Fonts.Medium,
    fontSize: scale(12),
    marginBottom: moderateVerticalScale(7),
    marginLeft: wp(0.5),
    fontWeight: '500',
  },
  textBoxContainer: {
    backgroundColor: Colors.LIGHT_GREY_2,
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'ios' ? hp(1) : hp(0.5),
    paddingHorizontal: wp(1.5),
    borderWidth: 1.5,
  },
  inputBoxText: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    marginLeft: moderateScale(10),
    flex: 1,
    color: Colors.BLACK,
    fontFamily: Fonts.Regular,
  },
  validationTextStyle: {
    fontSize: scale(10),
    fontFamily: 'FuturaMediumBT',
    color: Colors.ERROR[100],
    marginTop: moderateVerticalScale(3),
  },
  callingCodeText: {
    fontSize: scale(11),
    fontFamily: 'JosefinSans-Regular',
    fontWeight: '500',
    marginLeft: moderateScale(4),
    color: Colors.BLACK,
  },
});

export default CustomPhoneNumberInput;
