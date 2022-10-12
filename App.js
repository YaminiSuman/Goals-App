import { FlatList, StyleSheet, View , Button} from "react-native";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const startAddGoalModal = () => {
    setIsModalVisible(true);
  }

    const endAddGoalModal = () => {
      setIsModalVisible(false);
    };
  
  const handleAddGoal = (inputGoal) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: inputGoal, id: Math.random().toString() },
    ]);
    endAddGoalModal();
  };

  const handleDeleteGoal = (id) => {
    setGoals((currentGoals) => {
     return currentGoals.filter((goal)=> goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          onPress={startAddGoalModal}
          color="#a065ec"
        />
        {isModalVisible && (
          <GoalInput
            addGoal={handleAddGoal}
            visible={isModalVisible}
            onCancel={endAddGoalModal}
          />
        )}
        <View style={styles.goalContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteGoal={handleDeleteGoal}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});

