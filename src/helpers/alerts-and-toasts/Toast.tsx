// import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
// import { AradaHaptics } from './HapticFeedback';
// import { StyleSheet, View } from 'react-native';
// import AradaText from '../../components/text/AradaText';
// import { DeviceHeight, Dimens } from '../../theme/theme-utils';
// import Ionicon from 'react-native-vector-icons/Ionicons';
// import { Colors } from '../../theme/colors';
// import { AradaFonts } from '../../theme/fonts';

// export const TOAST_CONFIG = {
//   /*
//       Overwrite 'success' type,
//       by modifying the existing `BaseToast` component
//     */
//   success: props => (
//     <BaseToast
//       {...props}
//       style={{ borderLeftColor: 'pink' }}
//       contentContainerStyle={{ paddingHorizontal: 15 }}
//       text1Style={{
//         fontSize: 15,
//         fontWeight: '400',
//       }}
//     />
//   ),
//   /*
//       Overwrite 'error' type,
//       by modifying the existing `ErrorToast` component
//     */
//   error: props => (
//     <ErrorToast
//       {...props}
//       text1Style={{
//         fontSize: 12,
//       }}
//       text2Style={{
//         fontSize: 10,
//       }}
//     />
//   ),
//   /*
//       Or create a completely new type - `aradaError`,
//       building the layout from scratch.
  
//       I can consume any custom `props` I want.
//       They will be passed when calling the `show` method (see below)
//     */
//   aradaError: ({ text1, props }) => (
//     <View style={[styles.container, { borderColor: Colors.errorRed }]}>
//       <View style={[styles.leftHighlight, { backgroundColor: Colors.errorRed }]} />
//       <View style={[styles.leftIconContainer, { backgroundColor: Colors.errorLightRed }]}>
//         <Ionicon name="alert-circle" size={20} color={Colors.errorRed} />
//       </View>
//       <View>
//         <AradaText type="listHeader" style={styles.text}>
//           {'Error'}
//         </AradaText>
//         <AradaText type="lite" style={styles.text}>
//           {text1}
//         </AradaText>
//       </View>
//     </View>
//   ),
//   aradaSuccess: ({ text1, props }) => (
//     <View style={[styles.container, { borderColor: Colors.green }]}>
//       <View style={[styles.leftHighlight, { backgroundColor: Colors.green }]} />
//       <View style={[styles.leftIconContainer, { backgroundColor: Colors.lightGreen }]}>
//         <Ionicon name="checkmark-circle-sharp" size={20} color={Colors.green} />
//       </View>
//       <View>
//         <AradaText type="listHeader" style={styles.text}>
//           {'Success'}
//         </AradaText>
//         <AradaText type="lite" style={styles.text}>
//           {text1}
//         </AradaText>
//       </View>
//     </View>
//   ),
//   connectivityError: ({ text1, props }) => (
//     <View style={[styles.container, { borderColor: '#953553', backgroundColor: '#FF3131' }]}>
//       {/* <View style={[styles.leftHighlight, { backgroundColor: Colors.black }]} /> */}
//       <View style={[styles.leftIconContainer, { backgroundColor: '#FAA0A0' }]}>
//         <Ionicon name="cloud-offline-outline" size={20} color={'#C04000'} />
//       </View>
//       <View>
//         <AradaText type="listHeader" style={styles.text}>
//           {`${text1}`}
//         </AradaText>
//       </View>
//     </View>
//   ),
//   connectivitySuccess: ({ text1, props }) => (
//     <View style={[styles.container, { backgroundColor: '#5F8575', borderColor: 'green' }]}>
//       {/* <View style={[styles.leftHighlight, { backgroundColor: Colors.black }]} /> */}
//       <View style={[styles.leftIconContainer, { backgroundColor: Colors.lightGreen }]}>
//         <Ionicon name="cellular" size={20} color={Colors.green} />
//       </View>
//       <View>
//         <AradaText type="listHeader" style={styles.text}>
//           {`${text1}`}
//         </AradaText>
//       </View>
//     </View>
//   ),
// };

// export const AradaToast = {
//   showErrorToast: (textMsg: string) => {
//     Toast.show({
//       type: 'aradaError',
//       text1: textMsg,
//       position: 'bottom',
//       topOffset: 52,
//       bottomOffset: DeviceHeight / 6,
//       //   position: 'bottom',
//     });
//     AradaHaptics.triggerError();
//   },
//   showSuccessToast: (textMsg: string) => {
//     Toast.show({
//       type: 'aradaSuccess',
//       text1: textMsg,
//       position: 'bottom',
//       topOffset: 52,
//       bottomOffset: DeviceHeight / 6,
//       //   position: 'bottom',
//     });
//     AradaHaptics.triggerError();
//   },
//   showConnectivityError: (text: string) => {
//     Toast.show({
//       type: 'connectivityError',
//       text1: text,
//       position: 'top',
//       topOffset: 60,
//       bottomOffset: DeviceHeight / 6,
//       //   position: 'bottom',
//     });
//   },
//   showConnectivitySuccess: (text: string) => {
//     Toast.show({
//       type: 'connectivitySuccess',
//       text1: text,
//       position: 'top',
//       topOffset: 60,
//       bottomOffset: DeviceHeight / 6,
//       //   position: 'bottom',
//     });
//     AradaHaptics.triggerWarning();
//   },
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 60,
//     width: '90%',
//     borderRadius: Dimens.unitNormal,
//     backgroundColor: '#444',
//     borderWidth: 0.5,
//     alignItems: 'center',
//     overflow: 'hidden',
//     flexDirection: 'row',
//   },
//   leftHighlight: {
//     height: '100%',
//     width: 4,
//     left: 0,
//   },
//   leftIconContainer: {
//     padding: 8,
//     backgroundColor: Colors.errorLightRed,
//     borderRadius: 8,
//     marginHorizontal: Dimens.unitNormal,
//   },
//   text: { color: '#fff', fontSize: 12, fontFamily: AradaFonts.AradaRegular },
// });
