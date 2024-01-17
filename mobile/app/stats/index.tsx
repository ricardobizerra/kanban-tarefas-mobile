import { Dimensions, Text, View } from "react-native";
import styles from "./styles";
import { PieChart } from "react-native-chart-kit";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Task from "../../interfaces/Task";
import TaskByStatusInterface from "../../interfaces/TasksByStatus";

export default function Stats() {
    const { data, isFetching, refetch } = useQuery('tasks', async () => {
        const response = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/tasks`);
        return response.data.data;
    }, {
        refetchInterval: 1000
    });

    const [tasksByStatus, setTasksByStatus] = useState<{
        name: string;
        number: number;
        color: string;
        legendFontColor: string;
    }[]>([]);

    const organizeTasksByStatus = () => {
        const tasksByStatus: TaskByStatusInterface = {
            "TO_DO": [],
            "IN_PROGRESS": [],
            "DONE": [],
        };

        const numberTasksByStatus: {
            name: string;
            number: number;
            color: string;
            legendFontColor: string;
        }[] = [];

        data?.forEach((task: Task) => {
            tasksByStatus[task.status].push(task);
        });

        for (const key in tasksByStatus) {
            numberTasksByStatus.push({
                name: key === "TO_DO" ? "Para Fazer" : key === "IN_PROGRESS" ? "Em Progresso" : "Feito",
                number: tasksByStatus[key].length,
                color: key === "TO_DO" ? "#ef4444" : key === "IN_PROGRESS" ? "#047857" : "#8B5CF6",
                legendFontColor: "#fff",
            });
        }

        setTasksByStatus(numberTasksByStatus);
    };

    useEffect(() => {
        if (!isFetching) {
            organizeTasksByStatus();
        }
    }, [isFetching]);

    return (
        <View>
            <Text style={styles.title}>Tasks por Status</Text>
            <PieChart 
                data={tasksByStatus}
                width={Dimensions.get("window").width - 16}
                height={250}
                chartConfig={{
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                accessor="number"
                backgroundColor="transparent"
                paddingLeft="10"
                center={[10, 0]}
                absolute
                style={{
                    marginVertical: 8,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#fff",
                }}
            />
        </View>
    )
}