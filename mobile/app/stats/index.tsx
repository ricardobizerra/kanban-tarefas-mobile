import { Dimensions, Text, View } from "react-native";
import styles from "./styles";
import { PieChart, LineChart } from "react-native-chart-kit";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Task from "../../interfaces/Task";
import TaskByStatusInterface from "../../interfaces/TasksByStatus";
import { ScrollView } from "react-native-gesture-handler";

export default function Stats() {
    const { data, isFetching } = useQuery('tasks', async () => {
        const response = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/tasks`);
        return response.data.data;
    });

    const [tasksByStatus, setTasksByStatus] = useState<{
        name: string;
        number: number;
        color: string;
        legendFontColor: string;
    }[]>([]);

    const [completedTasksByDate, setCompletedTasksByDate] = useState<{
        date: string;
        count: number;
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

        const completedTasksByDate: {
            date: string;
            count: number;
        }[] = [];

        data?.forEach((task: Task) => {
            tasksByStatus[task.status].push(task);

            if (task.status === "DONE") {
                const completionDate = task.concludedAt.toString().split("T")[0];

                const existingDate = completedTasksByDate.find(item => item.date === completionDate);
                if (existingDate) {
                    existingDate.count++;
                } else {
                    completedTasksByDate.push({
                        date: completionDate,
                        count: 1,
                    });
                }
            }
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
        setCompletedTasksByDate(
            completedTasksByDate.sort((a, b) => {
                const aDate = new Date(a.date);
                const bDate = new Date(b.date);

                return aDate.getTime() - bDate.getTime();
            })
        );
    };

    useEffect(() => {
        if (!isFetching) {
            organizeTasksByStatus();
        }
    }, [isFetching]);

    return (
        <ScrollView
            style={styles.scrollView}
        >
            <Text style={styles.title}>Tarefas por Status</Text>
            <PieChart 
                data={tasksByStatus}
                width={Dimensions.get("window").width - 32}
                height={250}
                chartConfig={{
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                accessor="number"
                backgroundColor="transparent"
                paddingLeft="10"
                center={[10, 0]}
                absolute
                style={styles.chart}
            />

            <Text style={styles.title}>Tarefas Completas por Data</Text>
            {completedTasksByDate.length > 0 && <LineChart
                data={{
                    labels: completedTasksByDate.map(item => item.date.split("-").reverse().join("/")),
                    datasets: [
                        {
                            data: completedTasksByDate.map(item => item.count),
                        },
                    ],
                }}
                width={Dimensions.get("window").width - 32}
                height={250}
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2,
                }}
                transparent
                fromZero
                style={styles.chart}
            />}
        </ScrollView>
    )
}