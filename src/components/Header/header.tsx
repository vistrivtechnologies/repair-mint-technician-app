import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../../constant/Icon';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../../constant';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { scale } from 'react-native-size-matters';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ( { title, showBackButton = true, onBackPress } ) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if ( onBackPress ) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const MAX_WORDS = 15;

  const trimmedTitle = ( () => {
    const words = title.trim().split( /\s+/ );
    return words.length > MAX_WORDS
      ? words.slice( 0, MAX_WORDS ).join( ' ' ) + '...'
      : title;
  } )();

  return (
    <View style={ styles.header }>
      { showBackButton ? (
        <TouchableOpacity onPress={ handleBackPress } style={ styles.backButton }>
          <Icon family="AntDesign" name="arrowleft" color={ Colors.HEADING } />
        </TouchableOpacity>
      ) : (
        null
      ) }

      <Text
        style={ styles.headerTitle }
        numberOfLines={ 1 }
        ellipsizeMode="tail"
      >
        { trimmedTitle }
      </Text>

      <View style={ styles.headerSpacer } />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create( {
  header: {
    backgroundColor: Colors.PRIMARY[ 300 ],
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.HEADING,
  },
  headerTitle: {
    color: Colors.HEADING,
    fontSize: scale( 15 ),
    width: wp( 60 ),
    // alignSelf: 'flex-start',
    marginLeft: wp( 3 ),
    fontFamily: Fonts.SemiBold,
  },
  headerSpacer: {
    width: 32,
  },
} );
