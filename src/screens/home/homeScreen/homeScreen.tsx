import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Icon from '../../../constant/Icon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {HomeStackProps} from '../../../@types';
import styles from './homeScreen.styles';
import {CircularProgress, TextView} from '../../../components';
import {Colors} from '../../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserData, UserDataContext} from '../../../context/userDataContext';
import {LocalStorage} from '../../../helpers/localstorage';
import {API as FetchAPI} from '../../../api//fetchApis';
import {AssignedSRContext} from '../../../context';
import {AssignedSR} from '../../../context/assignedSRContext';
import moment from 'moment';

const statData = [
  {
    id: '1',
    title: 'Critical Worklist',
    count: 3,
    color: Colors.STATUS.WARNING,
    icon: 'alert-circle-outline',
  },
  {
    id: '2',
    title: 'In progress Worklist',
    count: 7,
    color: Colors.ACCENT,
    icon: 'progress-clock',
  },
  {
    id: '3',
    title: 'Overdue Worklist',
    count: 5,
    color: Colors.STATUS.INFO,
    icon: 'calendar-clock-outline',
  },
  {
    id: '4',
    title: 'My Plan',
    count: 4,
    color: Colors.SECONDARY[100],
    icon: 'clipboard-check-outline',
  },
];

type HomeScreenScreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  'HomeScreen'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenScreenNavigationType>();
  const {userData} = useContext<UserData>(UserDataContext);
  const {assignedSR, setAssignedSR} = useContext<AssignedSR>(AssignedSRContext);
  const [refreshing, setRefreshing] = useState(false);

  const todayAssignedCount = assignedSR.filter(item =>
    moment(item?.serviceRequest?.techVisitOn).isSame(moment(), 'day'),
  ).length;

  const completedAssignedCount = assignedSR.filter(
    item =>
      moment(item?.serviceRequest?.techVisitOn).isSame(moment(), 'day') &&
      item?.workCompletionStatus?.toLowerCase() === 'completed',
  ).length;

  const completionPercentage =
    todayAssignedCount === 0
      ? 0
      : Math.round((completedAssignedCount / todayAssignedCount) * 100);
  const pendingWorkLoads = assignedSR
    ?.map(item => {
      if (item?.approvalStatus?.toLowerCase() === 'pending') {
        return item;
      }
      return null;
    })
    .filter(item => item !== null)
    .slice(0, 3);

  const recentWorkLoads = assignedSR
    ?.map(item => {
      if (item?.approvalStatus?.toLowerCase() !== 'pending') {
        return item;
      }
      return null;
    })
    .filter(item => item !== null)
    .slice(0, 2);

  const onRefresh = async () => {
    setRefreshing(true);
    await getAsync();
    setRefreshing(false);
  };
  const getAsync = async () => {
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

  useLayoutEffect(() => {
    getAsync();
    // eslint-disable-next-line
  }, []);

  const StatCard = ({item}: {item: any}) => (
    <View style={styles.statCard}>
      <View style={styles.statTopRow}>
        <Text style={styles.statCount}>{item?.count}</Text>
        <View style={[styles.statIconTile, {backgroundColor: `${item?.color}22`}]}>
          <Icon
            family="MaterialCommunityIcons"
            name={item?.icon}
            size={21}
            color={item?.color}
          />
        </View>
      </View>
      <Text style={styles.statTitle}>{item?.title}</Text>
    </View>
  );

  const WorkOrderCard = ({item, index}: {item: any; index: number}) => {
    // const tagColors: { [key: string]: string } = {
    //   BM: '#F44336',
    //   CM: '#7E57C2',
    //   PM: '#29B6F6',
    //   EM: '#FFA726',
    // };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WorkOrderDetailScreen', {item: item})
        }
        style={styles.workOrderCard}>
        <View
          style={[
            styles.tag,
              {
                backgroundColor:
                  index % 2 === 0 ? Colors.SECONDARY[100] : Colors.ACCENT,
              },
          ]}>
          <Text style={styles.tagText}>
            {item?.serviceRequest?.problemDescription?.slice(0, 2)}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.workOrderTitle}>
            {item?.serviceRequest?.problemDescription}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.workOrderZone}>
            {item?.serviceRequest?.address?.addressLine}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const RecentCard = ({item}: {item: any}) => {
    const statusColors: {[key: string]: string} = {
      'IN PROGRESS': Colors.SECONDARY[100],
      'ON HOLD': Colors.STATUS.WARNING,
      completed: Colors.STATUS.SUCCESS,
      CRITICAL: Colors.STATUS.DANGER,
    };

    const statusBackgroundColors: {[key: string]: string} = {
      'IN PROGRESS': Colors.PRIMARY[600],
      'ON HOLD': Colors.STATUS.WARNING_SOFT,
      completed: Colors.STATUS.SUCCESS_SOFT,
      CRITICAL: Colors.STATUS.DANGER_SOFT,
    };

    const statusColor =
      statusColors[item?.workCompletionStatus?.toUpperCase()] ||
      Colors.STATUS.SUCCESS;
    const statusbgColour =
      statusBackgroundColors[item?.workCompletionStatus?.toUpperCase()] ||
      Colors.PRIMARY[600];

    return (
      <View style={styles.recentCard}>
        <View style={styles.recentHeader}>
          <View
            style={{
              backgroundColor: statusbgColour,
              justifyContent: 'center',
              borderRadius: 7,
              paddingHorizontal: 10,
            }}>
            <TextView style={[styles.recentStatus, {color: statusColor}]}>
              {item?.workCompletionStatus?.toLowerCase() === 'completed'
                ? item?.workCompletionStatus
                : item?.approvalStatus}
            </TextView>
          </View>

          <View style={[styles.tag, {backgroundColor: Colors.ACCENT}]}>
            <TextView style={styles.tagText}>
              {item?.serviceRequest?.problemDescription?.slice(0, 2)}
            </TextView>
          </View>
        </View>

        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={styles.recentsTitle}>
          {item?.serviceRequest?.problemDescription}
        </Text>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: Colors.BORDERCOLOR,
          }}
        />
        <TextView style={styles.workOrderZone}>
          {item?.serviceRequest?.address?.addressName}
        </TextView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(2)}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{width: wp(90), alignSelf: 'center'}}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIconTile}>
              <Icon
                family="MaterialCommunityIcons"
                name="view-dashboard-outline"
                size={21}
                color={Colors.PRIMARY[100]}
              />
            </View>
            <View style={styles.profile}>
              <Image
                source={{uri: 'https://via.placeholder.com/40'}}
                style={styles.avatar}
              />
            </View>
          </View>

          {/* Greetings */}
          <TextView style={styles.greeting}>
            Hi, {userData?.user?.userName?.split(' ')[0]}
          </TextView>
          <TextView style={styles.subGreeting}>
            {todayAssignedCount} new work orders for you today
          </TextView>

          {/* Progress Summary */}
          <View style={styles.progressCard}>
            <CircularProgress percentage={completionPercentage} />

            <View>
              <TextView style={styles.progressText}>
                Today's Progress Summary
              </TextView>
              <TextView style={styles.progressDetails}>
                {completedAssignedCount}/{todayAssignedCount} workorders done
              </TextView>
            </View>
          </View>

          {/* Stat Cards */}
          <FlatList
            data={statData}
            keyExtractor={item => item.id}
            renderItem={({item}) => <StatCard item={item} />}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            contentContainerStyle={styles.statsContainer}
          />

          {/* New Worklist */}
          <TextView style={styles.sectionTitle}>New Worklist</TextView>
          {pendingWorkLoads?.length <= 0 && (
            <Text style={styles.noWorkordersCon}>
              <TextView style={styles.noWorkorders}>
                No workloads assigned for you now
              </TextView>
            </Text>
          )}
          <FlatList
            data={pendingWorkLoads}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <WorkOrderCard item={item} index={index} />
            )}
            scrollEnabled={false}
          />

          {/* Recent Workorders */}
          <TextView style={[styles.sectionTitle]}>Recents</TextView>
          <FlatList
            data={recentWorkLoads}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RecentCard item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
