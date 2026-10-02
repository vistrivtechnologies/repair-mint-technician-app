import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import Icon from '../../../constant/Icon';
import styles from './bookingListScreen.styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackProps} from '../../../@types';
import {useNavigation} from '@react-navigation/native';
import {UserData, UserDataContext} from '../../../context/userDataContext';
import {Colors, Fonts, Images} from '../../../constant';
import {Header, TextView} from '../../../components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AssignedSR,
  AssignedSRContext,
} from '../../../context/assignedSRContext';
import moment from 'moment';
import {statusTheme} from '../../../helpers/statusTheme';

type BookingListScreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  'BookingListScreen'
>;

interface TimerData {
  time: number;
  holdTime: number;
  activeHold: any;
}

const BookingListScreen = () => {
  const navigation = useNavigation<BookingListScreenNavigationType>();
  const {isDarkMode} = useContext<UserData>(UserDataContext);
  const {assignedSR} = useContext<AssignedSR>(AssignedSRContext);
  const [timers, setTimers] = useState<{[key: string]: TimerData}>({});
  const [selectedWorkFilter, setSelectedWorkFilter] = useState('All');
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);

  const getWorkFilter = (item: any) => {
    if (item?.workCompletionTime) return 'Completed';
    if (item?.workStartTime) return 'In Progress';
    return 'To Do';
  };

  const workCounts = useMemo(
    () => ({
      toDo: assignedSR.filter(item => getWorkFilter(item) === 'To Do').length,
      inProgress: assignedSR.filter(item => getWorkFilter(item) === 'In Progress').length,
      completed: assignedSR.filter(item => getWorkFilter(item) === 'Completed').length,
    }),
    [assignedSR],
  );

  const filteredAssignedSR = useMemo(
    () =>
      selectedWorkFilter === 'All'
        ? assignedSR
        : assignedSR.filter(item => getWorkFilter(item) === selectedWorkFilter),
    [assignedSR, selectedWorkFilter],
  );

  const getDurationFromNow = (timestamp: string | Date) => {
    const now = moment();
    const then = moment(timestamp);
    const diffInDays = now.diff(then, 'days');

    if (diffInDays >= 1) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      const duration = moment.duration(now.diff(then));
      const hours = Math.floor(duration.asHours());
      const minutes = Math.floor(duration.minutes());

      return `${hours}h ${minutes}m ago`;
    }
  };

  const getTimeSpentBetween = (
    startTime: string | Date,
    endTime: string | Date,
    holds: any[] = []
  ) => {
    if (!startTime) return '--:--:--';
    
    const start = moment(startTime);
    const end = endTime ? moment(endTime) : moment();
    
    let totalHoldSeconds = 0;
    
    holds?.forEach((hold: any) => {
      const holdStart = moment(hold.holdStartTime);
      const holdEnd = hold.holdEndTime ? moment(hold.holdEndTime) : end;
      totalHoldSeconds += holdEnd.diff(holdStart, 'seconds');
    });

    const totalElapsedSeconds = end.diff(start, 'seconds');
    const effectiveWorkingTime = Math.max(totalElapsedSeconds - totalHoldSeconds, 0);

    return formatTime(effectiveWorkingTime);
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const updated: typeof prev = {};
        
        assignedSR.forEach(item => {
          if (item?.workStartTime && !item?.workCompletionTime) {
            const startTime = moment(item.workStartTime);
            const now = moment();

            let totalHoldSeconds = 0;
            let activeHold = null;

            item.holds?.forEach((hold: any) => {
              const holdStart = moment(hold.holdStartTime);
              const holdEnd = hold.holdEndTime ? moment(hold.holdEndTime) : now;
              totalHoldSeconds += holdEnd.diff(holdStart, 'seconds');

              if (!hold.holdEndTime) {
                activeHold = hold;
              }
            });

            const totalElapsedSeconds = now.diff(startTime, 'seconds');
            const effectiveWorkingTime = Math.max(totalElapsedSeconds - totalHoldSeconds, 0);

            updated[item._id] = {
              time: effectiveWorkingTime,
              holdTime: totalHoldSeconds,
              activeHold
            };
          }
        });

        return {...prev, ...updated};
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [assignedSR]);

  const renderBookingList = ({item}: {item: any}) => {
    const timerData = timers[item._id] || {
      time: 0,
      holdTime: 0,
      activeHold: null
    };
    
    const isWorkInProgress = item?.workStartTime && !item?.workCompletionTime;
    const isWorkCompleted = item?.workCompletionTime;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WorkOrderDetailScreen', {item: item})
        }>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>
                {item?.serviceRequest?.problemDescription?.slice(0, 2)}
              </Text>
            </View>
            {isWorkInProgress && (
              <Text style={styles.startedText}>
                {timerData.activeHold ? 'On Hold' : 'In Progress'}: {formatTime(timerData.time)}
              </Text>
            )}
            {isWorkCompleted && (
              <Text style={styles.startedText}>
                Completed: {getDurationFromNow(item?.workCompletionTime)}
              </Text>
            )}
          </View>

          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {item?.serviceRequest?.problemDescription}
          </Text>

          <View style={styles.infoBox}>
            <View style={{flexDirection: 'row'}}>
              <Icon family="Ionicons" name="location-outline" size={16} />
              <TextView style={styles.infoText}>
                {item?.serviceRequest?.address?.addressName},{' '}
                {item?.serviceRequest?.address?.addressLine}
              </TextView>
            </View>
          </View>

          <View style={styles.dataRow}>
            <View style={styles.data}>
              <Text style={styles.dataText}>
                {moment(item.createdAt).format('MMM D, h:mma')}
              </Text>
              <Text style={styles.dataInstruction}>Assigned Date</Text>
            </View>

            <View style={styles.verticalSeprator} />

            <View style={styles.data}>
              <Text style={styles.dataText}>1h 20mins</Text>
              <Text style={styles.dataInstruction}>Job plan</Text>
            </View>

            <View style={styles.verticalSeprator} />

            <View style={styles.data}>
              <Text style={styles.dataText}>12 of 15 done</Text>
              <Text style={styles.dataInstruction}>Tasks</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <View
                style={[
                  styles.statusBadgeContainer,
                  {
                    backgroundColor: statusTheme(item?.workCompletionStatus)
                      ?.backgroundColor,
                  },
                ]}>
                <Text
                  style={[
                    styles.statusBadge,
                    {
                      color: statusTheme(item?.workCompletionStatus)?.color,
                    },
                  ]}>
                  {item?.workCompletionStatus}
                </Text>
              </View>
              <Text style={styles.timeSpent}>
                Time spent: {getTimeSpentBetween(
                  item?.workStartTime,
                  item?.workCompletionTime,
                  item?.holds
                )}
              </Text>
            </View>

            <View style={styles.priorityCircle}>
              <Text style={styles.priorityText}>H</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(2)}}>
        <Header title="Booking List" />

        <View style={styles.infoContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statusFilterRow}>
            {['All', 'To Do', 'In Progress', 'Completed'].map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.statusFilter,
                  selectedWorkFilter === filter && styles.statusFilterActive,
                ]}
                onPress={() => setSelectedWorkFilter(filter)}>
                <Text
                  style={[
                    styles.statusFilterText,
                    selectedWorkFilter === filter && styles.statusFilterTextActive,
                  ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, styles.toDoSummary]}>
              <Text style={styles.summaryLabel}>To Do</Text>
              <Text style={styles.summaryNumber}>{workCounts.toDo}</Text>
            </View>
            <View style={[styles.summaryCard, styles.inProgressSummary]}>
              <Text style={styles.summaryLabel}>In Progress</Text>
              <Text style={styles.summaryNumber}>{workCounts.inProgress}</Text>
            </View>
            <View style={[styles.summaryCard, styles.completedSummary]}>
              <Text style={styles.summaryLabel}>Completed</Text>
              <Text style={styles.summaryNumber}>{workCounts.completed}</Text>
            </View>
          </View>
          <View style={styles.moreFiltersRow}>
            <TouchableOpacity
              style={styles.moreFiltersButton}
              onPress={() => setMoreFiltersVisible(true)}>
              <Icon
                family="MaterialCommunityIcons"
                name="tune-variant"
                size={15}
                color={Colors.PRIMARY[100]}
              />
              <Text style={styles.moreFiltersText}>More Filters</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: hp(1),
            }}>
            <Text style={styles.countText}>
              Showing {filteredAssignedSR?.length ?? 0} workorders
            </Text>
            <Image
              source={Images.ic_up_down}
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                marginRight: wp(3),
              }}
            />
          </View>
          <FlatList
            data={filteredAssignedSR}
            keyExtractor={item => item._id}
            renderItem={renderBookingList}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <Modal
        visible={moreFiltersVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMoreFiltersVisible(false)}>
        <View style={styles.moreFiltersOverlay}>
          <View style={styles.moreFiltersModal}>
            <View style={styles.moreFiltersModalHeader}>
              <Text style={styles.moreFiltersTitle}>More Filters</Text>
              <TouchableOpacity onPress={() => setMoreFiltersVisible(false)}>
                <Icon family="Ionicons" name="close" size={22} color={Colors.HEADING} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.criticalFilterOption}>
              <Icon
                family="MaterialCommunityIcons"
                name="alert-outline"
                size={18}
                color={Colors.WHITE}
              />
              <Text style={styles.criticalFilterText}>C- Critical</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.highFilterOption}>
              <Icon
                family="MaterialCommunityIcons"
                name="flag-variant-outline"
                size={18}
                color={Colors.WHITE}
              />
              <Text style={styles.highFilterText}>H- High</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lowFilterOption}>
              <Icon
                family="MaterialCommunityIcons"
                name="arrow-down-circle-outline"
                size={18}
                color={Colors.WHITE}
              />
              <Text style={styles.lowFilterText}>L- Low</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BookingListScreen;