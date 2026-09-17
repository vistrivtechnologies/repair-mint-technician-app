import React, { useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from '../../constant/Icon';  
import { Colors } from '../../constant'; 
import styles from './styles';
import { UserData, UserDataContext } from '../../context/userDataContext';

interface SearchInputContainerProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputContainerProps> = ({ searchText, onSearchTextChange, placeholder }) => {

    const { isDarkMode, userData } = useContext<UserData>( UserDataContext );
    const background =
        isDarkMode === "dark" ? Colors.PRIMARY[ 400 ] :Colors.PRIMARY[ 800 ];
    const textColor =
        isDarkMode === "dark" ? Colors.PRIMARY[ 300 ] : Colors.PRIMARY[ 400 ];

  return (
    <View style={[styles.searchContainer,{backgroundColor:background}]}>
      <Icon
        family="Entypo"
        name="magnifying-glass"
        color={textColor}
        size={20}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder || 'Search'}
        placeholderTextColor={textColor}
        value={searchText}
        onChangeText={onSearchTextChange}
      />
    </View>
  );
};

export default SearchInput;

