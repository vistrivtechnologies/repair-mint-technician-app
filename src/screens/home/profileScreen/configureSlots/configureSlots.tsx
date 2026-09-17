import React, { FC, useMemo, useState } from 'react';
import { ScrollView, View, SafeAreaView, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import styles from './configureSlots.styles';
import { Button, Header } from '../../../../components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Ionicons from 'react-native-vector-icons/Ionicons';



const ConfigureSlots: FC = () => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
    const daysOfWeek = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
    ];

    const FULL_DAY_NAMES: Record<string, string> = {
        Mon: 'Monday',
        Tue: 'Tuesday',
        Wed: 'Wednesday',
        Thu: 'Thursday',
        Fri: 'Friday',
        Sat: 'Saturday',
        Sun: 'Sunday',
    };

    function generateOneHourSlots(): string[] {
        const result: string[] = [];
        for (let hour = 9; hour < 18; hour++) {
            const start = new Date();
            start.setHours(hour, 0, 0, 0);
            const end = new Date(start);
            end.setHours(hour + 1);

            const fmt = (d: Date) =>
                d.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                });

            result.push(`${fmt(start)} – ${fmt(end)}`);
        }
        return result;
    }

    const slots = useMemo(() => generateOneHourSlots(), []);

    const AVAILABILITY = useMemo(() => {
        return slots.reduce<Record<string, boolean>>((acc, slot, idx) => {
            // e.g. disable the last three slots as an example
            acc[slot] = idx < slots.length - 3;
            return acc;
        }, {});
    }, [slots]);



    return (
        <SafeAreaView>
            <Header title="Configure Slots" />
            <Text style={styles.weeklyHours}>Weekly Hours</Text>
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                >
                    {daysOfWeek.map(day => {
                        const isSelected = day === selectedDay;
                        return (
                            <TouchableOpacity
                                key={day}
                                style={[
                                    styles.item,
                                    isSelected && styles.itemSelected,
                                ]}
                                onPress={() => setSelectedDay(day)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        isSelected && styles.textSelected,
                                    ]}
                                >
                                    {day}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.addSlotsContainer}>
                <Ionicons
                    name="timer-outline"
                    size={36}
                />
                <Text style={styles.selectTime}>Select a time slot that works best for you from the available options below.</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.addTimeSlots}>+ Add Time Slots</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                {`${FULL_DAY_NAMES[selectedDay]} Time Slot`}
                            </Text>
                            <Text style={styles.chooseSlot}>Choose your preferred time slot from the available options within the time window provided.</Text>
                            <FlatList
                                data={slots}
                                keyExtractor={s => s}
                                renderItem={({ item }) => {
                                    const available = AVAILABILITY[item];
                                    // treats undefined as false (disabled)
                                    console.log('qqqqqqqqqqqqqqq', item);

                                    const isSelected = selectedSlots.has(item);
                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.slot,
                                                available ? styles.slotAvailable : styles.slotDisabled,
                                                isSelected && styles.slotSelected,   // only when true
                                            ]}


                                            // Toggle selection in a Set<string>
                                            onPress={() => {
                                                if (!available) return;
                                                setSelectedSlots(prev => {
                                                    const next = new Set(prev);
                                                    next.has(item) ? next.delete(item) : next.add(item);
                                                    return next;
                                                });
                                            }}

                                        >
                                            <Text
                                                style={[
                                                    styles.slotText,
                                                    available ? styles.textAvailable : styles.textDisabled,
                                                    isSelected && styles.textSelected,
                                                ]}
                                            >
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }}
                                numColumns={2}
                                columnWrapperStyle={styles.slotRow}

                                contentContainerStyle={styles.slotList}
                            />

                            <View style={styles.buttonFlex}>

                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Text style={styles.updateText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default ConfigureSlots;
