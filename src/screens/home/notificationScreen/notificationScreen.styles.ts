import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, Colors } from '../../../constant';
import { moderateScale, scale } from 'react-native-size-matters';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#FAFCFB',
  },
  header: {
    backgroundColor: Colors.PRIMARY[ 100 ],
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: wp( 5 ),
    fontFamily: Fonts.SemiBold,

  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  markAllRead: {
    fontSize: 14,
    color: Colors.SECONDARY[100],
    fontWeight: '500',
  },
  notificationsList: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EFED',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.PRIMARY[100],
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  bookingIcon: {
    backgroundColor: Colors.PRIMARY[100],
  },
  paymentIcon: {
    backgroundColor: Colors.STATUS.WARNING,
  },
  reminderIcon: {
    backgroundColor: Colors.SECONDARY[100],
  },
  filterRow: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: '#E1EAE6',
  },
  filterChipActive: {
    backgroundColor: Colors.PRIMARY[100],
    borderColor: Colors.PRIMARY[100],
  },
  filterText: {
    color: Colors.HEADING,
    fontFamily: Fonts.Medium,
    fontSize: scale(11),
  },
  filterTextActive: {
    color: Colors.WHITE,
    fontFamily: Fonts.SemiBold,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: moderateScale( 14 ),
    color: Colors.HEADING,
    flex: 1,
    fontFamily: Fonts.Medium
  },
  timeAgo: {
    fontSize: moderateScale( 12 ),
    color: Colors.BODY,
    marginLeft: 8,
    fontFamily: Fonts.Medium
  },
  notificationBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  notificationDescription: {
    fontSize: moderateScale( 14 ),
    color: Colors.BODY,
    marginRight: 4,
    fontFamily: Fonts.Medium
  },
  customerName: {
    fontSize: moderateScale( 14 ),
    color: Colors.HEADING,
    fontFamily: Fonts.Medium
  },

} );

export default styles;
