import { Text, View } from "react-native";
import styles from "./styles";
import AddTask from "../AddTask";
import { useState } from "react";

export default function Header() {
    const [showModal, setShowModal] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Kanban</Text>
            <Text style={styles.p}>Organize suas tarefas de forma simples e fácil</Text>

            <AddTask
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </View>
    )
}