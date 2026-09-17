import React, {FC, useContext, useState} from 'react';
import {ScrollView, View, SafeAreaView, FlatList} from 'react-native';
import styles from './earningList.styles';
import {Header, TextView} from '../../../../components';
import {HomeStackProps} from '../../../../@types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import {UserData, UserDataContext} from '../../../../context/userDataContext';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const earningList = [
  {
    id: '1',
    paymentMethod: 'Cash',
    amount: '₹1258',
    date: '02 Dec, 2022',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
  },
  {
    id: '2',
    paymentMethod: 'Cash',
    amount: '₹1258',
    date: '02 Dec, 2022',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
  },
  {
    id: '3',
    paymentMethod: 'Cash',
    amount: '₹1258',
    date: '02 Dec, 2022',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.',
  },
  {
    id: '4',
    paymentMethod: 'Cash',
    amount: '₹1258',
    date: '02 Dec, 2022',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.',
  },
];

type EarningListNavigationType = NativeStackNavigationProp<
  HomeStackProps,
  'EarningList'
>;

const EarningList: FC = () => {
  const navigation = useNavigation<EarningListNavigationType>();
  const {userData, setIsLoggedIn} = useContext<UserData>(UserDataContext);

  const EarningCard = ({item}: {item: any}) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <TextView style={styles.label}>Payment Method :</TextView>
        <TextView style={styles.method}>{item.paymentMethod}</TextView>
      </View>
      <TextView style={styles.description}>{item.description}</TextView>
      <View style={styles.amountCard}>
        <View style={styles.rowBetween}>
          <TextView style={styles.subLabel}>Amount</TextView>
          <TextView style={styles.amount}>{item.amount}</TextView>
        </View>
        <View style={styles.rowBetween}>
          <TextView style={styles.subLabel}>Date</TextView>
          <TextView style={styles.date}>{item.date}</TextView>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Earning List" />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: hp(5)}} showsVerticalScrollIndicator={false}>
        <FlatList
          data={earningList}
          keyExtractor={item => item.id}
          renderItem={({item}) => <EarningCard item={item} />}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EarningList;
