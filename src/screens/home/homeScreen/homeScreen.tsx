import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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
import {Colors, Images} from '../../../constant';
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
    color: '#F44336',
    image: Images.ic_warning,
  },
  {
    id: '2',
    title: 'In progress Worklist',
    count: 7,
    color: '#7E57C2',
    image: Images.ic_hourglass,
  },
  {
    id: '3',
    title: 'Overdue Worklist',
    count: 5,
    color: '#FFA726',
    image: Images.ic_calendar,
  },
  {
    id: '4',
    title: 'My Plan',
    count: 4,
    color: '#29B6F6',
    image: Images.ic_editfile,
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
  const [assignedSRList, setAssignedSRList] = useState<any>([]);
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
          setAssignedSRList(res?.data?.assignedServiceRequests?.slice(0, 3));
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
    <View style={[styles.statCard, {backgroundColor: item?.color}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.statCount}>{item?.count}</Text>
        <Image
          source={item?.image}
          style={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
            tintColor: '#fff',
          }}
        />
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
            {backgroundColor: index % 2 === 0 ? '#F44336' : '#7E57C2'},
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
      'IN PROGRESS': '#601bd6',
      'ON HOLD': '#ff9900',
      completed: '#66BB6A',
      CRITICAL: '#EF5350',
    };

    const statusBackgroundColors: {[key: string]: string} = {
      'IN PROGRESS': '#ebe2f9',
      'ON HOLD': '#fff3cd',
      completed: '#d4fad6',
      CRITICAL: '#f3bebd',
    };

    const statusColor =
      statusColors[item?.workCompletionStatus?.toLowerCase()] || '#66BB6A';
    const statusbgColour =
      statusBackgroundColors[item?.workCompletionStatus?.toLowerCase()] ||
      '#d4fad6';

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

          <View style={[styles.tag, {backgroundColor: '#ef9a9a'}]}>
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
            <Icon family="Ionicons" name="grid" size={24} color="black" />
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
