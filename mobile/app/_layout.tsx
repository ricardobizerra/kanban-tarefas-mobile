import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { StyleSheet, View } from "react-native";
import { QueryClient, QueryClientProvider } from 'react-query'
import TasksProvider from "../contexts/TasksProvider";

export default function Layout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TasksProvider>
          <StatusBar style="auto" />

          <View style={styles.main}>
            <Header />
            <Slot />
          </View>
        </TasksProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    backgroundColor: "#010415",
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 24,
    width: '100%',
    height: '100%',
  },
});