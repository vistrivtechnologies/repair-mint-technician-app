import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import styles from './profileScreen.styles';
import Icon from '../../../constant/Icon';
import { Colors, Images } from '../../../constant';
import { HomeStackProps } from '../../../@types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { UserData, UserDataContext } from '../../../context/userDataContext';
import { handleSignout } from '../../../helpers/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProfileOption {
  id: string;
  title: string;
  subtitle: string;
  icon?: any;
  ionicons?: any;
  onPress: () => void;
}
type ProfileScreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  'ProfileScreen'
>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationType>();
  const { isDarkMode, setUserData } = useContext<UserData>(UserDataContext);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const background =
    isDarkMode === 'dark' ? Colors.PRIMARY[400] : Colors.PRIMARY[300];
  const textColor =
    isDarkMode === 'dark' ? Colors.PRIMARY[300] : Colors.PRIMARY[400];

  const profileOptions: ProfileOption[] = [
    {
      id: '1',
      title: 'App Language',
      subtitle: 'English (US)',
      icon: Images.ic_Language,
      onPress: () => console.log('App Language pressed'),
    },
    {
      id: '2',
      title: 'App Theme',
      subtitle: 'Light mode',
      icon: Images.ic_Theme,
      onPress: () => console.log('App Theme pressed'),
    },
    {
      id: '3',
      title: 'Change Password',
      subtitle: 'Update your password',
      icon: Images.ic_ChangePassword,
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      id: '4',
      title: 'Earning List',
      subtitle: 'View payment history',
      icon: Images.ic_EarningList,
      onPress: () => navigation.navigate('EarningList'),
    },
    {
      id: '5',
      title: 'Configure Slots',
      subtitle: 'Manage your availability',
      ionicons: (
        <Ionicons
          name="timer-outline"
          size={28}
          color={Colors.SECONDARY[100]}
        />
      )
      ,
      onPress: () => navigation.navigate('ConfigureSlots'),
    },
  ];

  const signout = async () => {
    setLogoutModalVisible(false);
    handleSignout(setUserData);
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: heightPercentageToDP(2) }}>
        {/* Profile Header Section */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
          }}
          style={styles.profileHeader}
          imageStyle={styles.profileHeaderImage}>
          <View pointerEvents="none" style={styles.profileHeaderOverlay} />
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageBackground}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                }}
                style={styles.profileImage}
              />
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}>
              <Icon family="MaterialCommunityIcons" name="pencil-outline" style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>Ashutosh Pandey</Text>
          <Text style={styles.profileEmail}>ashutosh@amitcorpo.com</Text>
        </ImageBackground>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>259+</Text>
            <Text style={styles.statLabel}>Service</Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>05 +</Text>
            <Text style={styles.statLabel}>Years of</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Customer</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Options Section */}
        <Text style={styles.sectionTitle}>My Services</Text>
        <View style={styles.optionsContainer}>
          {profileOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={option.onPress}>
              <View style={styles.optionLeft}>
                {option.icon ?

                  <Image source={option.icon} style={styles.optionIcon} />
                  :
                  <Text>{option.ionicons}</Text>
                }
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.BODY}
                style={styles.optionChevron}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLogoutModalVisible(true)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image source={Images.logOutBanner} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>
              Do you really want to logout?
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalLogoutButton}
                onPress={signout}>
                <Text style={styles.modalLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
