import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Platform} from 'react-native';

type ErrorContextType = {
  isVisible: boolean;
  isSuccess: boolean;
  isPopAlert: boolean;
  errorMessage: string;
  onClickPrimaryBtn: () => void;
  onClickSecondaryBtn: () => void;
  callError: (options: {
    message?: string;
    isSuccess?: boolean;
    isPopAlert?: boolean;
    onClickPrimaryBtn?: () => void;
    onClickSecondaryBtn?: () => void;
    isDelayModal?: boolean;
    delayFor?: number;
  }) => void;
  clearError: () => void;
  isDelayModal: boolean;
  delayFor?: number;
};

const PopupContext = createContext<ErrorContextType | undefined>(undefined);

export const PopupProvider = ({children}: {children: ReactNode}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPopAlert, setIsPopAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onClickPrimaryBtn, setPrimaryBtn] = useState(() => () => {});
  const [onClickSecondaryBtn, setSecondaryBtn] = useState(() => () => {});
  const [isDelayModal, setIsDelayModal] = useState(false);
  const [delayFor, setDelayFor] = useState(Platform.OS === 'android' ? 100 : 400);
  const callError = ({
    message = 'Something Went Wrong!',
    isSuccess = false,
    isPopAlert = false,
    onClickPrimaryBtn = () => {},
    onClickSecondaryBtn = () => {},
    isDelayModal = false,
    delayFor = Platform.OS === 'android' ? 100 : 400,
  }) => {
    setIsVisible(true);
    setIsDelayModal(isDelayModal);
    setIsSuccess(isSuccess);
    setIsPopAlert(isPopAlert);
    setErrorMessage(message);
    setPrimaryBtn(() => onClickPrimaryBtn);
    setSecondaryBtn(() => onClickSecondaryBtn);
    setDelayFor(delayFor);
  };

  const clearError = () => {
    setIsVisible(false);
    setIsDelayModal(false);
    setIsSuccess(false);
    setIsPopAlert(false);
    setErrorMessage('');
    setPrimaryBtn(() => () => {});
    setSecondaryBtn(() => () => {});
    setDelayFor(400);
  };

  return (
    <PopupContext.Provider
      value={{
        isVisible,
        isSuccess,
        isPopAlert,
        errorMessage,
        onClickPrimaryBtn,
        onClickSecondaryBtn,
        callError,
        clearError,
        isDelayModal,
        delayFor,
      }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within an PopupProvider');
  }
  return context;
};
