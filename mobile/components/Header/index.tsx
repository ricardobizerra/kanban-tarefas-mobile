import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import AddTask from "../AddTask";
import { useState } from "react";
import Line from "../Line";
import { Link, useRouter, usePathname } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const [showModal, setShowModal] = useState(false);
    const pathname = usePathname();
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Kanban</Text>
            <Text style={styles.p}>Organize suas tarefas de forma simples e fácil</Text>

            <View style={styles.buttonsContainer}>
                {pathname === "/" && <AddTask
                    showModal={showModal}
                    setShowModal={setShowModal}
                />}

                {pathname === "/" ? (
                    <Link href="/stats" asChild>
                        <TouchableOpacity style={styles.button}>
                            <Ionicons name="stats-chart" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Ver estatísticas</Text>
                        </TouchableOpacity>
                    </Link>
                ) : (
                    <Link href="/" asChild>
                        <TouchableOpacity style={styles.button}>
                            <Ionicons name="home" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Voltar para o início</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            </View>

            <Line />
        </View>
    )
}