import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#010415",
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
    },
    h1: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#fff",
    },
    p: {
        fontSize: 16,
        marginBottom: 8,
        color: "#fff",
        textAlign: "center",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d1d1d', // in tailwind, this is slate-900. slate-800 in hex is #1D1D1D
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        gap: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign: "center",
    },
});

export default styles;