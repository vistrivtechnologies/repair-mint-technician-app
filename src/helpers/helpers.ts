import {LocalStorage} from './localstorage';

//To Sigout of User
export const handleSignout = (setUserData: ({}) => void) => {
  setTimeout(() => {
    setUserData({});
    LocalStorage.save('@login', false);
    LocalStorage.save('@jwt_token', '');
    LocalStorage.flushQuestionKeys();
  }, 700);
};
