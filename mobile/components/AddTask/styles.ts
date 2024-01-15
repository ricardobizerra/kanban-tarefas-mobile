import { Dimensions, StyleSheet } from "react-native";

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

export default styles;