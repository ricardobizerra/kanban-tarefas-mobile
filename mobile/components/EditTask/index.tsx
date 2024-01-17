import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import styles from './styles';
import { useTasks } from '../../contexts/TasksContext';
import Task from '../../interfaces/Task';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native-switch';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

interface EditTaskProps {
    taskToEdit: Task | null;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditTaskFormProps {
    status: string;
    star: boolean;
}

const EditTask = ({ taskToEdit, showModal, setShowModal }: EditTaskProps) => {
    const {
        tasks,
        setTasks,
    } = useTasks();

    const { control, register, handleSubmit } = useForm<EditTaskFormProps>({
        defaultValues: {
            status: taskToEdit?.status || 'TO_DO',
            star: taskToEdit?.star || false,
        },
    });

    const [value, setValue] = React.useState(taskToEdit?.status || 'TO_DO');
    const onChange = (value: React.SetStateAction<string>) => {
        setValue(value);
    }

    console.log(taskToEdit?.status, value);

    const onSubmit = async (data: EditTaskFormProps) => {

        const { star, status } = data;

        try {
            
            if (taskToEdit?.status !== value) {
                let response;
                if (value === 'TO_DO' || value === 'IN_PROGRESS') {
                    response = await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/tasks/${taskToEdit?.id}`, {
                        status: value,
                    });
                } else {
                    response = await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/tasks/${taskToEdit?.id}`, {
                        status: value,
                        concludedAt: new Date(),
                    });
                }

                const updatedTask = response.data.data;

                const updatedTasks = tasks.map((task: Task) => {
                    if (task.id === updatedTask.id) {
                        return updatedTask;
                    }

                    return task;
                });

                setTasks(updatedTasks);
            }

            if (taskToEdit?.star !== star) {
                const response = await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/star-task/${taskToEdit?.id}`, {
                    star,
                });

                const updatedTask = response.data.data;

                const updatedTasks = tasks.map((task: Task) => {
                    if (task.id === updatedTask.id) {
                        return updatedTask;
                    }

                    return task;
                });

                setTasks(updatedTasks);
            }

            setShowModal(false);

        } catch (error) {
            console.error(error);
        }
        
    };

    return (
        <View>
            {showModal && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}  
                >
                    <View style={{backgroundColor: '#000000aa', flex: 1}}></View>

                    <View style={styles.modal}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
                            <Ionicons name="close" size={24} color="#010415" />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.heading}>Add Task</Text>
                            <View>

                                <Text>Status</Text>

                                <SegmentedControl
                                    values={['Para Fazer', 'Em Progresso', 'Feito']}
                                    selectedIndex={value === 'TO_DO' ? 0 : value === 'IN_PROGRESS' ? 1 : 2}
                                    onChange={(event) => {
                                        const selectedIndex = event.nativeEvent.selectedSegmentIndex;
                                        const selectedValue = selectedIndex === 0 ? 'TO_DO' : selectedIndex === 1 ? 'IN_PROGRESS' : 'DONE';
                                        onChange(selectedValue);
                                    }}
                                    style={{
                                        height: 64,
                                    }}
                                    backgroundColor='#010415'
                                    fontStyle={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}
                                    appearance='dark'
                                    activeFontStyle={{
                                        color: '#fff'
                                    }}
                                />

                                <View style={styles.starPicker}>
                                    <Text>Star</Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View>
                                                <Switch
                                                    value={value}
                                                    onValueChange={onChange}
                                                    activeText='Sim'
                                                    inActiveText='Não'
                                                    backgroundActive='#010415'
                                                />
                                            </View>
                                        )}
                                        name='star'
                                    />
                                </View>

                                <TouchableOpacity 
                                    style={[styles.button, styles.buttonVariantSecondary]} 
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    <Text style={[styles.buttonText, styles.buttonTextVariantSecondary]}>Alterar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default EditTask;
