import React from 'react';
import {View, Modal, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from 'react-native-size-matters';

const Loader = ({
  visible,
}: {
  visible: boolean;
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <FastImage
            source={require('../../assets/gif/loading.gif')}
            style={{
              width: moderateScale(70),
              height: moderateScale(70),
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    // width: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Loader;
