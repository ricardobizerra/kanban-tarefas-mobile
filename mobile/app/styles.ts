import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    taskStatusContainer: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: 'gray',
        padding: 16,
    },
    taskStatusTitle: {
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    taskContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'gray',
        padding: 16,
        marginBottom: 12,
    },
    taskTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        color: '#fff',
    },
    taskDescription: {
        fontSize: 14,
        marginBottom: 8,
        color: '#fff',
    },
});

export default styles;