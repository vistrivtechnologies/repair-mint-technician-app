// import {StyleSheet} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {Fonts, Colors} from '../../../constant';
// import {scale} from 'react-native-size-matters';
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.PRIMARY[300],
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: hp(1),
//   },
//   profile: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   avatar: {
//     width: '100%',
//     height: '100%',
//   },
//   greeting: {
//     fontSize: scale(26),
//     fontFamily: Fonts.Bold,
//     color: Colors.HEADING,
//     marginTop: hp(0.5),
//   },
//   subGreeting: {
//     fontSize: scale(12),
//     color: Colors.BODY,
//     marginBottom: 18,
//     fontFamily: Fonts.Medium,
//   },
//   progressCard: {
//     backgroundColor: Colors.PRIMARY[100],
//     borderRadius: 18,
//     padding: hp(2),
//     marginBottom: hp(2),
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#102840',
//     shadowOpacity: 0.08,
//     shadowOffset: {width: 0, height: 4},
//     shadowRadius: 12,
//   },
//   progressCard1: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.WHITE,
//     padding: 16,
//     marginVertical: 10,
//     borderRadius: 16,
//     elevation: 2,
//     shadowColor: Colors.BLACK,
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 4,
//   },
//   progressText: {
//     color: Colors.WHITE,
//     fontFamily: Fonts.SemiBold,
//     fontSize: scale(14),
//   },
//
//   progressDetails: {
//     color: Colors.WHITE,
//     fontFamily: Fonts.Medium,
//     marginTop: 5,
//   },
//   statsContainer: {},
//   statCard: {
//     width: wp(42),
//     backgroundColor: Colors.WHITE,
//     borderRadius: 10,
//     padding: hp(2),
//     marginVertical: hp(1),
//     borderWidth: 1,
//     borderColor: Colors.BORDERCOLOR,
//     elevation: 1,
//   },
//   statTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   statIconTile: {
//     width: 40,
//     height: 40,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statCount: {
//     color: Colors.HEADING,
//     fontSize: scale(22),
//     fontFamily: Fonts.Bold,
//   },
//   statTitle: {
//     color: Colors.BODY,
//     fontSize: scale(12),
//     fontFamily: Fonts.Medium,
//     marginTop: 5,
//   },
//   sectionTitle: {
//     fontSize: scale(17),
//     fontFamily: Fonts.Bold,
//     color: Colors.HEADING,
//     margin: hp(1),
//   },
//   noWorkordersCon: {
//     fontSize: scale(14),
//     margin: hp(1),
//     textAlign: 'center',
//     borderWidth: 1,
//     borderColor: Colors.BORDERCOLOR,
//     borderRadius: 12,
//     padding: hp(3),
//   },
//   noWorkorders: {
//     fontSize: scale(14),
//     fontFamily: Fonts.SemiBold,
//     color: Colors.LIGHT_GREY,
//     margin: hp(1),
//     textAlign: 'center',
//     padding: hp(3),
//   },
//   workOrderCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.WHITE,
//     padding: hp(1.5),
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: Colors.BORDERCOLOR,
//     marginTop: hp(1),
//   },
//   headerIconTile: {
//     width: 42,
//     height: 42,
//     borderRadius: 13,
//     backgroundColor: Colors.PRIMARY[600],
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tag: {
//     width: 32,
//     height: 32,
//     borderRadius: 7,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//     backgroundColor: Colors.SECONDARY[100],
//   },
//   tagText: {
//     fontSize: 12,
//     color: Colors.WHITE,
//     fontFamily: Fonts.SemiBold,
//     textTransform: 'uppercase',
//   },
//   workOrderTitle: {
//     fontSize: scale(13),
//     color: Colors.HEADING,
//     fontFamily: Fonts.SemiBold,
//     marginBottom: hp(0.5),
//     paddingRight: wp(9),
//   },
//   recentsTitle: {
//     fontSize: scale(13),
//     color: Colors.HEADING,
//     fontFamily: Fonts.SemiBold,
//     marginBottom: hp(0.5),
//   },
//   workOrderZone: {
//     fontSize: scale(10),
//     color: Colors.BODY,
//     fontFamily: Fonts.Medium,
//     paddingRight: wp(9),
//   },
//   recentCard: {
//     backgroundColor: Colors.WHITE,
//     padding: wp(4),
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: Colors.BORDERCOLOR,
//     marginBottom: 10,
//     width: wp(42.6),
//     margin: wp(1.5),
//   },
//   recentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   recentStatus: {
//     fontFamily: Fonts.Medium,
//     fontSize: scale(9),
//     textTransform: 'capitalize',
//   },
// });
//
// export default styles;



































import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, Colors} from '../../../constant';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY[300],
  },

  scrollContent: {
    paddingBottom: hp(12),
  },

  mainContent: {
    width: wp(90),
    alignSelf: 'center',
  },

  /* ========================= HEADER ========================= */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(0.8),
    marginBottom: hp(1.2),
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerIconTile: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: Colors.PRIMARY[600],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  headerLabel: {
    fontSize: scale(9),
    fontFamily: Fonts.Bold,
    color: Colors.BODY,
    letterSpacing: 1,
  },

  headerStatus: {
    fontSize: scale(10),
    fontFamily: Fonts.Medium,
    color: Colors.BODY,
    marginTop: 2,
  },

  onlineDot: {
    color: Colors.STATUS.SUCCESS,
    fontSize: scale(9),
  },

  profile: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  /* ========================= GREETING ========================= */

  greetingContainer: {
    marginTop: hp(0.4),
    marginBottom: hp(1.8),
  },

  greeting: {
    fontSize: scale(23),
    fontFamily: Fonts.Bold,
    color: Colors.HEADING,
  },

  subGreeting: {
    fontSize: scale(12),
    color: Colors.BODY,
    marginTop: hp(0.45),
    fontFamily: Fonts.Medium,
  },

  /* ========================= PROGRESS ========================= */

  progressCard: {
    backgroundColor: Colors.PRIMARY[100],
    borderRadius: 20,
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4.5),
    marginBottom: hp(1.8),
    flexDirection: 'row',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#102840',
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 12,
  },

  progressCircleContainer: {
    marginRight: wp(4.5),
  },

  progressInfo: {
    flex: 1,
  },

  progressEyebrow: {
    color: Colors.WHITE,
    fontFamily: Fonts.SemiBold,
    fontSize: scale(9),
    letterSpacing: 1,
    opacity: 0.8,
  },

  progressText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Bold,
    fontSize: scale(25),
    marginTop: 1,
  },

  progressDetails: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: scale(10),
    marginTop: 1,
    opacity: 0.92,
  },

  progressMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.8),
  },

  progressMiniText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: scale(9),
    marginLeft: 5,
    opacity: 0.88,
  },

  /* ========================= SECTION ========================= */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(0.8),
    marginBottom: hp(0.9),
  },

  sectionTitle: {
    fontSize: scale(16),
    fontFamily: Fonts.Bold,
    color: Colors.HEADING,
  },

  sectionAction: {
    fontSize: scale(10),
    fontFamily: Fonts.SemiBold,
    color: Colors.PRIMARY[100],
  },

  /* ===================== NEXT REQUEST ===================== */

  nextRequestCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 17,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    marginBottom: hp(1.2),
  },

  nextRequestIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: Colors.PRIMARY[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },

  nextRequestContent: {
    flex: 1,
  },

  nextRequestLabel: {
    fontSize: scale(8),
    fontFamily: Fonts.Bold,
    color: Colors.PRIMARY[100],
    letterSpacing: 0.8,
    marginBottom: 3,
  },

  nextRequestTitle: {
    fontSize: scale(12),
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING,
    marginBottom: 4,
  },

  nextRequestLocation: {
    flex: 1,
    fontSize: scale(9),
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
  },

  /* ===================== EMPTY REQUEST ===================== */

  emptyRequestCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginBottom: hp(1.2),
  },

  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.PRIMARY[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(0.7),
  },

  emptyTitle: {
    fontSize: scale(13),
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING,
  },

  emptyDescription: {
    textAlign: 'center',
    fontSize: scale(9.5),
    lineHeight: scale(14),
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
    marginTop: 3,
  },

  /* ========================= STATS ========================= */

  statsContainer: {
    marginBottom: hp(0.5),
  },

  statRow: {
    justifyContent: 'space-between',
  },

  statCard: {
    width: wp(43.2),
    backgroundColor: Colors.WHITE,
    borderRadius: 17,
    padding: wp(4),
    marginBottom: hp(1.4),
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    minHeight: hp(9.5),
  },

  statTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statInfo: {
    flex: 1,
  },

  statIconTile: {
    width: 38,
    height: 38,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },

  statCount: {
    color: Colors.HEADING,
    fontSize: scale(22),
    fontFamily: Fonts.Bold,
  },

  statTitle: {
    color: Colors.BODY,
    fontSize: scale(10),
    fontFamily: Fonts.Medium,
    marginTop: 4,
    maxWidth: wp(25),
  },

  /* ====================== NEW WORKLIST ====================== */

  noWorkordersCon: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    borderRadius: 17,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginBottom: hp(1),
  },

  noWorkordersIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.PRIMARY[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },

  noWorkordersTitle: {
    fontSize: scale(13),
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING,
  },

  noWorkorders: {
    fontSize: scale(10),
    lineHeight: scale(15),
    fontFamily: Fonts.Medium,
    color: Colors.BODY,
    marginTop: 4,
    textAlign: 'center',
  },

  /* ====================== WORK ORDER ====================== */

  workOrderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: wp(3.5),
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    marginBottom: hp(1),
  },

  workOrderContent: {
    flex: 1,
  },

  workOrderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  workOrderLabel: {
    fontSize: scale(8),
    fontFamily: Fonts.Bold,
    color: Colors.PRIMARY[100],
    letterSpacing: 0.8,
  },

  tag: {
    width: 43,
    height: 43,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },

  tagText: {
    fontSize: scale(11),
    color: Colors.WHITE,
    fontFamily: Fonts.Bold,
    textTransform: 'uppercase',
  },

  workOrderTitle: {
    fontSize: scale(12),
    color: Colors.HEADING,
    fontFamily: Fonts.SemiBold,
    marginTop: 3,
    marginBottom: 4,
    paddingRight: wp(2),
  },

  workOrderZone: {
    flex: 1,
    fontSize: scale(9),
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  /* ========================= RECENTS ========================= */

  recentList: {
    paddingBottom: hp(1),
  },

  recentCard: {
    backgroundColor: Colors.WHITE,
    padding: wp(4),
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
    marginRight: wp(3),
    width: wp(68),
    minHeight: hp(15),
  },

  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },

  recentStatusContainer: {
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  recentStatus: {
    fontFamily: Fonts.Medium,
    fontSize: scale(8),
    textTransform: 'capitalize',
  },

  recentTag: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  recentsTitle: {
    fontSize: scale(12),
    color: Colors.HEADING,
    fontFamily: Fonts.SemiBold,
    marginBottom: hp(1),
  },

  recentDivider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.BORDERCOLOR,
    marginBottom: hp(1),
  },
});

export default styles;