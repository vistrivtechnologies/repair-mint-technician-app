import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts, Icon} from '../../../../constant';
import {moderateScale} from 'react-native-size-matters';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API} from '../../../../api/processApis';
import {API as FetchAPI} from '../../../../api/fetchApis';
import {LocalStorage} from '../../../../helpers/localstorage';
import {usePopup} from '../../../../context/popupContext';
import Loader from '../../../../components/Loader/Loader';
import {useNavigation} from '@react-navigation/native';

interface PartItem {
  id: string;
  partName: string;
  qty: string;
  price: string;
}

const Quotation = ({
  item,
  setAssignedSRbyId,
  quotationData,
  inventoryItems,
}: {
  item?: any;
  setAssignedSRbyId: (e: any) => void;
  quotationData: any;
  inventoryItems?: any;
}) => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parts, setParts] = useState<PartItem[]>([]);
  const [newPart, setNewPart] = useState({
    partName: '',
    qty: '1',
    price: '',
  });
  const [serviceFee, setServiceFee] = useState<string>('0');
  const {callError} = usePopup();

  useEffect(() => {
    const hasData = Array.isArray(inventoryItems) && inventoryItems.length > 0;
    const hasFoundParts =
      Array.isArray(item?.foundInventoryParts) &&
      item.foundInventoryParts.length > 0;

    if (hasData || quotationData || hasFoundParts) {
      console.log('quotationData: ', item?.foundInventoryParts);

      const sourceParts = hasData
        ? inventoryItems
        : item?.foundInventoryParts || [];

      const formattedParts = sourceParts.map((part: any) => ({
        id: part?._id?.toString() || Date.now().toString(),
        inventoryItemId: part?._id,
        partName: part?.productName,
        qty: part?.qty?.toString() || '1',
        price: part?.price?.toString() || '0',
      }));

      setParts(formattedParts);

      if (quotationData?.serviceFee) {
        setServiceFee(quotationData.serviceFee.toString());
      }
    }
  }, [quotationData, inventoryItems, item?.foundInventoryParts]);

  const fetchData = async () => {
    try {
      const tokenString = await LocalStorage.read('@jwt_token');
      const token = JSON.parse(tokenString);
      const payload = {
        serviceRequestApprovalId: item?._id,
      };
      const res = await FetchAPI.getOneSR(token, payload);
      if (res) {
        setAssignedSRbyId(res?.data?.serviceRequestAssigned);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
    }
  };

  const addPart = () => {
    if (newPart.partName && newPart.price) {
      setParts([...parts, {id: Date.now().toString(), ...newPart}]);
      setNewPart({partName: '', qty: '1', price: ''});
    }
  };

  const removePart = (id: string) => {
    setParts(parts.filter(part => part.id !== id));
  };

  const calculateSubtotal = () => {
    return parts.reduce((total, part) => {
      const qty = parseFloat(part.qty) || 0;
      const price = parseFloat(part.price) || 0;
      return total + qty * price;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const fee = parseFloat(serviceFee) || 0;
    return subtotal + fee;
  };

  const handleGenerateQuotaion = async () => {
    setIsLoading(true);
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    const payload = {
      serviceRequestId: item?.serviceRequest?._id,
      serviceFee,
      inventoryParts: parts,
    };
    API.createQuotation(token, payload)
      .then(res => {
        if (res) {
          setIsLoading(false);
          callError({
            message: res?.message,
            isSuccess: true,
            isDelayModal: true,
          });
          fetchData();
        }
      })
      .catch(err => {
        setIsLoading(false);
        callError({
          message: err?.error?.message,
          isDelayModal: true,
        });
      });
  };

  // Render quotation details view
  const renderQuotationDetails = () => {
    return (
      <View>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Quotation Details</Text>
        </View> */}
        <View style={styles.headingContainer}>
          <Icon family="Ionicons" name="document-text" />
          <Text style={styles?.heading}>Quotation Details</Text>
        </View>

        {/* Parts List Section */}
        {parts.length > 0 && (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Parts List</Text>
            <Text style={styles.partCount}>{parts.length} items</Text>
          </View>
        )}

        {parts.map((part, index) => (
          <View key={part.id} style={styles.partItem}>
            <View style={styles.partInfo}>
              <Text style={styles.partName}>{part.partName}</Text>
              <Text style={styles.partDetails}>
                {part.qty} × ${parseFloat(part.price).toFixed(2)} = $
                {(parseFloat(part.qty) * parseFloat(part.price)).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        {/* Service Fee and Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              ${calculateSubtotal().toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Service Fee:</Text>
            <Text style={styles.totalValue}>
              ${parseFloat(serviceFee).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={[styles.totalLabel, styles.grandTotalLabel]}>
              Total:
            </Text>
            <Text style={[styles.totalValue, styles.grandTotalValue]}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Render quotation creation form
  const renderQuotationForm = () => {
    return (
      <View>
        <View style={styles.headingContainer}>
          <Icon family="Ionicons" name="document-text" />
          <Text style={styles?.heading}>Create Quotation</Text>
        </View>

        {/* Add New Part Section */}
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Add Part</Text>
        </View>

        <View style={styles.addPartContainer}>
          <TextInput
            style={[styles.input, styles.partInput]}
            value={newPart.partName}
            onChangeText={text => setNewPart({...newPart, partName: text})}
            placeholder="Part name"
          />

          <View style={styles.quantityPriceRow}>
            <View style={styles.smallInputContainer}>
              <Text style={styles.smallLabel}>Qty</Text>
              <TextInput
                style={[styles.input, styles.smallInput]}
                value={newPart.qty}
                onChangeText={text => setNewPart({...newPart, qty: text})}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.smallInputContainer}>
              <Text style={styles.smallLabel}>Price</Text>
              <TextInput
                style={[styles.input, styles.smallInput]}
                value={newPart.price}
                onChangeText={text =>
                  setNewPart({
                    ...newPart,
                    price: text.replace(/[^0-9.]/g, ''),
                  })
                }
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>

            <TouchableOpacity
              onPress={addPart}
              style={styles.addPartButton}
              disabled={!newPart.partName || !newPart.price}>
              <MaterialIcons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View> */}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate('InventryScreen', {
              item,
            });
          }}>
          <Icon family="MaterialIcons" name="inventory" color={Colors.WHITE} />
          <Text style={[styles.submitButtonText, {marginLeft: wp(3)}]}>
            Select Inventory
          </Text>
        </TouchableOpacity>

        {/* Parts List Section */}
        {parts.length > 0 && (
          <View style={[styles.sectionHeader, {marginTop: hp(1.5)}]}>
            <Text style={styles.sectionTitle}>Parts List</Text>
            <Text style={styles.partCount}>{parts.length} item(s)</Text>
          </View>
        )}

        {parts.map((part, index) => (
          <View key={part.id} style={styles.partItem}>
            <View style={styles.partInfo}>
              <Text style={styles.partName}>{part.partName}</Text>
              <Text style={styles.partDetails}>
                {part.qty} × ${parseFloat(part.price).toFixed(2)} = $
                {(parseFloat(part.qty) * parseFloat(part.price)).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => removePart(part.id)}
              style={styles.deleteButton}>
              <MaterialIcons name="delete" size={20} color={'red'} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Service Fee and Totals */}
        <View style={styles.formGroup}>
          <Text style={[styles.sectionTitle, {marginTop: hp(2)}]}>
            Service Fee
          </Text>
          <TextInput
            style={[styles.input, {marginTop: hp(1.5)}]}
            value={serviceFee}
            onChangeText={text => setServiceFee(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            placeholder="0.00"
          />
        </View>

        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              ${calculateSubtotal().toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Service Fee:</Text>
            <Text style={styles.totalValue}>
              ${parseFloat(serviceFee).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={[styles.totalLabel, styles.grandTotalLabel]}>
              Total:
            </Text>
            <Text style={[styles.totalValue, styles.grandTotalValue]}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              opacity:
                parts?.length === 0 || serviceFee === '0' || !serviceFee
                  ? 0.5
                  : 1,
            },
          ]}
          onPress={() => handleGenerateQuotaion()}
          disabled={parts?.length === 0 || serviceFee === '0' || !serviceFee}>
          <Text style={styles.submitButtonText}>Generate Quotation</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {quotationData ? renderQuotationDetails() : renderQuotationForm()}
      </ScrollView>
      <Loader visible={isLoading} />
    </KeyboardAvoidingView>
  );
};

// ... (keep your existing styles)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    // padding: wp(5),
    paddingBottom: hp(5),
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  heading: {
    color: Colors.BLACK,
    fontFamily: Fonts.Medium,
    marginLeft: wp(0.5),
    fontSize: moderateScale(15),
  },
  header: {
    marginBottom: hp(2),
  },
  title: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  sectionTitle: {
    fontSize: moderateScale(13.5),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  partCount: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
  },
  addPartContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(8),
    padding: wp(4),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },
  input: {
    backgroundColor: Colors.WHITE,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    fontSize: moderateScale(14),
    fontFamily: Fonts.Regular,
  },
  partInput: {
    marginBottom: hp(1),
  },
  quantityPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp(2),
  },
  smallInputContainer: {
    flex: 1,
  },
  smallLabel: {
    color: Colors.GREY,
    marginBottom: hp(0.5),
    fontSize: moderateScale(12),
    fontFamily: Fonts.Medium,
  },
  smallInput: {
    padding: moderateScale(8),
    fontSize: moderateScale(14),
  },
  addPartButton: {
    backgroundColor: Colors.PRIMARY[100],
    width: wp(10),
    height: wp(10),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    opacity: 1,
  },
  partItem: {
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(8),
    padding: wp(4),
    marginBottom: hp(1),
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partInfo: {
    flex: 1,
  },
  partName: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
    marginBottom: hp(0.5),
  },
  partDetails: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Regular,
    color: Colors.GREY,
  },
  deleteButton: {
    padding: moderateScale(8),
  },
  formGroup: {
    marginBottom: hp(2),
  },
  totalsContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(8),
    padding: wp(4),
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  grandTotal: {
    marginTop: hp(1),
    paddingTop: hp(1),
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GREY,
  },
  totalLabel: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
  },
  totalValue: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Bold,
    color: Colors.BLACK,
  },
  grandTotalLabel: {
    fontSize: moderateScale(16),
  },
  grandTotalValue: {
    fontSize: moderateScale(16),
    color: Colors.PRIMARY[100],
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY[100],
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    marginTop: hp(3),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontSize: moderateScale(16),
    fontFamily: Fonts.Medium,
  },
});

export default Quotation;
