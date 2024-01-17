import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: "#fff",
        textAlign: "center",
    },
    scrollView: {
        width: Dimensions.get("window").width - 32,
    },
    chart: {
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#fff",
    }
});

export default styles;