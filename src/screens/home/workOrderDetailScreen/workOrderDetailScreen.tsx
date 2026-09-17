import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from '../../../constant/Icon';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackProps } from '../../../@types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserData, UserDataContext } from '../../../context/userDataContext';
import styles from './workOrderDetailScreen.styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../../constant';
import { FloatingTextInput, Header, TextView } from '../../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { LocalStorage } from '../../../helpers/localstorage';
import { API as FetchAPI } from '../../../api//fetchApis';
import { usePopup } from '../../../context/popupContext';
import {
  AssignedSR,
  AssignedSRContext,
} from '../../../context/assignedSRContext';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { CameraIcon, GalleryIcon } from '../../../components/SvgIcons';
import ReactNativeModal from 'react-native-modal';
import Quotation from './quotation/quotation';
import Timer from './timer/timer';
import Loader from '../../../components/Loader/Loader';
import { statusTheme } from '../../../helpers/statusTheme';
export const DEVICE_HEIGHT = Dimensions.get('window').height;
type ScreenRouteProp = RouteProp<
  { params: { item: any; inventoryItems?: any } },
  'params'
>;
type WorkOrderDetailScreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  'WorkOrderDetailScreen'
>;

const WorkOrderDetailScreen = () => {
  const route = useRoute<ScreenRouteProp>();
  const { item, inventoryItems } = route.params;

  const { callError } = usePopup();
  const { isDarkMode, userData } = useContext<UserData>(UserDataContext);
  const { assignedSR, setAssignedSR } = useContext<AssignedSR>(AssignedSRContext);
  const [assignedSRbyId, setAssignedSRbyId] = useState<any>({});
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [isFromAfterWork, setIsFromAfterWork] = useState<boolean>(false);
  const [photoType, setPhotoType] = useState<'customer' | 'product' | ''>('');
  const [description, setDescription] = useState<string>('sample description')
  const [customerPhotos, setCustomerPhotos] = useState<
    { fileName: string; image: string }[]
  >([]);

  const [productPhotos, setProductPhotos] = useState<
    { fileName: string; image: string }[]
  >([]);
  const [afterWorkCustomerPhotos, setAfterWorkCustomerPhotos] = useState<
    { fileName: string; image: string }[]
  >([]);
  const [afterWorkProductPhotos, setAfterWorkProductPhotos] = useState<
    { fileName: string; image: string }[]
  >([]);
  const [customerAttachmentPhotos, setCustomerAttchmentPhotos] = useState<
    { image: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [customerLocation, setCustomerLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locations, setLocations] = useState({
    technician: {
      latitude: userData?.user?.defaultAddress?.latitude,
      longitude: userData?.user?.defaultAddress?.longitude,
    },
    customer: {
      latitude: assignedSRbyId?.serviceRequest?.address?.latitude,
      longitude: assignedSRbyId?.serviceRequest?.address?.longitude,
    },
  });

  // Calculate distance between two points in km
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // Earth radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    // Calculate initial distance
    const dist = calculateDistance(
      locations.technician.latitude,
      locations.technician.longitude,
      locations.customer.latitude,
      locations.customer.longitude,
    );
    setDistance(dist);

  }, [locations]);
  const openImageModal = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };
  const getAllServiceRequestData = async () => {
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    FetchAPI.getAssignedSRs(token)
      .then(res => {
        if (res) {
          setAssignedSR(res?.data?.assignedServiceRequests);
        }
      })
      .catch(err => {
        console.error('Error fetching user prefile:', err);
      });
  };
  const fetchData = async () => {
    try {
      const tokenString = await LocalStorage.read('@jwt_token');
      const token = JSON.parse(tokenString);
      const payload = {
        serviceRequestApprovalId: item?._id,
      };
      const res = await FetchAPI.getOneSR(token, payload);
      if (res) {
        getAllServiceRequestData();
        const SRRes = res?.data?.serviceRequestAssigned;
        setAssignedSRbyId(res?.data?.serviceRequestAssigned);
        setLocations({
          technician: {
            latitude: userData?.user?.defaultAddress?.latitude,
            longitude: userData?.user?.defaultAddress?.longitude,
          },
          customer: {
            latitude: res?.data?.serviceRequestAssigned?.serviceRequest?.address?.latitude,
            longitude: res?.data?.serviceRequestAssigned?.serviceRequest?.address?.longitude,
          },
        });
        setCustomerAttchmentPhotos(
          SRRes?.serviceRequestAssignedWithAttachment?.customerAttachments
            ?.attachment,
        );
        setCustomerPhotos(
          SRRes?.serviceRequestAssignedWithAttachment?.beforeWork
            ?.customerImages,
        );
        setProductPhotos(
          SRRes?.serviceRequestAssignedWithAttachment?.beforeWork?.assetImages,
        );
        setAfterWorkCustomerPhotos(
          SRRes?.serviceRequestAssignedWithAttachment?.afterWork
            ?.customerImages,
        );
        setAfterWorkProductPhotos(
          SRRes?.serviceRequestAssignedWithAttachment?.afterWork?.assetImages,
        );
      }
    } catch (err: any) {
      setCustomerAttchmentPhotos([]);
      setCustomerPhotos([]);
      setProductPhotos([]);
      setAfterWorkCustomerPhotos([]);
      setAfterWorkProductPhotos([]);
    }
  };
  const handleApproveSR = async () => {
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    const payload = {
      serviceRequestApprovalId: assignedSRbyId?._id,
      approvalStatus: 'approved',
    };
    const updatedList = assignedSR.map(sr =>
      sr._id === assignedSRbyId._id ? { ...sr, approvalStatus: 'Approved' } : sr,
    );
    setAssignedSR(updatedList);
    setIsLoading(true);

    FetchAPI.approveServiceRequest(token, payload)
      .then(res => {
        if (res) {
          fetchData();
          setIsLoading(false);
          callError({
            message: res?.message,
            isSuccess: true,
            isDelayModal: true,
          });
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.error('Error approving SR:', err);
        callError({
          message: err?.error?.message,
          isDelayModal: true,
        });
      });
  };

  const handleRejectSR = async () => {
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    const payload = {
      serviceRequestApprovalId: assignedSRbyId?._id,
      approvalStatus: 'rejected',
    };
    setIsLoading(true);
    FetchAPI.approveServiceRequest(token, payload)
      .then(res => {
        if (res) {
          fetchData();
          setIsLoading(false);
          callError({
            message: res?.message,
            isSuccess: true,
            isDelayModal: true,
          });
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        callError({
          message: err?.error?.message,
          isDelayModal: true,
        });
      });
  };
  const handleMarkAsArrived = async () => {
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    const payload = {
      serviceRequestApprovalId: assignedSRbyId?._id,
      workflowStatus: 'arrived',
    };
    setIsLoading(true);
    FetchAPI.updateWorkflowStatus(token, payload)
      .then(res => {
        if (res) {
          fetchData();
          setIsLoading(false);
          callError({
            message: res?.message,
            isSuccess: true,
            isDelayModal: true,
          });
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        callError({
          message: err?.error?.message,
          isDelayModal: true,
        });
      });
  };

  const InfoRow = ({ icon, text }: { icon: any; text: string }) => (
    <View style={styles.infoRow}>
      <Icon family="Ionicons" name={icon} size={16} style={{ marginRight: 8 }} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take photos',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error', err);
        return false;
      }
    }
    return true; // iOS - assume permission is granted or handled differently
  };

  const handleSelectPhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.errorCode) {
        Alert.alert('Gallery Error', response.errorMessage || 'Unknown error');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const base64 = asset.base64;
        const fileName = `gallery-${Date.now()}.png`;

        if (base64) {
          const imageObj = {
            fileName,
            image: base64,
          };
          setUploadModal(false);
          setPhotoType('');
          if (isFromAfterWork) {
            if (photoType === 'customer') {
              setAfterWorkCustomerPhotos(prev => [...prev, imageObj]);
            } else if (photoType === 'product') {
              setAfterWorkProductPhotos(prev => [...prev, imageObj]);
            }
          } else {
            if (photoType === 'customer') {
              setCustomerPhotos(prev => [...prev, imageObj]);
            } else if (photoType === 'product') {
              setProductPhotos(prev => [...prev, imageObj]);
            }
          }
        }
      }
    });
  };

  const handleTakePhoto = async (type: 'customer' | 'product' | '') => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos.',
      );
      return;
    }

    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: false,
      cameraType: 'back',
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.errorCode) {
        Alert.alert('Camera Error', response.errorMessage || 'Unknown error');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const base64 = asset.base64;
        const fileName = asset.fileName || `photo-${Date.now()}.png`;

        if (base64) {
          const imageObj = {
            fileName,
            image: base64,
          };
          setUploadModal(false);
          setPhotoType('');
          if (isFromAfterWork) {
            if (photoType === 'customer') {
              setAfterWorkCustomerPhotos(prev => [...prev, imageObj]);
            } else if (photoType === 'product') {
              setAfterWorkProductPhotos(prev => [...prev, imageObj]);
            }
          } else {
            if (photoType === 'customer') {
              setCustomerPhotos(prev => [...prev, imageObj]);
            } else if (photoType === 'product') {
              setProductPhotos(prev => [...prev, imageObj]);
            }
          }
        }
      }
    });
  };

  const handleRemovePhoto = (
    type: 'customer' | 'product',
    index: number,
    isFromAfterWorkAttachment?: boolean,
  ) => {
    if (isFromAfterWorkAttachment) {
      if (type === 'customer') {
        setAfterWorkCustomerPhotos(prev => prev.filter((_, i) => i !== index));
      } else {
        setAfterWorkProductPhotos(prev => prev.filter((_, i) => i !== index));
      }
    } else {
      if (type === 'customer') {
        setCustomerPhotos(prev => prev.filter((_, i) => i !== index));
      } else {
        setProductPhotos(prev => prev.filter((_, i) => i !== index));
      }
    }
  };

  const onImagePicker = async (option: 'Gallery' | 'Camera') => {
    if (option === 'Gallery') {
      handleSelectPhoto();
    }

    if (option === 'Camera') {
      handleTakePhoto(photoType);
    }
  };

  const handleUploadPhotos = async () => {
    setIsLoading(true);
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);

    const payload = {
      serviceRequestApprovalId: assignedSRbyId?._id,
      workflowStatus:
        assignedSRbyId.workCompletionStatus === 'work-started'
          ? 'after-work'
          : 'before-work',
      ...(assignedSRbyId.workCompletionStatus === 'work-started'
        ? {
          serviceEvidenceAfterWork: {
            customerImages: afterWorkCustomerPhotos,
            assetImages: afterWorkProductPhotos,
          },
        }
        : {
          serviceEvidenceBeforeWork: {
            customerImages: customerPhotos,
            assetImages: productPhotos,
          },
        }),
    };

    FetchAPI.updateWorkflowStatus(token, payload)
      .then(res => {
        if (res) {
          setIsLoading(false);
          fetchData();
          callError({
            message: res?.message,
            isSuccess: true,
            isDelayModal: true,
          });
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.error('Error fetching data:', err);
        callError({
          message: err?.error?.message,
          isDelayModal: true,
        });
      });
  };

  useLayoutEffect(() => {
    setCustomerPhotos([]);
    setProductPhotos([]);
    setAfterWorkCustomerPhotos([]);
    setAfterWorkProductPhotos([]);
    setCustomerAttchmentPhotos([]);
    fetchData();
  }, [item?._id]);

  console.log('-------assignedSRbyId----------', assignedSRbyId);

  const mapRef = useRef<MapView>(null);

  // when your modal opens:
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: locations.technician.latitude,
        longitude: locations.technician.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 500);
    }
  }, [locations]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(2) }}>
        <StatusBar
          barStyle={isDarkMode === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Header title="Work Order Details" />
        <View style={styles.mainContainer}>
          {/* Job ID & Status */}
          <View style={styles.rowBetween}>
            <Text style={styles.jobId}>
              # {assignedSRbyId?.serviceRequest?._id}
            </Text>
            <View
              style={[
                styles.statusBadgeContainer,
                {
                  backgroundColor: statusTheme(
                    assignedSRbyId?.workCompletionStatus,
                  )?.backgroundColor,
                },
              ]}>
              <Text
                style={[
                  styles.statusBadge,
                  {
                    color: statusTheme(assignedSRbyId?.workCompletionStatus)
                      ?.color,
                  },
                ]}>
                {assignedSRbyId?.workCompletionStatus}
              </Text>
            </View>
          </View>
          {/* Title */}
          <TextView style={styles.title}>
            {assignedSRbyId?.serviceRequest?.problemDescription}
          </TextView>
          <TextView style={styles.subTitle}>
            Maintenance	- Plumbing | Electrical - Pipe leakage found in the basin
          </TextView>

          <View style={cameraStyles.distanceContainer}>
            <View style={cameraStyles.distanceIcon}>
              <Icon
                family="MaterialIcons"
                name="location-pin"
                size={moderateScale(20)}
                color={Colors.WHITE}
              />
            </View>
            <View style={cameraStyles.distanceTextContainer}>
              <Text style={cameraStyles.distanceLabel}>
                Distance to customer
              </Text>
              <Text style={cameraStyles.distanceValue}>
                {distance?.toFixed(2) || '--'}{' '}
                <Text style={cameraStyles.distanceUnit}>kms</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={cameraStyles.mapButton}
              onPress={() => setLocationModalVisible(true)}>
              <Text style={cameraStyles.mapButtonText}>View on Map</Text>
            </TouchableOpacity>
          </View>
          {customerAttachmentPhotos?.length > 0 && (
            <View>
              <Text style={cameraStyles.label}>Attachments:</Text>
              <View style={cameraStyles.photoRow}>
                {customerAttachmentPhotos.map((photo, index) => (

                  <View
                    key={`customer-${index}`}
                    style={cameraStyles.imageWrapper}>
                    <TouchableOpacity
                      onPress={() => openImageModal(photo?.image)}>
                      <Image
                        source={{ uri: photo?.image }}
                        style={cameraStyles.thumbnail}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    {assignedSRbyId?.workCompletionStatus === 'arrived' && (
                      <TouchableOpacity
                        style={cameraStyles.closeButton}
                        onPress={() => handleRemovePhoto('customer', index)}>
                        <Text style={cameraStyles.closeText}>×</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Job Info */}
          <View style={styles.infoSection}>
            <InfoRow
              icon="calendar-outline"
              text={`Due ${moment(
                assignedSRbyId?.serviceRequest?.techVisitOn,
              ).format('MMM D, YYYY, h:mm A')}`}
            />
            {/* <InfoRow icon="time-outline" text="Job duration 1h 20mins" />
            <InfoRow icon="person-outline" text="Location BM" />
            <InfoRow icon="time-outline" text="Time spent 5hrs" /> */}
          </View>

          {/*---------------------------------------------------*/}

          {/* Timer */}
          {(assignedSRbyId?.workCompletionStatus === 'before-work' ||
            assignedSRbyId?.workCompletionStatus === 'work-started' ||
            assignedSRbyId?.workCompletionStatus === 'after-work' ||
            assignedSRbyId?.workCompletionStatus === 'on-hold') && (
              <View style={styles.card}>
                <Timer
                  item={assignedSRbyId}
                  setAssignedSRbyId={setAssignedSRbyId}
                />
              </View>
            )}

          {/*---------------------------------------------------*/}

          {/* Afrer Work Attachment Details */}
          {(assignedSRbyId?.workCompletionStatus === 'work-started' ||
            assignedSRbyId?.workCompletionStatus === 'after-work' ||
            assignedSRbyId?.workCompletionStatus === 'completed') && (
              <View style={styles.card}>
                <View style={cameraStyles.headingContainer}>
                  <Icon family="Ionicons" name="attach" />
                  <Text style={cameraStyles?.heading}>
                    {assignedSRbyId?.workCompletionStatus === 'work-started'
                      ? 'Upload '
                      : 'Uploaded '}
                    attachment after work
                  </Text>
                </View>
                <View>
                  {assignedSRbyId?.workCompletionStatus === 'work-started' && (
                    <View style={cameraStyles.content}>
                      <TouchableOpacity
                        style={cameraStyles.buttonContainer}
                        onPress={() => {
                          setPhotoType('customer');
                          setUploadModal(true);
                          setIsFromAfterWork(true);
                        }}>
                        <Icon
                          family="Entypo"
                          name="location"
                          size={hp(3)}
                          color={Colors.PRIMARY[100]}
                        />
                        <View>
                          <View style={cameraStyles.underlineWrapper}>
                            <Text style={cameraStyles.underlineText}>
                              Take Location Photo(s)
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={cameraStyles.buttonContainer}
                        onPress={() => {
                          setPhotoType('product');
                          setUploadModal(true);
                          setIsFromAfterWork(true);
                        }}>
                        <Icon
                          family="Entypo"
                          name="tools"
                          size={hp(3)}
                          color={Colors.PRIMARY[100]}
                        />
                        <View>
                          <View style={cameraStyles.underlineWrapper}>
                            <Text style={cameraStyles.underlineText}>
                              Take Snag Photo(s)
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  {afterWorkCustomerPhotos?.length > 0 && (
                    <View
                      style={{
                        marginTop: hp(1),
                      }}>
                      <Text style={cameraStyles.label}>Location Photos:</Text>
                      <View style={cameraStyles.photoRow}>
                        {afterWorkCustomerPhotos.map((photo, index) => (
                          <View
                            key={`customer-${index}`}
                            style={cameraStyles.imageWrapper}>
                            <TouchableOpacity
                              onPress={() => {
                                assignedSRbyId?.workCompletionStatus !==
                                  'work-started' && openImageModal(photo?.image);
                              }}>
                              <Image
                                source={{
                                  uri:
                                    photo?.image?.startsWith('data:image') ||
                                      photo?.image?.startsWith('http')
                                      ? photo.image
                                      : photo?.image?.length > 100
                                        ? `data:image/png;base64,${photo.image}`
                                        : '',
                                }}
                                style={cameraStyles.thumbnail}
                                resizeMode="cover"
                              />
                            </TouchableOpacity>
                            {assignedSRbyId?.workCompletionStatus ===
                              'work-started' && (
                                <TouchableOpacity
                                  style={cameraStyles.closeButton}
                                  onPress={() =>
                                    handleRemovePhoto('customer', index, true)
                                  }>
                                  <Text style={cameraStyles.closeText}>×</Text>
                                </TouchableOpacity>
                              )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  {afterWorkProductPhotos?.length > 0 && (
                    <View>
                      <Text style={cameraStyles.label}>Snag Photos:</Text>
                      <View style={cameraStyles.photoRow}>
                        {afterWorkProductPhotos?.map((photo, index) => (
                          <View
                            key={`customer-${index}`}
                            style={cameraStyles.imageWrapper}>
                            <TouchableOpacity
                              onPress={() => {
                                assignedSRbyId?.workCompletionStatus !==
                                  'work-started' && openImageModal(photo?.image);
                              }}>
                              <Image
                                source={{
                                  uri:
                                    photo?.image?.startsWith('data:image') ||
                                      photo?.image?.startsWith('http')
                                      ? photo.image
                                      : photo?.image?.length > 100
                                        ? `data:image/png;base64,${photo.image}`
                                        : '',
                                }}
                                style={cameraStyles.thumbnail}
                                resizeMode="cover"
                              />
                            </TouchableOpacity>
                            {assignedSRbyId?.workCompletionStatus ===
                              'work-started' && (
                                <TouchableOpacity
                                  style={cameraStyles.closeButton}
                                  onPress={() =>
                                    handleRemovePhoto('product', index, true)
                                  }>
                                  <Text style={cameraStyles.closeText}>×</Text>
                                </TouchableOpacity>
                              )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                </View>
                {assignedSRbyId?.workCompletionStatus === 'work-started' &&
                  afterWorkProductPhotos?.length > 0 &&
                  afterWorkCustomerPhotos?.length > 0 && (
                    <TouchableOpacity
                      style={[
                        styles.acceptButton,
                        {
                          marginTop: hp(1),
                        },
                      ]}
                      onPress={handleUploadPhotos}>
                      <Text style={styles.buttonText}>Upload Photos</Text>
                    </TouchableOpacity>
                  )}
              </View>
            )}

          {/*---------------------------------------------------*/}

          {/* Location */}
          <View style={styles.card}>
            <View style={styles.subCard}>
              <View style={styles.cardTitle}>
                <Icon family="Ionicons" name="location-outline" size={16} />
                <Text style={styles.cardHeading}>Location</Text>
              </View>
              <Text style={styles.cardText}>
                {assignedSRbyId?.serviceRequest?.address?.addressName},{' '}
                {assignedSRbyId?.serviceRequest?.address?.addressLine}
              </Text>
            </View>
            <View style={styles.seprator} />
            {/* Asset */}
            <View
              style={[
                styles.subCard,
                {
                  marginTop: hp(1),
                },
              ]}>
              <View style={styles.cardTitle}>
                <Icon family="Fontisto" name="person" size={16} />
                <Text style={styles.cardHeading}>Customer Details</Text>
              </View>
              <Text style={styles.cardText}>
                {assignedSRbyId?.serviceRequest?.customer?.userName}
              </Text>
              <Text style={styles.assetCode}>
                {assignedSRbyId?.serviceRequest?.customer?.countryCode}{' '}
                {assignedSRbyId?.serviceRequest?.customer?.phoneNumber}
              </Text>
              <Text style={styles.assetCode}>
                {assignedSRbyId?.serviceRequest?.customer?.email}
              </Text>
            </View>
            {/* Actions */}
            <View style={styles.buttonRow}>
              {assignedSRbyId?.workCompletionStatus === 'arrived' ? (
                <TouchableOpacity
                  style={[styles.acceptButton, { backgroundColor: '#ccc' }]}
                  disabled>
                  <Text style={styles.buttonText}>Marked as Arrived</Text>
                </TouchableOpacity>
              ) : assignedSRbyId?.workCompletionStatus === 'in-progress' ? (
                <TouchableOpacity
                  style={[styles.acceptButton]}
                  onPress={handleMarkAsArrived}>
                  <Text style={styles.buttonText}>Mark as Arrived</Text>
                </TouchableOpacity>
              ) : (
                assignedSRbyId.approvalStatus === 'pending' && (
                  <TouchableOpacity
                    style={[styles.acceptButton]}
                    onPress={handleApproveSR}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                )
              )}
              {assignedSRbyId.approvalStatus === 'pending' && (
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleRejectSR()}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/*---------------------------------------------------*/}

          {/* Quotation Details */}
          {(assignedSRbyId?.workCompletionStatus === 'before-work' ||
            assignedSRbyId?.workCompletionStatus === 'completed' ||
            assignedSRbyId?.workCompletionStatus === 'work-started' ||
            assignedSRbyId?.workCompletionStatus === 'after-work' ||
            assignedSRbyId?.workCompletionStatus === 'on-hold') && (
              <View style={styles.card}>
                <Quotation
                  item={assignedSRbyId}
                  setAssignedSRbyId={setAssignedSRbyId}
                  quotationData={assignedSRbyId?.serviceRequest?.quotation}
                  inventoryItems={inventoryItems}
                />
              </View>
            )}

          {/*---------------------------------------------------*/}

          {/* Before Work Attachment Details */}
          {(assignedSRbyId?.workCompletionStatus === 'arrived' ||
            assignedSRbyId?.workCompletionStatus === 'before-work' ||
            assignedSRbyId?.workCompletionStatus === 'completed' ||
            assignedSRbyId?.workCompletionStatus === 'work-started' ||
            assignedSRbyId?.workCompletionStatus === 'after-work' ||
            assignedSRbyId?.workCompletionStatus === 'on-hold') && (
              <View style={styles.card}>
                <View style={cameraStyles.headingContainer}>
                  <Icon family="Ionicons" name="attach" />
                  <Text style={cameraStyles?.heading}>
                    {assignedSRbyId?.workCompletionStatus === 'arrived'
                      ? 'Upload '
                      : 'Uploaded '}
                    attachment before work
                  </Text>
                </View>
                <View>
                  {assignedSRbyId?.workCompletionStatus === 'arrived' && (
                    <View style={cameraStyles.content}>
                      <TouchableOpacity
                        style={cameraStyles.buttonContainer}
                        onPress={() => {
                          setPhotoType('customer');
                          setUploadModal(true);
                        }}>
                        <Icon
                          family="Entypo"
                          name="location"
                          size={hp(3)}
                          color={Colors.PRIMARY[100]}
                        />
                        <View>
                          <View style={cameraStyles.underlineWrapper}>
                            <Text style={cameraStyles.underlineText}>
                              Take Location Photo(s)
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={cameraStyles.buttonContainer}
                        onPress={() => {
                          setPhotoType('product');
                          setUploadModal(true);
                        }}>
                        <Icon
                          family="Entypo"
                          name="tools"
                          size={hp(3)}
                          color={Colors.PRIMARY[100]}
                        />
                        <View>
                          <View style={cameraStyles.underlineWrapper}>
                            <Text style={cameraStyles.underlineText}>
                              Take Snag Photo(s)
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  {customerPhotos?.length > 0 && (
                    <View
                      style={{
                        marginTop: hp(1),
                      }}>
                      <Text style={cameraStyles.label}>Location Photos:</Text>
                      <View style={cameraStyles.photoRow}>
                        {customerPhotos.map((photo, index) => (
                          <View
                            key={`customer-${index}`}
                            style={cameraStyles.imageWrapper}>
                            <TouchableOpacity
                              onPress={() => {
                                assignedSRbyId?.workCompletionStatus !==
                                  'arrived' && openImageModal(photo?.image);
                              }}>
                              <Image
                                source={{
                                  uri:
                                    photo?.image?.startsWith('data:image') ||
                                      photo?.image?.startsWith('http')
                                      ? photo.image
                                      : photo?.image?.length > 100
                                        ? `data:image/png;base64,${photo.image}`
                                        : '',
                                }}
                                style={cameraStyles.thumbnail}
                                resizeMode="cover"
                              />
                            </TouchableOpacity>
                            {assignedSRbyId?.workCompletionStatus ===
                              'arrived' && (
                                <TouchableOpacity
                                  style={cameraStyles.closeButton}
                                  onPress={() =>
                                    handleRemovePhoto('customer', index)
                                  }>
                                  <Text style={cameraStyles.closeText}>×</Text>
                                </TouchableOpacity>
                              )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  {productPhotos?.length > 0 && (
                    <View>
                      <Text style={cameraStyles.label}>Snag Photos:</Text>
                      <View style={cameraStyles.photoRow}>
                        {productPhotos?.map((photo, index) => (
                          <View
                            key={`customer-${index}`}
                            style={cameraStyles.imageWrapper}>
                            <TouchableOpacity
                              onPress={() => {
                                assignedSRbyId?.workCompletionStatus !==
                                  'arrived' && openImageModal(photo?.image);
                              }}>
                              <Image
                                source={{
                                  uri:
                                    photo?.image?.startsWith('data:image') ||
                                      photo?.image?.startsWith('http')
                                      ? photo.image
                                      : photo?.image?.length > 100
                                        ? `data:image/png;base64,${photo.image}`
                                        : '',
                                }}
                                style={cameraStyles.thumbnail}
                                resizeMode="cover"
                              />
                            </TouchableOpacity>
                            {assignedSRbyId?.workCompletionStatus ===
                              'arrived' && (
                                <TouchableOpacity
                                  style={cameraStyles.closeButton}
                                  onPress={() =>
                                    handleRemovePhoto('product', index)
                                  }>
                                  <Text style={cameraStyles.closeText}>×</Text>
                                </TouchableOpacity>
                              )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  {assignedSRbyId?.description ?
                    <View>
                      <FloatingTextInput
                        label="Description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder={'Description'}
                        // error={errors.email}
                        rightIcon={true}
                        // rightImage={Images.ic_Mail}
                        // touched={touched.email}
                        isRequired
                        editable={false}
                      />
                    </View>
                    :
                    <View>
                      <Text style={cameraStyles.label}>Description:</Text>
                      <Text style={cameraStyles.labelContent}>{description}</Text>
                    </View>
                    }

                </View>
                {assignedSRbyId?.workCompletionStatus === 'arrived' &&
                  productPhotos?.length > 0 &&
                  customerPhotos?.length > 0 && (
                    <TouchableOpacity
                      style={[
                        styles.acceptButton,
                        {
                          marginTop: hp(1),
                        },
                      ]}
                      onPress={handleUploadPhotos}>
                      <Text style={styles.buttonText}>Upload Photos</Text>
                    </TouchableOpacity>
                  )}
              </View>
            )}
        </View>
      </ScrollView>
      <ReactNativeModal
        collapsable={true}
        onBackdropPress={() => {
          setUploadModal(false);
        }}
        isVisible={uploadModal}
        style={{ padding: 0, margin: 0 }}>
        <View
          style={{
            backgroundColor: '#fff',
            bottom: 0,
            position: 'absolute',
            left: 0,
            right: 0,
            height: DEVICE_HEIGHT * 0.22,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 6,
              flexDirection: 'row',
            }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  onImagePicker('Camera');
                }}
                style={cameraStyles.cameraIconContainer}>
                {/* <CameraIcon /> */}
                <Icon family="Entypo" name="camera" color="#fff" size={34} />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                }}>
                Camera
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  onImagePicker('Gallery');
                }}
                style={cameraStyles.galleryIconContainer}>
                {/* <GalleryIcon /> */}
                <Icon family="Fontisto" name="picture" color="#fff" size={28} />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                }}>
                Gallery
              </Text>
            </View>
          </View>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={locationModalVisible}
        style={cameraStyles.modal}
        onBackdropPress={() => setLocationModalVisible(false)}>
        <View style={cameraStyles.locationModalContainer}>
          <MapView
            ref={mapRef}
            style={cameraStyles.map}
            initialRegion={{
              latitude: locations.technician.latitude,
              longitude: locations.technician.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={locations.technician}
              title="Technician Location"
              pinColor="blue"
            />
            <Marker
              coordinate={locations.customer}
              title="Customer Location"
              pinColor="red"
            />
          </MapView>

          <View style={cameraStyles.distanceBadge}>
            <Text style={cameraStyles.distanceBadgeText}>
              Distance: {distance?.toFixed(2) || '--'} km
            </Text>
          </View>

          <TouchableOpacity
            style={cameraStyles.doneButton}
            onPress={() => setLocationModalVisible(false)}>
            <Text style={cameraStyles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>

      <Loader visible={isLoading} />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={cameraStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={cameraStyles.modalContent}
            onPress={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button - Top Left */}
            <TouchableOpacity
              style={cameraStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={cameraStyles.modalCloseButtonText}>×</Text>
            </TouchableOpacity>

            <Image
              source={{ uri: selectedImage }}
              style={cameraStyles.image}
              resizeMode="contain"
            />

            <View style={cameraStyles.metaDataContainer}>
              {assignedSRbyId.createdAt && (
                <Text style={cameraStyles.metaText}>
                  📅 {moment(
                    assignedSRbyId?.createdAt,
                  ).format('DD -MMM-YYYY h:mm A')}
                </Text>
              )}
              {/* {assignedSRbyId?.serviceRequest?.address && (
          <Text style={cameraStyles.metaText}>
            📍 {assignedSRbyId?.serviceRequest?.address?.addressName},{' '}
            {assignedSRbyId?.serviceRequest?.address?.addressLine}
          </Text>
        )} */}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const cameraStyles = StyleSheet.create({
  content: {
    margin: moderateScale(20),
    gap: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 4,
    right: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'black',
    fontSize: 28,
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  metaDataContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 5,
  },
  metaText: {
    color: 'black',
    fontSize: 12,
    marginVertical: 2,
    fontFamily: Fonts.Medium
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: Colors.BLACK,
    fontFamily: Fonts.Medium,
    marginLeft: wp(0.2),
    fontSize: moderateScale(15),
  },
  buttonContainer: {
    borderStyle: 'dashed',
    borderColor: Colors.GREY,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    height: hp(15),
    width: wp(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    // marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    // fontWeight: 'bold',
    color: Colors.BLACK,
    fontFamily: Fonts.Medium,
  },
  labelContent: {
    // fontWeight: 'bold',
    color: Colors.BLACK,
    fontFamily: Fonts.Light,
    marginTop:moderateScale(4)
  },

  imageWrapper: {
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  underlineWrapper: {},
  underlineText: {
    color: Colors.BLACK,
    fontSize: moderateScale(12),
    width: wp(30),
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    marginTop: hp(1),
  },
  cameraIconContainer: {
    backgroundColor: '#0072CE',
    padding: 20,
    borderRadius: 12,
    margin: 10,
    marginHorizontal: 20,
    height: DEVICE_HEIGHT * 0.1,
    width: DEVICE_HEIGHT * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryIconContainer: {
    backgroundColor: '#AC4FC6',
    padding: 20,
    borderRadius: 12,
    margin: 10,
    marginHorizontal: 20,
    height: DEVICE_HEIGHT * 0.1,
    width: DEVICE_HEIGHT * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Modal Screen
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '80%',
  },
  modalCloseArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // modalCloseButton: {
  //   position: 'absolute',
  //   top: 40,
  //   right: 20,
  //   zIndex: 1,
  // },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  mainContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobId: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  statusBadgeContainer: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 5,
  },
  statusBadge: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Medium,
  },
  title: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
    marginTop: hp(1),
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: wp(4),
    marginTop: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subCard: {
    marginBottom: hp(1),
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  cardHeading: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
    marginLeft: wp(2),
  },
  cardText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
  },
  distanceText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.PRIMARY[100],
    marginTop: hp(1),
  },
  locationButton: {
    backgroundColor: Colors.PRIMARY[100],
    padding: wp(3),
    borderRadius: 5,
    marginTop: hp(1),
    alignItems: 'center',
  },
  locationButtonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(14),
  },
  // map: {
  //   width: '100%',
  //   height: hp(80),
  //   borderRadius: 10,
  // },
  mapModalCloseButton: {
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  closeButtonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(14),
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: moderateScale(12),
    marginTop: hp(0),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  distanceIcon: {
    backgroundColor: Colors.PRIMARY[100],
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  distanceTextContainer: {
    flex: 1,
  },
  distanceLabel: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
    marginBottom: hp(0.5),
  },
  distanceValue: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.SemiBold,
    color: Colors.BLACK,
  },
  distanceUnit: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
  },
  mapButton: {
    backgroundColor: Colors.PRIMARY[100],
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
    marginLeft: moderateScale(8),
  },
  mapButtonText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Medium,
    color: Colors.WHITE,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  locationModalContainer: {
    height: '90%',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  distanceBadge: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  distanceBadgeText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  doneButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY[100],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  doneButtonText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.WHITE,
  },
});

export default WorkOrderDetailScreen;
