import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import {Colors, Fonts, Icon} from '../../../../constant';
import {moderateScale, scale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LocalStorage} from '../../../../helpers/localstorage';
import {API} from '../../../../api/fetchApis';
import {usePopup} from '../../../../context/popupContext';
import Loader from '../../../../components/Loader/Loader';
import moment from 'moment';
import {API as FetchAPI} from '../../../../api/fetchApis';

const Timer = ({
  item,
  setAssignedSRbyId,
}: {
  item?: any;
  setAssignedSRbyId: (e: any) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {callError} = usePopup();
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [commentFor, setCommentFor] = useState('');
  const [time, setTime] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [activeHold, setActiveHold] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!item?.workStartTime) return;
  
    const startTime = moment(item.workStartTime);
  
    const tick = () => {
      const now = moment();
  
      let totalHoldSeconds = 0;
      let activeHold = null;
  
      item.holds?.forEach((hold: any) => {
        const holdStart = moment(hold.holdStartTime);
        const holdEnd = hold.holdEndTime ? moment(hold.holdEndTime) : now;
        
        totalHoldSeconds += holdEnd.diff(holdStart, 'seconds');
  
        if (!hold.holdEndTime) {
          activeHold = hold;
        }
      });
  
      const totalElapsedSeconds = now.diff(startTime, 'seconds');
      const effectiveWorkingTime = Math.max(totalElapsedSeconds - totalHoldSeconds, 0);
  
      setTime(effectiveWorkingTime);
      setHoldTime(totalHoldSeconds);
      setActiveHold(activeHold);
    };
  
    tick();
    intervalRef.current = setInterval(tick, 1000);
  
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [item?.workStartTime, item?.holds]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  const fetchData = async () => {
    try {
      const tokenString = await LocalStorage.read('@jwt_token');
      const token = JSON.parse(tokenString);
      const payload = {
        serviceRequestApprovalId: item?._id,
      };
      const res = await API.getOneSR(token, payload);
      if (res) {
        setAssignedSRbyId(res?.data?.serviceRequestAssigned);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
    }
  };

  const handleStartWork = async () => {
    setIsLoading(true);
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    const payload = {
      serviceRequestApprovalId: item?._id,
      workflowStatus: 'work-started',
    };

    API.updateWorkflowStatus(token, payload)
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

  const handleUpdateSR = async (status: string) => {
    const tokenString = await LocalStorage.read('@jwt_token');
    const token = JSON.parse(tokenString);
    const payload = {
      serviceRequestApprovalId: item?._id,
      workflowStatus: status,
      ...(status === 'on-hold' && {holdComment: comment}),
    };
    FetchAPI.updateWorkflowStatus(token, payload)
      .then(res => {
        if (res) {
          setComment('');
          setCommentModalVisible(false);
          fetchData();
          callError({
            message: res?.message,
            isSuccess: true,
            isDelayModal: true,
          });
        }
      })
      .catch(err => {
        callError({
          message: err?.error?.message,
          isDelayModal: true,
        });
      });
  };

  const toggleHold = () => {
    if (activeHold) {
      handleUpdateSR('un-hold');
    } else {
      setCommentModalVisible(true);
      setCommentFor('Hold');
    }
  };

  return (
    <View>
      <View style={styles.headingContainer}>
        <Icon family="MaterialIcons" name="not-started" />
        <Text style={styles?.heading}>Start Work</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {formatTime(time)}
          </Text>
        </View>

        {item?.workStartTime ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {backgroundColor: Colors.SECONDARY[100]},
              ]}
              onPress={() => handleUpdateSR('completed')}>
              <Icon family="FontAwesome" name="check" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                {backgroundColor: '#fff', borderWidth: 2},
              ]}
              onPress={toggleHold}>
              <Icon
                family="FontAwesome"
                name={activeHold ? 'play' : 'pause'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                {backgroundColor: Colors.STATUS.DANGER},
              ]}
              onPress={() => {
                setCommentModalVisible(true);
                setCommentFor('Reject');
              }}>
              <Icon family="FontAwesome" name="times" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStartWork}>
            <MaterialIcons
              name="play-arrow"
              size={moderateScale(24)}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={commentModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCommentModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{commentFor} Request</Text>
              <TouchableOpacity
                onPress={() => setCommentModalVisible(false)}
                style={styles.closeButton}>
                <Icon family="Ionicons" name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalSubtitle}>
                Please provide a reason for {commentFor.toLowerCase()} this request
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Type your reason here..."
                  placeholderTextColor="#999"
                  value={comment}
                  onChangeText={setComment}
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                {comment.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearInput}
                    onPress={() => setComment('')}>
                    <Icon
                      family="Ionicons"
                      name="close-circle"
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.actionButtonHold, styles.cancelButton]}
                onPress={() => {
                  setCommentModalVisible(false);
                  setComment('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButtonHold, styles.submitButton]}
                onPress={() => {
                  handleUpdateSR(commentFor === 'Hold' ? 'on-hold' : 'reject');
                }}
                disabled={!comment.trim()}>
                <Text style={styles.submitButtonText}>
                  Confirm {commentFor}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {isLoading && <Loader visible={isLoading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  timerText: {
    fontSize: moderateScale(38),
    fontFamily: Fonts.Medium,
    color: Colors.BLACK,
    letterSpacing: 1,
  },
  button: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(12.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    height: wp(15),
    width: wp(15),
    borderRadius: 100,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: Colors.PRIMARY[100],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(0.6),
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: Colors.BLACK,
    fontFamily: Fonts.Medium,
    marginLeft: wp(0.5),
    fontSize: moderateScale(15),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    fontFamily: Fonts.Bold,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    color: Colors.BLACK,
    fontFamily: Fonts.Bold,
  },
  closeButton: {
    padding: moderateScale(4),
  },
  modalContent: {
    padding: moderateScale(16),
  },
  modalSubtitle: {
    fontSize: moderateScale(14),
    color: '#666',
    marginBottom: hp(1.5),
    fontFamily: Fonts.Medium,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 15,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
    fontFamily: Fonts.Medium,
  },
  clearInput: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButtonHold: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: Colors.BLACK,
    fontFamily: Fonts.Medium,
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
  },
});

export default Timer;