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
    backgroundColor: Colors.PRIMARY[300],
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
    marginTop: 20,
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
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BORDERCOLOR,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.PRIMARY[ 300 ],
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
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
