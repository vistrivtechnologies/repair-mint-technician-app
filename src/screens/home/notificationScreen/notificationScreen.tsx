import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {HomeStackProps} from '../../../@types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {UserData, UserDataContext} from '../../../context/userDataContext';
import {Colors} from '../../../constant';
import styles from './notificationScreen.styles';
import Icon from '../../../constant/Icon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../components';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface Notification {
  id: string;
  type: 'add' | 'cancel';
  title: string;
  description: string;
  customerName: string;
  timestamp: string;
  timeAgo: string;
  avatar: string;
  isNew: boolean;
}

type NotificationScreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  'NotificationScreen'
>;

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation<NotificationScreenNavigationType>();
  const {isDarkMode} = useContext<UserData>(UserDataContext);

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'add',
      title: 'Add Booking',
      description: 'New Booking Added by',
      customerName: 'Amit Pandey',
      timestamp: '2024-01-15T10:00:00Z',
      timeAgo: '02 min ago',
      avatar: '👨‍💼',
      isNew: true,
    },
    {
      id: '2',
      type: 'cancel',
      title: 'Cancel Booking',
      description: 'New Booking Added by',
      customerName: 'Stan Dupp',
      timestamp: '2024-01-15T09:35:00Z',
      timeAgo: '25 min ago',
      avatar: '👨‍💼',
      isNew: true,
    },
    {
      id: '3',
      type: 'add',
      title: 'Add Booking',
      description: 'New Booking Added by',
      customerName: 'Anna Domino',
      timestamp: '2024-01-15T09:30:00Z',
      timeAgo: '30 min ago',
      avatar: '👩‍💼',
      isNew: true,
    },
    {
      id: '4',
      type: 'cancel',
      title: 'Cancel Booking',
      description: 'New Booking Added by',
      customerName: 'Albert Watson',
      timestamp: '2024-01-15T09:35:00Z',
      timeAgo: '25 min ago',
      avatar: '👨‍💼',
      isNew: true,
    },
    {
      id: '5',
      type: 'add',
      title: 'Add Booking',
      description: 'New Booking Added by',
      customerName: 'Mustafa Leek',
      timestamp: '2024-01-14T10:00:00Z',
      timeAgo: '1 day',
      avatar: '👨‍💼',
      isNew: false,
    },
    {
      id: '6',
      type: 'cancel',
      title: 'Cancel Booking',
      description: 'New Booking Added by',
      customerName: 'Mary Krismass',
      timestamp: '2024-01-13T10:00:00Z',
      timeAgo: '2 day',
      avatar: '👩‍💼',
      isNew: false,
    },
  ];

  const renderNotificationItem = ({item}: {item: Notification}) => (
    <TouchableOpacity key={item.id} style={styles.notificationItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </View>
        <View style={styles.notificationBody}>
          <Text style={styles.notificationDescription}>{item.description}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const newNotifications = notifications.filter(n => n.isNew);
  const earlierNotifications = notifications.filter(n => !n.isNew);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}>
        <Header title="Notification" />

        {/* New Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New</Text>
            <TouchableOpacity>
              <Text style={styles.markAllRead}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={newNotifications}
              keyExtractor={item => item.id}
              renderItem={renderNotificationItem}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Earlier Notifications */}
        {earlierNotifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Earlier</Text>
            </View>
            <FlatList
              data={earlierNotifications}
              keyExtractor={item => item.id}
              renderItem={renderNotificationItem}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
