import React, {useContext, useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native';
import {HomeStackProps} from '../../../@types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserData, UserDataContext} from '../../../context/userDataContext';
import styles from './inventryScreen.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../components';
import {Colors} from '../../../constant';
import {API} from '../../../api/fetchApis';
import {LocalStorage} from '../../../helpers/localstorage';
import {useInventory} from '../../../context/inventoryContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {height} = Dimensions.get('window');

type InventryScreenNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  'InventryScreen'
>;

const getStatus = (qty: number) => {
  if (qty === 0)
    return {label: 'Out of Stock', color: Colors.STATUS.DANGER, icon: 'close-circle-outline'};
  if (qty <= 3)
    return {label: 'Low Stock', color: Colors.STATUS.WARNING, icon: 'alert-circle-outline'};
  return {label: 'In Stock', color: Colors.STATUS.SUCCESS, icon: 'check-circle-outline'};
};

const InventryScreen: React.FC = props => {
  const route = useRoute<any>();
  const item = route.params;
  console.log('item: ', item);

  const navigation = useNavigation<InventryScreenNavigationType>();
  const {isDarkMode} = useContext<UserData>(UserDataContext);
  const {setInventories, inventories} = useInventory();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const panY = useRef(new Animated.Value(height)).current;

  const filteredData = inventories.filter(item =>
    item.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const fetchData = async () => {
    try {
      const tokenString = await LocalStorage.read('@jwt_token');
      const token = JSON.parse(tokenString);
      const res = await API.getInventoryItems(token);
      if (res) {
        setInventories(res?.data?.inventories);
      }
    } catch (err: any) {
      console.log('Error: ', err);
    }
  };

  const handleAddPress = (item: any) => {
    setSelectedProduct(item);
    setQuantity(1);
    setModalVisible(true);
    Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(panY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 50 || gs.vy > 0.5) {
          handleCloseModal();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= selectedProduct?.availableInStock) {
      setQuantity(newQuantity);
    }
  };

  const renderItem = ({item}: {item: any}) => {
    const status = getStatus(item.availableInStock);

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={[
          styles.card,
          {
            shadowColor: status.color,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          },
        ]}>
        <View style={styles.productCardContainer}>
          {item?.attachments?.[0]?.imageUrl && (
            <Image
              source={{uri: item.attachments[0].imageUrl}}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <View style={styles.productRightSection}>
            <View style={styles.productInfoRow}>
              <Text style={styles.name} numberOfLines={2}>
                {item.productName}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.productDescription}
              </Text>
            </View>

            <View style={styles.bottomRow}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddPress(item)}>
                <Ionicons name="add-circle-outline" size={16} color={Colors.WHITE} />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>

              <View
                style={[styles.statusBadge, {backgroundColor: status.color}]}>
                <Ionicons
                  name={status.icon}
                  size={16}
                  color={Colors.WHITE}
                  style={styles.statusIcon}
                />
                <Text style={styles.statusText}>{status.label}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModalContent = () => {
    if (!selectedProduct) return null;

    // Calculate the subtotal
    const subtotal = (selectedProduct.price * quantity).toFixed(2);
    // Calculate tax (assuming 18% tax rate)
    const tax = (selectedProduct.price * quantity * 0.18).toFixed(2);
    // Calculate total
    const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

    return (
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{translateY: panY}],
          },
        ]}
        {...panResponder.panHandlers}>
        <View style={styles.modalHandle} />
        <ScrollView style={styles.modalContent}>
          {/* Simple Image View (replacing Carousel) */}
          {selectedProduct?.attachments?.[0]?.imageUrl && (
            <View style={styles.imageContainer}>
              <Image
                source={{uri: selectedProduct.attachments[0].imageUrl}}
                style={styles.largeImage}
                resizeMode="contain"
              />
            </View>
          )}

          {/* Product Info */}
          <View style={styles.productInfoContainer}>
            <Text style={styles.productTitle}>
              {selectedProduct.productName}
            </Text>
            <Text style={styles.productDescription}>
              {selectedProduct.productDescription}
            </Text>
            <Text style={styles.stockText}>
              Available: {selectedProduct.availableInStock}
            </Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceBreakdownContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Unit Price:</Text>
              <Text style={styles.priceValue}>₹{selectedProduct.price}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Quantity:</Text>
              <Text style={styles.priceValue}>{quantity}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal:</Text>
              <Text style={styles.priceValue}>₹{subtotal}</Text>
            </View>
            {/* <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Tax:</Text>
              <Text style={styles.priceValue}>₹{tax}</Text>
            </View> */}
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>₹{subtotal}</Text>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('WorkOrderDetailScreen', {
                item: item?.item,
                inventoryItems: [{...selectedProduct, qty: quantity}],
              });
            }}>
            <Text style={styles.addToCartButtonText}>Add Items</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    );
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Header title="Inventory Management" showBackButton={true} />

      <View style={styles.mainContainer}>
        <View style={styles.switchTabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 0 && styles.activeTab,
              activeTab === 0 && isDarkMode && styles.activeTabDark,
            ]}
            onPress={() => setActiveTab(0)}>
            <View
              style={[
                styles.tabText,
                activeTab === 0 && styles.activeTabText,
                activeTab === 0 && isDarkMode && styles.activeTabTextDark,
              ]}>
              <MaterialIcons name="inventory" size={18} />
              <Text style={{marginLeft: wp(1)}}>Products</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 1 && styles.activeTab,
              activeTab === 1 && isDarkMode && styles.activeTabDark,
            ]}
            onPress={() => setActiveTab(1)}>
            <View
              style={[
                styles.tabText,
                activeTab === 1 && styles.activeTabText,
                activeTab === 1 && isDarkMode && styles.activeTabTextDark,
              ]}>
              <MaterialIcons name="list-alt" size={18} />
              <Text style={{marginLeft: wp(1)}}>Orders</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#999"
            style={[styles.searchInput, isDarkMode && styles.darkSearchInput]}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}
              style={styles.clearSearch}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="inventory" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No inventory items found</Text>
              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch('')}
                  style={styles.resetSearchButton}>
                  <Text style={styles.resetSearchText}>Reset search</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>

      {/* Custom Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent
        onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={handleCloseModal}
          />
          {renderModalContent()}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InventryScreen;
