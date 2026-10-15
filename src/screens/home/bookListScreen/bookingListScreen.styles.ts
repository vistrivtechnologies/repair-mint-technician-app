import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, Colors } from '../../../constant';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#FAFCFB',
  },
  infoContainer: {
    width: wp( 90 ),
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: scale( 18 ),
    marginLeft: 10,
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING,
  },
  searchInput: {
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BORDERCOLOR,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  moreFiltersRow: {
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  moreFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  moreFiltersText: {
    color: Colors.PRIMARY[100],
    fontFamily: Fonts.SemiBold,
    fontSize: scale(11),
  },
  statusFilterRow: {
    gap: 8,
    paddingVertical: 4,
    marginBottom: 10,
  },
  statusFilter: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F3F6F5',
  },
  statusFilterActive: {
    backgroundColor: Colors.PRIMARY[100],
  },
  statusFilterText: {
    color: Colors.BODY,
    fontFamily: Fonts.Medium,
    fontSize: scale(11),
  },
  statusFilterTextActive: {
    color: Colors.WHITE,
    fontFamily: Fonts.SemiBold,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    minHeight: 64,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAF0EC',
  },
  toDoSummary: {
    backgroundColor: '#6B5BD2',
  },
  inProgressSummary: {
    backgroundColor: Colors.STATUS.WARNING,
  },
  completedSummary: {
    backgroundColor: Colors.SECONDARY[100],
  },
  summaryLabel: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: scale(10),
    marginBottom: 3,
  },
  summaryNumber: {
    color: Colors.WHITE,
    fontFamily: Fonts.Bold,
    fontSize: scale(18),
  },
  moreFiltersOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(17, 35, 45, 0.35)',
  },
  moreFiltersModal: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    paddingBottom: 30,
  },
  moreFiltersModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  moreFiltersTitle: {
    color: Colors.HEADING,
    fontFamily: Fonts.SemiBold,
    fontSize: scale(17),
  },
  criticalFilterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.STATUS.DANGER,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  criticalFilterText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: scale(13),
  },
  highFilterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.STATUS.WARNING,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 8,
  },
  highFilterText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: scale(13),
  },
  lowFilterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.SECONDARY[100],
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 8,
  },
  lowFilterText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    fontSize: scale(13),
  },
  countText: {
    marginBottom: 10,
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: Colors.STATUS.DANGER,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform:"uppercase",
  },
  startedText: {
    fontSize: 12,
    color: Colors.BODY,
  },
  title: {
    fontSize: scale( 13 ),
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING,
    marginVertical: 6,
  },
  infoBox: {
    backgroundColor: Colors.LIGHT_GREY_2,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    fontFamily: Fonts.Medium,
    color: Colors.HEADING,
    marginLeft: wp( 1 ),
    marginTop:wp(-0.5)

  },
  subInfo: {
    fontSize: 11,
    color: Colors.BODY,
    marginLeft: wp( 5 ),
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDERCOLOR,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDERCOLOR,

  },
  data: {
    paddingVertical: hp( 0.5 ),
  },
  verticalSeprator: {
    backgroundColor: Colors.BORDERCOLOR,
    height: "100%",
    width: 1

  },
  dataText: {
    fontSize: scale( 10 ),
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING
  },
  dataInstruction: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: Colors.BODY
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 70,
  },
  statusBadge: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
    textTransform: 'capitalize',
  },
  inProgress: {
    backgroundColor: Colors.STATUS.INFO_SOFT,
    color: Colors.STATUS.INFO,
  },
  onHold: {
    backgroundColor: Colors.STATUS.WARNING_SOFT,
    color: Colors.STATUS.WARNING,
  },
  timeSpent: {
    fontSize: 12,
    color: Colors.HEADING,
    fontFamily: Fonts.Medium,
    marginLeft: wp( 5 )
  },
  priorityCircle: {
    backgroundColor: Colors.STATUS.DANGER,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
} );

export default styles;
