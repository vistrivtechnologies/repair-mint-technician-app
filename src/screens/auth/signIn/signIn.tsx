import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import {
  Button,
  CheckBox,
  FloatingTextInput,
  TextView,
} from '../../../components';
import {LocalStorage} from '../../../helpers/localstorage';
import {signInValidationSchema} from '../../../helpers/validations';
import {useFormik} from 'formik';
import styles from './signIn.style';
import {useNavigation} from '@react-navigation/native';
import {AuthStackProps} from '../../../@types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserData, UserDataContext} from '../../../context/userDataContext';
import {Colors, Images} from '../../../constant';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomPhoneNumberInput from '../../../components/PhoneNumberInputText/PhoneNumberInputText';
import {API} from '../../../api/processApis';
import {API as FetchAPI} from '../../../api//fetchApis';
import VerifyOTPModal from '../../../components/VerifyOtpModal/VerifyOtpModal';
import {usePopup} from '../../../context/popupContext';
import Loader from '../../../components/Loader/Loader';

type SignUpScreenNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  'SignIn'
>;

const SignIn = () => {
  const navigation = useNavigation<SignUpScreenNavigationType>();
  const {callError} = usePopup();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {userData, setUserData} = useContext<UserData>(UserDataContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpModalVisible, setOtpModalVisible] = useState<boolean>(false);
  const {values, errors, touched, handleSubmit, handleChange, setFieldValue} =
    useFormik({
      validationSchema: signInValidationSchema,
      initialValues: {
        email: '',
        phoneNumber: '',
        countryCode: '',
      },
      onSubmit: async (data: {
        email: string;
        phoneNumber: string;
        countryCode: string;
      }) => {
        setIsLoading(true);
        const payload = {
          ...(data?.email
            ? {email: data?.email}
            : {
                countryCode: data?.countryCode,
                phoneNumber: data?.phoneNumber,
              }),
          isAuthServiceFor: 'login',
        };

        API.sendOtp(payload)
          .then(res => {
            if (res) {
              setOtpModalVisible(true);
              setIsLoading(false);
            }
          })
          .catch(err => {
            setIsLoading(false);
            callError({
              message: err?.error?.message,
              isDelayModal: true,
            });
          });
      },
    });

  useEffect(() => {
    checkRememberMe();
  }, []);
  useEffect(() => {
    getAsync();
  }, []);

  const getAsync = async () => {
    setIsLoading(true);
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    FetchAPI.getProfile(token)
      .then(res => {
        if (res) {
          setUserData(res?.data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.error('Error fetching user profile:', err);
      });
  };
  const handleRememberMe = async (value: boolean) => {
    await LocalStorage.save('rememberMe', value);
    setRememberMe(value);
  };

  const checkRememberMe = async () => {
    const username = await LocalStorage.read('username');
    const phoneNumber = await LocalStorage.read('phoneNumber');
    const RememberMe = await LocalStorage.read('rememberMe');
    if (RememberMe) {
      setFieldValue('email', username);
      setFieldValue('phoneNumber', phoneNumber);
      setFieldValue('countryCode', '+91');
      setRememberMe(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={{marginBottom: hp(7)}}>
            <TextView style={styles.title}>Hello!</TextView>
            <TextView style={styles.subtitle}>
              Welcome Back, You Have Been {'\n'} Missed For Long Time
            </TextView>
          </View>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <CustomPhoneNumberInput
              label={'Phone Number *'}
              placeholder={'Phone Number'}
              keyboardType={'phone-pad'}
              onChangeText={(e: string) => {
                setFieldValue('phoneNumber', e);
                setFieldValue('email', '');
              }}
              value={values.phoneNumber}
              touched={touched.phoneNumber}
              error={errors.phoneNumber}
              onSelectCountry={(country: any) => {
                setFieldValue('countryCode', '+' + country.callingCode[0]);
                setFieldValue('email', '');
              }}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainerInputs}>
            <View style={styles.line} />
            <TextView style={styles.orText}>Or</TextView>
            <View style={styles.line} />
          </View>
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <FloatingTextInput
              label="Email"
              value={values.email}
              onChangeText={() => {
                handleChange('email');
                setFieldValue('countryCode', '');
                setFieldValue('phoneNumber', '');
              }}
              placeholder={'Email'}
              error={errors.email}
              rightIcon={true}
              rightImage={Images.ic_Mail}
              touched={touched.email}
              onSecureTextPress={() => setShowPassword(!showPassword)}
              isRequired
            />
          </View>

          {/* Remember Me + Forgot Password */}
          <View style={styles.row}>
            <Pressable style={styles.informationView}>
              <CheckBox
                boxTitle={'Remember Me'}
                isChecked={rememberMe}
                onPress={() => handleRememberMe(!rememberMe)}
              />
            </Pressable>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={{marginTop: hp(2)}}>
            <Button
              title={'GET OTP'}
              onPress={handleSubmit}
              style={{borderRadius: 12}}
            />

            <View style={styles.signupContainer}>
              <TextView style={styles.signupText}>
                Don’t have an account?
              </TextView>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                <TextView style={styles.signupLink}>Sign Up</TextView>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <TextView style={styles.orText}>Or Continue With</TextView>
              <View style={styles.line} />
            </View>

            {/* Social Icons */}
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.iconCircle}>
                <Image source={Images.ic_google} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle}>
                <Image
                  source={Images.ic_Contact}
                  style={[styles.icon, {tintColor: Colors.PRIMARY[100]}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <VerifyOTPModal
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        onResendOTP={() => {}}
        contactInfo={{
          type: values?.email ? 'email' : 'phone',
          value: values?.email ? values?.email : values?.phoneNumber,
          countryCode: values?.countryCode,
          deviceId: 's89auja98suda98sud--as90ajs',
        }}
        isAuthFor='login'
      />
      <Loader visible={isLoading} />
    </SafeAreaView>
  );
};

export default SignIn;
