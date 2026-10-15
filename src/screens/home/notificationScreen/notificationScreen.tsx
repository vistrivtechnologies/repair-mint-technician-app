import React, {useContext} from 'react';
import {
  View,
  Text,
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
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Notification {
  id: string;
  type: 'add' | 'cancel';
  category: 'Reminders' | 'Payment' | 'Booking';
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
  const [selectedFilter, setSelectedFilter] = React.useState('All');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'add',
      category: 'Booking',
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
      category: 'Booking',
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
      category: 'Reminders',
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
      category: 'Reminders',
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
      category: 'Payment',
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
      category: 'Payment',
      title: 'Cancel Booking',
      description: 'New Booking Added by',
      customerName: 'Mary Krismass',
      timestamp: '2024-01-13T10:00:00Z',
      timeAgo: '2 day',
      avatar: '👩‍💼',
      isNew: false,
    },
  ];

  const getNotificationIcon = (category: Notification['category']) => {
    if (category === 'Payment') return 'card-outline';
    if (category === 'Reminders') return 'notifications-outline';
    return 'calendar-outline';
  };

  const getNotificationIconStyle = (category: Notification['category']) => {
    if (category === 'Payment') return styles.paymentIcon;
    if (category === 'Reminders') return styles.reminderIcon;
    return styles.bookingIcon;
  };

  const filteredNotifications = notifications.filter(
    notification =>
      selectedFilter === 'All' || notification.category === selectedFilter,
  );
  const newNotifications = filteredNotifications.filter(n => n.isNew);
  const earlierNotifications = filteredNotifications.filter(n => !n.isNew);

  const renderNotificationItem = ({item}: {item: Notification}) => (
    <TouchableOpacity key={item.id} style={styles.notificationItem}>
      <View style={[styles.avatarContainer, getNotificationIconStyle(item.category)]}>
        <Ionicons
          name={getNotificationIcon(item.category)}
          size={22}
          color={Colors.WHITE}
        />
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightPercentageToDP(2)}}>
        <Header title="Notification" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}>
          {['All', 'Reminders', 'Payment', 'Booking'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
