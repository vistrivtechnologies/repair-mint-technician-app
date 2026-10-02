import {Platform, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderWidth: 1,
    backgroundColor: Colors.LIGHT_GREY_3,
    borderColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: moderateScale(14),
  },
  weeklyHours: {
    color: Colors.HEADING,
    fontSize: moderateScale(18),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(10),
    fontFamily: Fonts.SemiBold,
  },
  list: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  item: {
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    fontFamily: Fonts.SemiBold,
  },
  itemSelected: {
    backgroundColor: Colors.PRIMARY[100],
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  textSelected: {
    color: '#fff',
  },
  addSlotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(14),
    height: 200,
  },
  selectTime: {
    width: 340,
    textAlign: 'center',
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(20),
  },
  addTimeSlots: {
    color: Colors.PRIMARY[100],
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(15),
    backgroundColor: Colors.PRIMARY[600],
    borderColor: Colors.PRIMARY[100],
    borderWidth: 0.8,
    padding: moderateScale(10),
    borderRadius: moderateScale(6),
  },
  chosen: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    maxHeight: '70%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  slotItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  slotTextSelected: {
    color: '#fff',
  },
  closeBtn: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 10,
  },
  closeText: {
    fontSize: 16,
    color: Colors.SECONDARY[100],
  },
  buttonFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelText: {
    marginTop: hp('1%'),
    fontSize: 16,
    color: Colors.SECONDARY[100],
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY[600],
    paddingVertical: moderateScale(12),
    borderRadius: 10,
    width: 160,
  },
  updateText: {
    marginTop: hp('1%'),
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY[100],
    paddingVertical: moderateScale(12),
    borderRadius: 10,
    width: 160,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: wp('5%'),
    maxHeight: hp('80%'),
    ...Platform.select({
      android: { elevation: 5 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: hp('0.5%'),
    color: Colors.HEADING,
    fontFamily: Fonts.SemiBold,
  },
  chooseSlot: {
    marginBottom: hp('2%'),
    fontFamily: Fonts.Medium,
    fontSize: 13,
    lineHeight: 18,
  },

  slotList: {
    paddingBottom: hp('2%'),
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  slot: {
    width: '48%',                
    paddingVertical: hp('1.5%'),
    marginVertical:hp('0.6%'),
    marginHorizontal:hp('0.4%'),
    borderRadius: wp('8%'),
    alignItems: 'center',
  },
  slotAvailable: {
    backgroundColor: Colors.PRIMARY[100],  // blue for available
  },
  slotDisabled: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },
  slotSelected: {
    backgroundColor: Colors.PRIMARY[100],  // same blue for selected
    borderColor: Colors.PRIMARY[100],
  },

  slotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  textAvailable: {
    color: '#FFF',
  },
  textDisabled: {
    color: Colors.GREY,
  },
//   textSelected: {
//     color: '#FFF',
//   },
 
});

export default styles;
