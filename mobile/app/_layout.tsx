import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <SafeAreaProvider>
        <StatusBar style="auto" />

        <View style={styles.main}>
          <Header />

          <View>
              <Slot />
          </View>
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#010415",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
});