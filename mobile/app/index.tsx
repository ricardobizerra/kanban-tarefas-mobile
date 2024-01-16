import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { useTasks } from '../contexts/TasksContext';
import TaskByStatusInterface from '../interfaces/TasksByStatus';
import Task from '../interfaces/Task';
import styles from './styles';

const taskStatusNames: {
  [key: string]: string
} = {
  "TO_DO": "Para Fazer",
  "IN_PROGRESS": "Em Progresso",
  "DONE": "Feito"
};

const taskStatusColors: {
  [key: string]: string
} = {
  "TO_DO": "#EF4444",
  "IN_PROGRESS": "#047857",
  "DONE": "#8B5CF6"
};

export default function App() {
  const {
    tasks,
    setTasks,
  } = useTasks();

  const { data, isFetching } = useQuery('tasks', async () => {
    const response = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/tasks`);
    return response.data.data;
  }, {
    refetchInterval: 1000
  });

  const [tasksByStatus, setTasksByStatus] = useState<TaskByStatusInterface>({
    "TO_DO": [],
    "IN_PROGRESS": [],
    "DONE": [],
  });

  const organizeTasksByStatus = () => {
    const tasksByStatus: TaskByStatusInterface = {
      "TO_DO": [],
      "IN_PROGRESS": [],
      "DONE": [],
    };

    data?.forEach((task: Task) => {
      tasksByStatus[task.status].push(task);
    });

    setTasksByStatus(tasksByStatus);
  };

  useEffect(() => {
    if (!isFetching) {
      organizeTasksByStatus();
    }
  }, [isFetching, tasks]);

  return (
    <ScrollView>
      {
        Object.entries(tasksByStatus).map(([status, tasksStatusArray]) => (
          <View 
            key={status}
            style={styles.taskStatusContainer}
          >
            <Text
              style={[styles.taskStatusTitle, { backgroundColor: taskStatusColors[status] }]}
            >
              {taskStatusNames[status]}
            </Text>
            {
              tasksStatusArray.map((task: Task) => (
                <View
                  key={task.id}
                  style={styles.taskContainer}
                >
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
              ))
            }
          </View>
        ))
      }
    </ScrollView>
  );
}
