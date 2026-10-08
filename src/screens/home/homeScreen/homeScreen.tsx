// import React, {useContext, useLayoutEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ScrollView,
//   StatusBar,
//   RefreshControl,
// } from 'react-native';
// import Icon from '../../../constant/Icon';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
// import {HomeStackProps} from '../../../@types';
// import styles from './homeScreen.styles';
// import {CircularProgress, TextView} from '../../../components';
// import {Colors} from '../../../constant';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {UserData, UserDataContext} from '../../../context/userDataContext';
// import {LocalStorage} from '../../../helpers/localstorage';
// import {API as FetchAPI} from '../../../api//fetchApis';
// import {AssignedSRContext} from '../../../context';
// import {AssignedSR} from '../../../context/assignedSRContext';
// import moment from 'moment';
//
// const statData = [
//   {
//     id: '1',
//     title: 'Critical Worklist',
//     count: 3,
//     color: Colors.STATUS.WARNING,
//     icon: 'alert-circle-outline',
//   },
//   {
//     id: '2',
//     title: 'In progress Worklist',
//     count: 7,
//     color: Colors.ACCENT,
//     icon: 'progress-clock',
//   },
//   {
//     id: '3',
//     title: 'Overdue Worklist',
//     count: 5,
//     color: Colors.STATUS.INFO,
//     icon: 'calendar-clock-outline',
//   },
//   {
//     id: '4',
//     title: 'My Plan',
//     count: 4,
//     color: Colors.SECONDARY[100],
//     icon: 'clipboard-check-outline',
//   },
// ];
//
// type HomeScreenScreenNavigationType = NativeStackNavigationProp<
//   HomeStackProps,
//   'HomeScreen'
// >;
//
// const HomeScreen: React.FC = () => {
//   const navigation = useNavigation<HomeScreenScreenNavigationType>();
//   const {userData} = useContext<UserData>(UserDataContext);
//   const {assignedSR, setAssignedSR} = useContext<AssignedSR>(AssignedSRContext);
//   const [refreshing, setRefreshing] = useState(false);
//
//   const todayAssignedCount = assignedSR.filter(item =>
//     moment(item?.serviceRequest?.techVisitOn).isSame(moment(), 'day'),
//   ).length;
//
//   const completedAssignedCount = assignedSR.filter(
//     item =>
//       moment(item?.serviceRequest?.techVisitOn).isSame(moment(), 'day') &&
//       item?.workCompletionStatus?.toLowerCase() === 'completed',
//   ).length;
//
//   const completionPercentage =
//     todayAssignedCount === 0
//       ? 0
//       : Math.round((completedAssignedCount / todayAssignedCount) * 100);
//   const pendingWorkLoads = assignedSR
//     ?.map(item => {
//       if (item?.approvalStatus?.toLowerCase() === 'pending') {
//         return item;
//       }
//       return null;
//     })
//     .filter(item => item !== null)
//     .slice(0, 3);
//
//   const recentWorkLoads = assignedSR
//     ?.map(item => {
//       if (item?.approvalStatus?.toLowerCase() !== 'pending') {
//         return item;
//       }
//       return null;
//     })
//     .filter(item => item !== null)
//     .slice(0, 2);
//
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await getAsync();
//     setRefreshing(false);
//   };
//   const getAsync = async () => {
//     const tokenString = await LocalStorage.read('@jwt_token');
//     const token = JSON.parse(tokenString);
//     FetchAPI.getAssignedSRs(token)
//       .then(res => {
//         if (res) {
//           setAssignedSR(res?.data?.assignedServiceRequests);
//         }
//       })
//       .catch(err => {
//         console.error('Error fetching user prefile:', err);
//       });
//   };
//
//   useLayoutEffect(() => {
//     getAsync();
//     // eslint-disable-next-line
//   }, []);
//
//   const StatCard = ({item}: {item: any}) => (
//     <View style={styles.statCard}>
//       <View style={styles.statTopRow}>
//         <Text style={styles.statCount}>{item?.count}</Text>
//         <View style={[styles.statIconTile, {backgroundColor: `${item?.color}22`}]}>
//           <Icon
//             family="MaterialCommunityIcons"
//             name={item?.icon}
//             size={21}
//             color={item?.color}
//           />
//         </View>
//       </View>
//       <Text style={styles.statTitle}>{item?.title}</Text>
//     </View>
//   );
//
//   const WorkOrderCard = ({item, index}: {item: any; index: number}) => {
//     // const tagColors: { [key: string]: string } = {
//     //   BM: '#F44336',
//     //   CM: '#7E57C2',
//     //   PM: '#29B6F6',
//     //   EM: '#FFA726',
//     // };
//
//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('WorkOrderDetailScreen', {item: item})
//         }
//         style={styles.workOrderCard}>
//         <View
//           style={[
//             styles.tag,
//               {
//                 backgroundColor:
//                   index % 2 === 0 ? Colors.SECONDARY[100] : Colors.ACCENT,
//               },
//           ]}>
//           <Text style={styles.tagText}>
//             {item?.serviceRequest?.problemDescription?.slice(0, 2)}
//           </Text>
//         </View>
//         <View>
//           <Text
//             numberOfLines={2}
//             ellipsizeMode="tail"
//             style={styles.workOrderTitle}>
//             {item?.serviceRequest?.problemDescription}
//           </Text>
//           <Text
//             numberOfLines={2}
//             ellipsizeMode="tail"
//             style={styles.workOrderZone}>
//             {item?.serviceRequest?.address?.addressLine}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//
//   const RecentCard = ({item}: {item: any}) => {
//     const statusColors: {[key: string]: string} = {
//       'IN PROGRESS': Colors.SECONDARY[100],
//       'ON HOLD': Colors.STATUS.WARNING,
//       completed: Colors.STATUS.SUCCESS,
//       CRITICAL: Colors.STATUS.DANGER,
//     };
//
//     const statusBackgroundColors: {[key: string]: string} = {
//       'IN PROGRESS': Colors.PRIMARY[600],
//       'ON HOLD': Colors.STATUS.WARNING_SOFT,
//       completed: Colors.STATUS.SUCCESS_SOFT,
//       CRITICAL: Colors.STATUS.DANGER_SOFT,
//     };
//
//     const statusColor =
//       statusColors[item?.workCompletionStatus?.toUpperCase()] ||
//       Colors.STATUS.SUCCESS;
//     const statusbgColour =
//       statusBackgroundColors[item?.workCompletionStatus?.toUpperCase()] ||
//       Colors.PRIMARY[600];
//
//     return (
//       <View style={styles.recentCard}>
//         <View style={styles.recentHeader}>
//           <View
//             style={{
//               backgroundColor: statusbgColour,
//               justifyContent: 'center',
//               borderRadius: 7,
//               paddingHorizontal: 10,
//             }}>
//             <TextView style={[styles.recentStatus, {color: statusColor}]}>
//               {item?.workCompletionStatus?.toLowerCase() === 'completed'
//                 ? item?.workCompletionStatus
//                 : item?.approvalStatus}
//             </TextView>
//           </View>
//
//           <View style={[styles.tag, {backgroundColor: Colors.ACCENT}]}>
//             <TextView style={styles.tagText}>
//               {item?.serviceRequest?.problemDescription?.slice(0, 2)}
//             </TextView>
//           </View>
//         </View>
//
//         <Text
//           numberOfLines={5}
//           ellipsizeMode="tail"
//           style={styles.recentsTitle}>
//           {item?.serviceRequest?.problemDescription}
//         </Text>
//         <View
//           style={{
//             height: 1,
//             width: '100%',
//             backgroundColor: Colors.BORDERCOLOR,
//           }}
//         />
//         <TextView style={styles.workOrderZone}>
//           {item?.serviceRequest?.address?.addressName}
//         </TextView>
//       </View>
//     );
//   };
//
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={'dark-content'} />
//       <ScrollView
//         style={{flex: 1}}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingBottom: hp(2)}}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         <View style={{width: wp(90), alignSelf: 'center'}}>
//           {/* Header */}
//           <View style={styles.header}>
//             <View style={styles.headerIconTile}>
//               <Icon
//                 family="MaterialCommunityIcons"
//                 name="view-dashboard-outline"
//                 size={21}
//                 color={Colors.PRIMARY[100]}
//               />
//             </View>
//             <View style={styles.profile}>
//               <Image
//                 source={{uri: 'https://via.placeholder.com/40'}}
//                 style={styles.avatar}
//               />
//             </View>
//           </View>
//
//           {/* Greetings */}
//           <TextView style={styles.greeting}>
//             Hi, {userData?.user?.userName?.split(' ')[0]}
//           </TextView>
//           <TextView style={styles.subGreeting}>
//             {todayAssignedCount} new work orders for you today
//           </TextView>
//
//           {/* Progress Summary */}
//           <View style={styles.progressCard}>
//             <CircularProgress percentage={completionPercentage} />
//
//             <View>
//               <TextView style={styles.progressText}>
//                 Today's Progress Summary
//               </TextView>
//               <TextView style={styles.progressDetails}>
//                 {completedAssignedCount}/{todayAssignedCount} workorders done
//               </TextView>
//             </View>
//           </View>
//
//           {/* Stat Cards */}
//           <FlatList
//             data={statData}
//             keyExtractor={item => item.id}
//             renderItem={({item}) => <StatCard item={item} />}
//             scrollEnabled={false}
//             numColumns={2}
//             columnWrapperStyle={{justifyContent: 'space-between'}}
//             contentContainerStyle={styles.statsContainer}
//           />
//
//           {/* New Worklist */}
//           <TextView style={styles.sectionTitle}>New Worklist</TextView>
//           {pendingWorkLoads?.length <= 0 && (
//             <Text style={styles.noWorkordersCon}>
//               <TextView style={styles.noWorkorders}>
//                 No workloads assigned for you now
//               </TextView>
//             </Text>
//           )}
//           <FlatList
//             data={pendingWorkLoads}
//             keyExtractor={item => item.id}
//             renderItem={({item, index}) => (
//               <WorkOrderCard item={item} index={index} />
//             )}
//             scrollEnabled={false}
//           />
//
//           {/* Recent Workorders */}
//           <TextView style={[styles.sectionTitle]}>Recents</TextView>
//           <FlatList
//             data={recentWorkLoads}
//             keyExtractor={item => item.id}
//             renderItem={({item}) => <RecentCard item={item} />}
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
//
// export default HomeScreen;



























import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    title: 'In Progress',
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

  const {assignedSR, setAssignedSR} =
    useContext<AssignedSR>(AssignedSRContext);

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

  /* ========================= GREETING ========================= */

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    }

    if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    }

    if (hour >= 17 && hour < 21) {
      return 'Good Evening';
    }

    return 'Good Night';
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await getAsync();

    setRefreshing(false);
  };

  const getAsync = async () => {
    try {
      const tokenString = await LocalStorage.read('@jwt_token');

      if (!tokenString) {
        return;
      }

      const token = JSON.parse(tokenString);

      FetchAPI.getAssignedSRs(token)
        .then(res => {
          if (res) {
            setAssignedSR(res?.data?.assignedServiceRequests);
          }
        })
        .catch(err => {
          console.error(
            'Error fetching assigned service requests:',
            err,
          );
        });
    } catch (error) {
      console.error('Error reading token:', error);
    }
  };

  useLayoutEffect(() => {
    getAsync();

    // eslint-disable-next-line
  }, []);

  /* ========================= STAT CARD ========================= */

  const StatCard = ({item}: {item: any}) => (
    <View style={styles.statCard}>
      <View style={styles.statTopRow}>
        <View style={styles.statInfo}>
          <Text style={styles.statCount}>{item?.count}</Text>

          <Text style={styles.statTitle}>{item?.title}</Text>
        </View>

        <View
          style={[
            styles.statIconTile,
            {
              backgroundColor: `${item?.color}18`,
            },
          ]}>
          <Icon
            family="MaterialCommunityIcons"
            name={item?.icon}
            size={21}
            color={item?.color}
          />
        </View>
      </View>
    </View>
  );

  /* ======================= WORK ORDER CARD ======================= */

  const WorkOrderCard = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('WorkOrderDetailScreen', {
          item: item,
        })
      }
      style={styles.workOrderCard}>
      <View
        style={[
          styles.tag,
          {
            backgroundColor:
              index % 2 === 0
                ? Colors.SECONDARY[100]
                : Colors.ACCENT,
          },
        ]}>
        <Text style={styles.tagText}>
          {item?.serviceRequest?.problemDescription?.slice(0, 2)}
        </Text>
      </View>

      <View style={styles.workOrderContent}>
        <View style={styles.workOrderHeader}>
          <Text style={styles.workOrderLabel}>
            SERVICE REQUEST
          </Text>

          <Icon
            family="MaterialCommunityIcons"
            name="chevron-right"
            size={20}
            color={Colors.LIGHT_GREY}
          />
        </View>

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.workOrderTitle}>
          {item?.serviceRequest?.problemDescription}
        </Text>

        <View style={styles.locationRow}>
          <Icon
            family="MaterialCommunityIcons"
            name="map-marker-outline"
            size={15}
            color={Colors.BODY}
          />

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.workOrderZone}>
            {item?.serviceRequest?.address?.addressLine}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  /* ========================= RECENT CARD ========================= */

  const RecentCard = ({item}: {item: any}) => {
    const statusColors: {[key: string]: string} = {
      'IN PROGRESS': Colors.SECONDARY[100],
      'ON HOLD': Colors.STATUS.WARNING,
      COMPLETED: Colors.STATUS.SUCCESS,
      CRITICAL: Colors.STATUS.DANGER,
    };

    const statusBackgroundColors: {[key: string]: string} = {
      'IN PROGRESS': Colors.PRIMARY[600],
      'ON HOLD': Colors.STATUS.WARNING_SOFT,
      COMPLETED: Colors.STATUS.SUCCESS_SOFT,
      CRITICAL: Colors.STATUS.DANGER_SOFT,
    };

    const statusKey =
      item?.workCompletionStatus?.toUpperCase();

    const statusColor =
      statusColors[statusKey] || Colors.STATUS.SUCCESS;

    const statusbgColour =
      statusBackgroundColors[statusKey] ||
      Colors.PRIMARY[600];

    return (
      <View style={styles.recentCard}>
        <View style={styles.recentHeader}>
          <View
            style={[
              styles.recentStatusContainer,
              {
                backgroundColor: statusbgColour,
              },
            ]}>
            <TextView
              style={[
                styles.recentStatus,
                {
                  color: statusColor,
                },
              ]}>
              {item?.workCompletionStatus?.toLowerCase() ===
              'completed'
                ? item?.workCompletionStatus
                : item?.approvalStatus}
            </TextView>
          </View>

          <View
            style={[
              styles.recentTag,
              {
                backgroundColor: Colors.ACCENT,
              },
            ]}>
            <TextView style={styles.tagText}>
              {item?.serviceRequest?.problemDescription?.slice(
                0,
                2,
              )}
            </TextView>
          </View>
        </View>

        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.recentsTitle}>
          {item?.serviceRequest?.problemDescription}
        </Text>

        <View style={styles.recentDivider} />

        <View style={styles.locationRow}>
          <Icon
            family="MaterialCommunityIcons"
            name="map-marker-outline"
            size={15}
            color={Colors.BODY}
          />

          <TextView style={styles.workOrderZone}>
            {item?.serviceRequest?.address?.addressName}
          </TextView>
        </View>
      </View>
    );
  };

  /* ============================== UI ============================== */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.PRIMARY[100]}
          />
        }>
        <View style={styles.mainContent}>
          {/* ======================== HEADER ======================== */}

          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIconTile}>
                <Icon
                  family="MaterialCommunityIcons"
                  name="view-dashboard-outline"
                  size={21}
                  color={Colors.PRIMARY[100]}
                />
              </View>

              <View>
                <Text style={styles.headerLabel}>
                  TECHNICIAN
                </Text>

                <Text style={styles.headerStatus}>
                  <Text style={styles.onlineDot}>● </Text>
                  Online
                </Text>
              </View>
            </View>

            <View style={styles.profile}>
              <Icon
                family="MaterialCommunityIcons"
                name="account-outline"
                size={24}
                color={Colors.PRIMARY[100]}
              />
            </View>
          </View>

          {/* ======================== GREETING ======================== */}

          <View style={styles.greetingContainer}>
            <TextView style={styles.greeting}>
              {getGreeting()}, Admin 👋
            </TextView>

            <TextView style={styles.subGreeting}>
              {todayAssignedCount > 0
                ? `${todayAssignedCount} service requests assigned today`
                : 'You are all caught up for today'}
            </TextView>
          </View>

          {/* ==================== TODAY'S PROGRESS ==================== */}

          <View style={styles.progressCard}>
            <View style={styles.progressCircleContainer}>
              <CircularProgress
                percentage={completionPercentage}
              />
            </View>

            <View style={styles.progressInfo}>
              <TextView style={styles.progressEyebrow}>
                TODAY'S PROGRESS
              </TextView>

              <TextView style={styles.progressText}>
                {completedAssignedCount}/{todayAssignedCount}
              </TextView>

              <TextView style={styles.progressDetails}>
                Service Requests Completed
              </TextView>

              <View style={styles.progressMiniRow}>
                <Icon
                  family="MaterialCommunityIcons"
                  name="calendar-check-outline"
                  size={15}
                  color={Colors.WHITE}
                />

                <TextView style={styles.progressMiniText}>
                  {todayAssignedCount} Assigned Today
                </TextView>
              </View>
            </View>
          </View>

          {/* ================= NEXT SERVICE REQUEST ================= */}

          <View style={styles.sectionHeader}>
            <TextView style={styles.sectionTitle}>
              Next Service Request
            </TextView>

            <TextView style={styles.sectionAction}>
              View All
            </TextView>
          </View>

          {pendingWorkLoads?.length > 0 ? (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.nextRequestCard}
              onPress={() =>
                navigation.navigate(
                  'WorkOrderDetailScreen',
                  {
                    item: pendingWorkLoads[0],
                  },
                )
              }>
              <View style={styles.nextRequestIcon}>
                <Icon
                  family="MaterialCommunityIcons"
                  name="tools"
                  size={23}
                  color={Colors.PRIMARY[100]}
                />
              </View>

              <View style={styles.nextRequestContent}>
                <Text style={styles.nextRequestLabel}>
                  NEW REQUEST
                </Text>

                <Text
                  numberOfLines={1}
                  style={styles.nextRequestTitle}>
                  {
                    pendingWorkLoads[0]?.serviceRequest
                      ?.problemDescription
                  }
                </Text>

                <View style={styles.locationRow}>
                  <Icon
                    family="MaterialCommunityIcons"
                    name="map-marker-outline"
                    size={15}
                    color={Colors.BODY}
                  />

                  <Text
                    numberOfLines={1}
                    style={styles.nextRequestLocation}>
                    {
                      pendingWorkLoads[0]?.serviceRequest
                        ?.address?.addressLine
                    }
                  </Text>
                </View>
              </View>

              <Icon
                family="MaterialCommunityIcons"
                name="chevron-right"
                size={22}
                color={Colors.LIGHT_GREY}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyRequestCard}>
              <View style={styles.emptyIcon}>
                <Icon
                  family="MaterialCommunityIcons"
                  name="check-circle-outline"
                  size={26}
                  color={Colors.PRIMARY[100]}
                />
              </View>

              <Text style={styles.emptyTitle}>
                You're all caught up
              </Text>

              <Text style={styles.emptyDescription}>
                No service requests are waiting for your
                attention right now.
              </Text>
            </View>
          )}

          {/* ======================== WORK SUMMARY ======================== */}

          <View style={styles.sectionHeader}>
            <TextView style={styles.sectionTitle}>
              Work Summary
            </TextView>
          </View>

          <FlatList
            data={statData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <StatCard item={item} />
            )}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={styles.statRow}
            contentContainerStyle={styles.statsContainer}
          />

          {/* ======================== NEW WORKLIST ======================== */}

          <View style={styles.sectionHeader}>
            <TextView style={styles.sectionTitle}>
              New Worklist
            </TextView>

            <TextView style={styles.sectionAction}>
              View All
            </TextView>
          </View>

          {pendingWorkLoads?.length <= 0 && (
            <View style={styles.noWorkordersCon}>
              <View style={styles.noWorkordersIcon}>
                <Icon
                  family="MaterialCommunityIcons"
                  name="clipboard-check-outline"
                  size={24}
                  color={Colors.PRIMARY[100]}
                />
              </View>

              <TextView style={styles.noWorkordersTitle}>
                No new worklist
              </TextView>

              <TextView style={styles.noWorkorders}>
                You're all caught up. New service requests
                will appear here.
              </TextView>
            </View>
          )}

          <FlatList
            data={pendingWorkLoads}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <WorkOrderCard
                item={item}
                index={index}
              />
            )}
            scrollEnabled={false}
          />

          {/* ================= RECENT SERVICE REQUESTS ================= */}

          <View style={styles.sectionHeader}>
            <TextView style={styles.sectionTitle}>
              Recent Service Requests
            </TextView>

            <TextView style={styles.sectionAction}>
              View All
            </TextView>
          </View>

          <FlatList
            data={recentWorkLoads}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <RecentCard item={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;