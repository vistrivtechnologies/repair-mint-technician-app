import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, Colors} from '../../../constant';
import {moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY_2,
  },
  darkContainer: {
    backgroundColor: Colors.GREY,
  },
  mainContainer: {
    width: wp(90),
    alignSelf: 'center',
    flex: 1,
  },
  switchTabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHT_GREY_3,
    justifyContent: 'space-between',
    padding: moderateScale(4),
    borderRadius: moderateScale(10),
    marginVertical: hp(1.5),
  },
  tab: {
    flex: 1,
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  activeTab: {
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeTabDark: {
    backgroundColor: Colors.GREY,
  },
  tabText: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(14),
    color: Colors.GREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabText: {
    color: Colors.BLACK,
  },
  activeTabTextDark: {
    color: Colors.WHITE,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  darkSearchContainer: {
    backgroundColor: Colors.GREY,
  },
  searchIcon: {
    marginRight: moderateScale(8),
  },
  searchInput: {
    flex: 1,
    height: moderateScale(40),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
  },
  darkSearchInput: {
    color: Colors.WHITE,
  },
  clearSearch: {
    padding: moderateScale(4),
  },
  list: {
    gap: moderateScale(12),
    paddingBottom: hp(5),
  },
  card: {
    backgroundColor: Colors.WHITE,
    padding: moderateScale(13),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(8),
  },
  productCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  darkCard: {
    backgroundColor: Colors.GREY,
  },
  cardHeader: {
    alignItems: 'flex-start',
    marginBottom: moderateScale(8),
    width: wp(52),
  },
  productInfo: {
    flex: 1,
    marginRight: moderateScale(8),
  },
  name: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(16),
    color: Colors.BLACK,
    marginBottom: moderateScale(4),
  },
  darkText: {
    color: Colors.WHITE,
  },
  description: {
    fontFamily: Fonts.Regular,
    fontSize: moderateScale(13),
    color: Colors.GREY,
    marginTop: hp(0.1),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(20),
  },
  statusIcon: {
    marginRight: moderateScale(4),
  },
  statusText: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(12),
    color: Colors.WHITE,
  },
  image: {
    width: wp(25),
    height: wp(25),
    borderRadius: moderateScale(8),
    marginVertical: moderateScale(8),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  emptyText: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(16),
    color: Colors.LIGHT_GREY,
    marginTop: moderateScale(10),
  },
  resetSearchButton: {
    marginTop: moderateScale(15),
    padding: moderateScale(10),
  },
  resetSearchText: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(14),
    color: Colors.BLACK,
  },
  productRightSection: {
    flex: 1,
    paddingLeft: moderateScale(12),
    justifyContent: 'space-between',
    paddingVertical: moderateScale(4),
  },

  productInfoRow: {
    marginBottom: moderateScale(8),
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  addButton: {
    backgroundColor: Colors.PRIMARY[100],
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(6),
  },

  addButtonText: {
    fontSize: moderateScale(14),
    color: Colors.WHITE,
    fontFamily: Fonts.SemiBold,
  },
  // Add these to your existing stylesheet
  bottomSheetContainer: {
    padding: moderateScale(20),
  },
  carouselContainer: {
    height: moderateScale(200),
    marginBottom: moderateScale(20),
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
  },
  productInfoContainer: {
    marginBottom: moderateScale(20),
  },
  productTitle: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.SemiBold,
    color: Colors.BLACK,
    marginBottom: moderateScale(8),
  },
  productDescription: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
    marginBottom: moderateScale(12),
  },
  stockText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.PRIMARY[100],
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  quantityLabel: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    borderRadius: moderateScale(8),
  },
  quantityButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY_2,
  },
  quantityButtonText: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.SemiBold,
    color: Colors.BLACK,
  },
  quantityValue: {
    width: moderateScale(50),
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  addToCartButton: {
    backgroundColor: Colors.PRIMARY[100],
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: Colors.WHITE,
    fontSize: moderateScale(16),
    fontFamily: Fonts.SemiBold,
  },
  bottomSheetBackground: {
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(20),
  },
  darkBottomSheetBackground: {
    backgroundColor: Colors.GREY,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBackground: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: hp(80),
  },
  modalHandle: {
    width: moderateScale(40),
    height: moderateScale(5),
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  modalContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(30),
  },
  imageContainer: {
    height: moderateScale(200),
    marginBottom: moderateScale(20),
  },
  largeImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
  },
  priceBreakdownContainer: {
    marginBottom: moderateScale(20),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(4),
  },
  priceLabel: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
  },
  priceValue: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.LIGHT_GREY,
    marginVertical: moderateScale(8),
  },
  totalLabel: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.BLACK,
  },
  totalValue: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Bold,
    color: Colors.PRIMARY[100],
  },
});

export default styles;
