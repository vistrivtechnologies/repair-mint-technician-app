import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Fonts, Colors} from '../../../constant';
import {moderateScale, scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY[300],
  },
  mainContainer: {
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(2),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobId: {
    fontSize: scale(12),
    color: Colors.HEADING,
    marginBottom: 6,
    fontFamily: Fonts.Medium,
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
  title: {
    fontSize: scale(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.HEADING,
    marginBottom: 12,
    marginTop: 4,
    lineHeight: 24,
  },
  subTitle: {
    fontSize: scale(14),
    fontFamily: Fonts.Medium,
    color: Colors.HEADING,
    marginBottom: 16,
    lineHeight: 24,
  },
 
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: scale(12),
    color: Colors.HEADING,
    fontFamily: Fonts.Medium,
  },
  card: {
    backgroundColor: '#fff',
    padding: hp(2),
    borderRadius: 10,
    marginBottom: 12,
  },
  subCard: {
    //  marginTop:hp(1),
    marginBottom: hp(1),
  },
  cardTitle: {
    fontFamily: Fonts.Medium,
    color: Colors.HEADING,
    marginBottom: hp(1.5),
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeading: {
    marginLeft: wp(1),
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(15),
  },
  location: {
    position: 'relative',
    top: 20,
  },
  seprator: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.BORDERCOLOR,
    marginBottom: hp(1),
    marginTop: hp(1),
  },
  cardText: {
    fontSize: scale(12),
    color: Colors.HEADING,
    fontFamily: Fonts.Medium,
    // marginLeft: wp( 1 )
  },
  assetCode: {
    fontSize: scale(12),
    color: Colors.HEADING,
    fontFamily: Fonts.Medium,
    marginTop: 2,
    // marginLeft: wp( 1 )
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: Colors.PRIMARY[100],
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(7),
    borderRadius: 7,
    justifyContent: 'center',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(7),
    borderRadius: 7,
    justifyContent: 'center',
  },
  onHoldButton: {
    backgroundColor: '#F4F4F4',
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(7),
    borderRadius: 7,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(11),
    fontFamily: Fonts.SemiBold,
    textAlign: 'center',
  },
  onHoldText: {
    color: Colors.HEADING,
    fontSize: scale(11),
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
});

export default styles;
