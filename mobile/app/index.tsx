import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { useTasks } from '../contexts/TasksContext';
import TaskByStatusInterface from '../interfaces/TasksByStatus';
import Task from '../interfaces/Task';
import styles from './styles';
import EditTask from '../components/EditTask';

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

  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const { data, isFetching, refetch } = useQuery('tasks', async () => {
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

    Object.entries(tasksByStatus).forEach(([status, tasksStatusArray]) => {
      tasksStatusArray.sort((a: Task, b: Task) => {
        if (a.star && !b.star) {
          return -1;
        } else if (!a.star && b.star) {
          return 1;
        } else {
          return a.position - b.position;
        }
      });
    });

    setTasksByStatus(tasksByStatus);
  };

  useEffect(() => {
    if (!isFetching) {
      organizeTasksByStatus();
    }
  }, [isFetching, tasks]);

  useEffect(() => {
    async function updatePositions() {
      Object.entries(tasksByStatus).forEach(([status, tasksStatusArray]) => {
        tasksStatusArray.forEach(async (task: Task, index: number) => {
          if (task.position !== index) {
            await updateTaskPosition(task.id, index);
          }
        });
      });
    }

    updatePositions();
  }, []);

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/tasks/${taskId}`, { status: newStatus });
      refetch();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const updateTaskPosition = async (taskId: string, newPosition: number) => {
    try {
      await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3001/position-task/${taskId}`, { position: newPosition });
      refetch();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error updating task position:', axiosError.response?.data);
    }
  }

  const renderItem = ({ item, drag }: { item: Task, drag: () => void }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.taskContainer}
      onLongPress={drag}
      onPress={() => {
        setTaskToEdit(item);
        setShowEditTaskModal(true);
      }}
    >
      <Text style={styles.taskTitle}>{item.star ? '⭐️ ' : ''}{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderStatusContainer = ([status, tasksStatusArray]: [string, Task[]]) => (
    <View 
      key={status}
      style={styles.taskStatusContainer}
    >
      <Text
        style={[styles.taskStatusTitle, { backgroundColor: taskStatusColors[status] }]}
      >
        {taskStatusNames[status]}
      </Text>
      <DraggableFlatList
        data={tasksStatusArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => {
          const updatedTasksByStatus = { ...tasksByStatus };
          updatedTasksByStatus[status] = data;
          setTasksByStatus(updatedTasksByStatus);

          // Update task positions based on the new order
          data.forEach(async (task: Task, index: number) => {
            if (task.position !== index) {
              await updateTaskPosition(task.id, index);
            }
          });
        }}
      />
    </View>
  );

  return (
    <>
      <FlatList
        data={Object.entries(tasksByStatus)}
        renderItem={({ item }) => renderStatusContainer(item)}
        keyExtractor={(item) => item[0]}
      />
      {showEditTaskModal && <EditTask taskToEdit={taskToEdit} showModal={showEditTaskModal} setShowModal={setShowEditTaskModal} />}
    </>
  );
}
