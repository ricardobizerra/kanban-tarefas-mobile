import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import styles from './styles';
import { useTasks } from '../../contexts/TasksContext';

interface AddTaskProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddTaskFormProps {
    title: string;
    description: string;
}

const AddTask = ({ showModal, setShowModal }: AddTaskProps) => {
    const {
        tasks,
        setTasks,
    } = useTasks();

    const { control, register, handleSubmit } = useForm<AddTaskFormProps>({
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = async (data: AddTaskFormProps) => {

        const { title, description } = data;

        try {
            const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/tasks`, {
                title,
                description,
            });

            setTasks([...(tasks || []), response.data.data]);
            setShowModal(false);

        } catch (error) {
            console.error(error);
        }
        
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.button}>
                <Ionicons name="add" size={24} color="#010415" />
                <Text style={styles.buttonText}>Adicionar tarefa</Text>
            </TouchableOpacity>

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
                                <Text>Title</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name='title'
                                />

                                <Text>Description</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name='description'
                                />

                                <TouchableOpacity style={[styles.button, styles.buttonVariantSecondary]} onPress={handleSubmit(onSubmit)}>
                                    <Text style={[styles.buttonText, styles.buttonTextVariantSecondary]}>Adicionar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default AddTask;
