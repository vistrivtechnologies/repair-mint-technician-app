import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './signUp.style';
import {Button, FloatingTextInput, TextView} from '../../../components';
import {UserData, UserDataContext} from '../../../context/userDataContext';
import {Colors, Fonts, Images} from '../../../constant';
import {signUpValidationSchema} from '../../../helpers/validations';
import {useFormik} from 'formik';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackProps} from '../../../@types';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomPhoneNumberInput from '../../../components/PhoneNumberInputText/PhoneNumberInputText';
import {API} from '../../../api/processApis';
import {usePopup} from '../../../context/popupContext';
import VerifyOTPModal from '../../../components/VerifyOtpModal/VerifyOtpModal';
import Loader from '../../../components/Loader/Loader';
import {PermissionsAndroid, Text, StyleSheet} from 'react-native';
import MapView, {Marker, MapPressEvent, Region} from 'react-native-maps';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import axios from 'axios';

import {ActivityIndicator} from 'react-native';
import Geocoder from 'react-native-geocoding';
import DocumentPickerComponent from '../../../components/documentPicker/documentPicker';
import {getBase64FromUri} from '../../../utils/base64String';
import {TermsToggle} from '../../../components/toggleButton/toggleButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
type SignUpScreenNavigationType = NativeStackNavigationProp<
  AuthStackProps,
  'SignUp'
>;
const screen = Dimensions.get('screen');
const {width, height} = Dimensions.get('window');
const SignUp: FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationType>();
  const {callError} = usePopup();
  const {isDarkMode} = useContext<UserData>(UserDataContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpModalVisible, setOtpModalVisible] = useState<boolean>(false);
  const GOOGLE_MAPS_API_KEY = 'AIzaSyD2IZNv1mMW3vkvFosW3EdCGgp8_9zTc30';

  const background =
    isDarkMode === 'dark' ? Colors.PRIMARY[400] : Colors.PRIMARY[300];
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const textColor =
    isDarkMode === 'dark' ? Colors.PRIMARY[300] : Colors.PRIMARY[400];
  const {values, errors, touched, handleSubmit, handleChange, setFieldValue} =
    useFormik({
      validationSchema: signUpValidationSchema,
      initialValues: {
        userName: '',
        countryCode: '',
        phoneNumber: '',
        email: '',
        companyCode: '',
        address: '',
        employeeID: '',
        jobRole: '',
        emiratesId: '',
      },
      onSubmit: async data => {
        setIsLoading(true);
        const payload = {
          countryCode: data?.countryCode,
          phoneNumber: data?.phoneNumber,
          isAuthServiceFor: 'register',
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

  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState<Region | null>(null);
  const [address, setAddress] = useState('Fetching address...');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const mapRef = useRef<MapView | null>(null);
  const [confirmedRegion, setConfirmedRegion] = useState<Region | null>(null);
  const [confirmedAddress, setConfirmedAddress] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [base64Files, setBase64Files] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [documentError, setDocumentError] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleSelectCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response?.assets?.[0]) {
        setProfileImage(response.assets[0].uri);
        setProfileModalVisible(false);
      }
    });
  };

  const handleSelectGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response?.assets?.[0]) {
        setProfileImage(response.assets[0].uri);
        setProfileModalVisible(false);
      }
    });
  };
  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion); // 👈 THIS is required to let the map move
    setSelectedRegion(newRegion); // For confirmation
    fetchAddress(newRegion.latitude, newRegion.longitude);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const granted = await requestLocationPermission();
    if (!granted) {
      const dubaiRegion: Region = {
        latitude: 25.276987,
        longitude: 55.296249,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(dubaiRegion);
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(coords);
        fetchAddress(coords.latitude, coords.longitude);
        mapRef.current?.animateToRegion(coords);
      },
      error => {
        console.warn(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const result = res.data.results[0];
      if (result) setAddress(result.formatted_address);
    } catch (e) {
      console.warn('Address fetch error', e);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const confirmLocation = () => {
    if (selectedRegion) {
      setConfirmedRegion(selectedRegion); // Store new region
      setConfirmedAddress(address); // Use address fetched from that region
    }
    setModalVisible(false);
  };

  const handleFilesPicked = async (selectedFiles: any[]) => {
    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);
    setDocumentError(false);
    const base64files = await Promise.all(
      updatedFiles.map(async (data, index) => {
        const base64 = data?.isEditFile
          ? data?.base64
          : await getBase64FromUri(data.fileCopyUri);

        return {
          imageId: index,
          fileName: data?.name ?? '',
          fileContentType: '.pdf',
          stream: base64 ?? '',
        };
      }),
    );
    setBase64Files(base64files);
  };
  console.log('region: ', region);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{flex: 1}}>
      <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
        <View style={{flex: 1}}>
          <View style={{height: hp(77)}}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View
                style={[styles.infoContainer, {backgroundColor: background}]}>
                <View
                  style={
                    profileImage
                      ? styles.profileContainer
                      : styles.imageProfileContainer
                  }>
                  <TouchableOpacity
                    onPress={() => setProfileModalVisible(true)}>
                    <Image
                      source={
                        profileImage ? {uri: profileImage} : Images.ic_profile
                      }
                      style={
                        profileImage ? styles.profile : styles.placeholderIcon
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Modal
                  visible={profileModalVisible}
                  transparent
                  animationType="slide">
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>
                        Upload Profile Picture
                      </Text>

                      <TouchableOpacity
                        style={styles.option}
                        onPress={handleSelectCamera}>
                        <Ionicons
                          name="camera"
                          size={20}
                          color={Colors.PRIMARY[100]}
                        />
                        <Text style={styles.optionText}>Camera</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.option}
                        onPress={handleSelectGallery}>
                        <Ionicons
                          name="image"
                          size={20}
                          color={Colors.PRIMARY[100]}
                        />
                        <Text style={styles.optionText}>Gallery</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setProfileModalVisible(false)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <View style={{marginTop: hp(2)}}>
                  <TextView style={[styles.welcomeTitle, {color: textColor}]}>
                    Hello!
                  </TextView>

                  <TextView style={[styles.instructionTitle]}>
                    Create your account for {'\n'}better Experience
                  </TextView>
                </View>

                <View style={styles.InputMainView}>
                  {/* User Name Input */}
                  <View style={styles.inputContainer}>
                    <FloatingTextInput
                      value={values.userName}
                      label={'User Name *'}
                      error={errors.userName}
                      onChangeText={handleChange('userName')}
                      touched={touched.userName}
                      rightIcon={true}
                      rightImage={Images.ic_profile1}
                      placeholder={'User Name'}
                      isRequired
                    />
                  </View>
                  {/* Phone Number Input */}
                  <View style={styles.inputContainer}>
                    <CustomPhoneNumberInput
                      label={'Phone Number *'}
                      placeholder={'Phone Number'}
                      keyboardType={'phone-pad'}
                      onChangeText={(e: string) => {
                        setFieldValue('phoneNumber', e);
                      }}
                      value={values.phoneNumber}
                      touched={touched.phoneNumber}
                      error={errors.phoneNumber}
                      onSelectCountry={(country: any) => {
                        setFieldValue(
                          'countryCode',
                          '+' + country.callingCode[0],
                        );
                      }}
                    />
                  </View>
                  {/* Email Input */}
                  <View style={styles.inputContainer}>
                    <FloatingTextInput
                      label="Email *"
                      value={values.email}
                      onChangeText={(e: string) => {
                        setFieldValue('email', e);
                      }}
                      placeholder={'Email'}
                      error={errors.email}
                      rightIcon={true}
                      rightImage={Images.ic_Mail}
                      touched={touched.email}
                      isRequired
                    />
                  </View>
                  {/* Company Code */}
                  <View style={styles.inputContainer}>
                    <FloatingTextInput
                      label="Company Code/ID *"
                      value={values.companyCode}
                      onChangeText={(e: string) => {
                        setFieldValue('companyCode', e);
                      }}
                      placeholder={'Company Code/ID'}
                      error={errors.companyCode}
                      rightIcon={true}
                      rightImage={Images.ic_Mail}
                      touched={touched.companyCode}
                      isRequired
                    />
                  </View>
                  {/* Employee ID */}
                  <View style={styles.inputContainer}>
                    <FloatingTextInput
                      label="Employee ID *"
                      value={values.employeeID}
                      onChangeText={(e: string) => {
                        setFieldValue('employeeID', e);
                      }}
                      placeholder={'Employee ID'}
                      error={errors.employeeID}
                      rightIcon={true}
                      rightImage={Images.ic_Mail}
                      touched={touched.employeeID}
                      isRequired
                    />
                  </View>

                  {/* Profile Picture */}
                  <DocumentPickerComponent
                    onFilesPicked={handleFilesPicked}
                    docType="pdf"
                    isError={documentError}
                    title="ID Proof (Emirates ID)"
                    label="ID Proof (Emirates ID) *"
                  />
                  {/* Address Input */}
                  {/* <View style={styles.inputContainer}>
                    <FloatingTextInput
                      label="Address *"
                      value={values.address}
                      onChangeText={(e: string) => {
                        setFieldValue('address', e);
                      }}
                      placeholder={'Address'}
                      error={errors.address}
                      rightIcon={true}
                      touched={touched.address}
                      isRequired
                    />
                  </View> */}
                  <View style={mapStyles.wrapper}>
                    {/* ✅ Compact Location Preview */}
                    <View style={mapStyles.previewCard}>
                      <View style={mapStyles.textContainer}>
                        <Text style={mapStyles.label}>
                          LOCATION INFORMATION
                        </Text>
                        <Text
                          numberOfLines={3}
                          style={mapStyles.addressPreview}>
                          {address}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          getCurrentLocation();
                          setModalVisible(true);
                        }}>
                        <Image
                          source={{
                            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${
                              confirmedRegion?.latitude || region?.latitude
                            },${
                              confirmedRegion?.longitude || region?.longitude
                            }&zoom=15&size=150x100&key=AIzaSyD2IZNv1mMW3vkvFosW3EdCGgp8_9zTc30`,
                          }}
                          style={mapStyles.miniMap}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* 🗺️ Full Screen Map Modal */}
                    <Modal visible={modalVisible} animationType="slide">
                      <View style={mapStyles.modalContainer}>
                        {true && (
                          <>
                            <MapView
                              ref={mapRef}
                              style={mapStyles.fullMap}
                              // region={region}
                              onRegionChangeComplete={onRegionChange} // ✅ This is what you need
                              // showsUserLocation
                            />

                            {/* 📍 Pin */}
                            <Image
                              source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                              }}
                              style={mapStyles.centerPin}
                            />
                            {/* <TouchableOpacity
                              style={mapStyles.locateBtn}
                              onPress={getCurrentLocation}>
                              <Text style={mapStyles.locateText}>📍</Text>
                            </TouchableOpacity> */}

                            {/* 🧭 Address */}
                            <View style={mapStyles.addressBox}>
                              {loadingAddress ? (
                                <ActivityIndicator size="small" color="#333" />
                              ) : (
                                <Text style={mapStyles.addressText}>
                                  {address}
                                </Text>
                              )}
                            </View>

                            {/* ✅ Confirm */}
                            <TouchableOpacity
                              style={mapStyles.confirmBtn}
                              onPress={confirmLocation}>
                              <Text style={mapStyles.confirmText}>
                                CONFIRM LOCATION
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </Modal>
                  </View>

                  {/* Terms and Conditions */}
                  <TermsToggle
                    accepted={acceptedTerms}
                    onToggle={() => setAcceptedTerms(prev => !prev)}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.actionButton}>
            <Button
              title={'SIGN UP'}
              onPress={handleSubmit}
              style={{borderRadius: 12}}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('SignIn')}>
              <TextView style={styles.accountTitle}>
                Already have an account?{' '}
                <TextView
                  style={{
                    color: Colors.PRIMARY[100],
                    fontFamily: Fonts.SemiBoldItalic,
                    fontSize: scale(12),
                    textDecorationLine: 'underline',
                  }}>
                  Sign In
                </TextView>
              </TextView>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <VerifyOTPModal
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        onResendOTP={() => {}}
        contactInfo={{
          type: 'phone',
          value: values?.phoneNumber,
          email: values?.email,
          userName: values?.userName,
          address: values?.address,
          countryCode: values?.countryCode,
          deviceId: 's89auja98suda98sud--as90ajs',
          region,
        }}
        isAuthFor="register"
        region={region}
      />
      <Loader visible={isLoading} />
    </KeyboardAvoidingView>
  );
};

export default SignUp;
const mapStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: moderateScale(14),
    marginBottom: moderateScale(14),
  },
  previewCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    color: Colors.PRIMARY[200],
    marginBottom: 4,
    fontSize: scale(11),
    fontFamily: Fonts.Medium,
  },
  addressPreview: {
    fontSize: 14,
    color: '#333',
    fontFamily: Fonts.Bold,
  },
  cityLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
    fontFamily: Fonts.Medium,
  },
  miniMap: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  edit: {
    textAlign: 'center',
    fontSize: 12,
    color: '#007bff',
    fontFamily: Fonts.Medium,
  },
  modalContainer: {
    flex: 1,
  },
  fullMap: {
    width: '100%',
    height: '100%',
  },
  centerPin: {
    position: 'absolute',
    top: height / 2 - 24,
    left: width / 2 - 24,
    width: 48,
    height: 48,
    zIndex: 10,
    tintColor: Colors.PRIMARY[100],
  },
  addressBox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp(8) : hp(5),
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    elevation: 4,
    width: '90%',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    fontFamily: Fonts.Medium,
  },
  locateBtn: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    elevation: 3,
  },
  locateText: {
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: Fonts.Medium,
  },
  confirmBtn: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY[100],
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Fonts.Medium,
  },
});
