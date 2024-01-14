import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddTaskProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddTaskFormProps {
    title: string;
    description: string;
}

const AddTask = ({showModal, setShowModal}: AddTaskProps) => {
    const { control, register, handleSubmit } = useForm<AddTaskFormProps>({
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = (data: AddTaskFormProps) => {
        console.log(data);
        setShowModal(false);
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

const styles = StyleSheet.create({
    modal: {
        width: Dimensions.get('window').width - 64,
        height: 500,
        backgroundColor: '#fff',
        position: 'absolute',
        top: Dimensions.get('window').height / 2 - 250,
        left: 32,
        borderRadius: 16,
        padding: 32,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    buttonVariantSecondary: {
        backgroundColor: '#010415',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#010415',
    },
    buttonTextVariantSecondary: {
        color: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
});

export default AddTask;
