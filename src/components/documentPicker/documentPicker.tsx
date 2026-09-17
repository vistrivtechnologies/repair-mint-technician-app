import React, { useState } from 'react';
import { Text, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import styles from './styles.ts';
import { Colors, Fonts } from '../../constant';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';
import SecondaryButton from '../secondaryButton/secondaryButton.tsx';

type DocumentTypeKey = keyof typeof DocumentPicker.types;
type DocumentPickerComponentProps = {
  onFilesPicked: (files: DocumentPickerResponse[]) => void;
  title: string;
  placeholder?: string;
  error?: string;
  label: string;
  docType?: DocumentTypeKey;
  isError?: boolean;
  editable?: boolean;
};

const DocumentPickerComponent: React.FC<DocumentPickerComponentProps> = ({
  onFilesPicked,
  placeholder,
  docType,
  title, error,
  isError, label, editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  //! Function to handle document picking
  const handleDocumentPick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types[docType ? docType : 'allFiles']],
        allowMultiSelection: true,
        copyTo: 'documentDirectory',
      });
      onFilesPicked(results);
    } catch (err) {
      console.log('Unknown error: ', err);
    }
  };

  const getBackgroundColor = () => {
    if (!editable) return '#E0E0E0';
    return isFocused ? Colors.LIGHT_GREY_2 : Colors.LIGHT_GREY_2;
  };
  const getBorderColor = () => {
    if (error) return Colors.ERROR[100];
    return isFocused ? Colors.PRIMARY[100] : Colors.LIGHT_GREY;
  };

  return (
    <View style={{
      alignItems: 'center', alignSelf: 'center',
    }}>
      <Text style={styles.labelText}>{label}</Text>

      <SecondaryButton
        onPress={handleDocumentPick}
        style={[
          styles.uploadButton,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
          },

        ]}
        brColor={isError ? 'red' : Colors.LIGHT_GREY}
        // bgColor={Colors.WHITE}
        showIcon={true}
        textColor={Colors.BLACK}
        borderWidth={1.5}
        borderRadius={7}
        fontSize={moderateScale(13)}
        title={placeholder ? `${placeholder} - PDF` : `${title}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <View style={styles.supportedFileContainer}>
        <Text style={styles.supportedFileText}>
          <Text style={styles.requiredIndicator}>*</Text>
          <Text
            style={{
              fontFamily: Fonts.Medium,
              fontSize: moderateScale(14),
            }}>
            {' '}
            Supported file format:{' '}
          </Text>
          <Text style={styles.fileFormat}>.pdf</Text>
        </Text>
      </View>
    </View>
  );
};

export default React.memo(DocumentPickerComponent);
