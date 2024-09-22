import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Data {
  [room: string]: {
    [category: string]: string[];
  };
}

interface CategorySelectionProps {
  data: Data;
  selectedRoom: string | null;
  selectedOptions: { [key: string]: boolean };
  handleSelectedRoom: (room: string) => void;
  handleCheckboxChange: (
    room: string,
    category: string,
    option: string,
    value: boolean
  ) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  data,
  selectedRoom,
  selectedOptions,
  handleSelectedRoom,
  handleCheckboxChange,
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.selectRoomHeader}>
        Select Room{" "}
        <Text style={styles.selectRoomSubHeader}>
          ( slide Around to see Rooms )
        </Text>
      </Text>
      <ScrollView horizontal style={styles.roomNav}>
        {Object.keys(data).map((room) => (
          <TouchableOpacity
            key={room}
            style={[
              styles.roomButton,
              selectedRoom === room && styles.selectedRoomButton,
            ]}
            onPress={() => handleSelectedRoom(room)}
          >
            <Text style={styles.roomButtonText}>{room}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedRoom ? (
        <View style={styles.RepairOptionsContainer}>
          {Object.entries(data[selectedRoom]).map(([category, options]) => (
            <View key={category} style={styles.categoryContainer}>
              <Text style={styles.categoryHeader}>{category}</Text>
              {options.map((option) => (
                <View key={option} style={styles.optionContainer}>
                  <CheckBox
                    value={
                      selectedOptions[
                        `${selectedRoom}-${category}-${option}`
                      ] || false
                    }
                    onValueChange={(value) =>
                      handleCheckboxChange(
                        selectedRoom,
                        category,
                        option,
                        value
                      )
                    }
                  />
                  <Text style={styles.optionLabel}>{option}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noSelectedRoomContainer}>
          <Icon name="info" style={styles.infoIcon} />
          <Text style={styles.infoText}>Please Select a room to continue</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  selectRoomHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectRoomSubHeader: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6430ff",
  },
  roomNav: {
    marginBottom: 10,
    paddingBottom: 10,
    flexDirection: "row",
  },
  roomButton: {
    padding: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginRight: 10,
  },
  selectedRoomButton: {
    backgroundColor: "#007BFF",
    alignSelf: "center",
  },
  roomButtonText: {
    fontSize: 16,
    color: "#000",
  },
  RepairOptionsContainer: {
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    padding: 5,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  noSelectedRoomContainer: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  infoIcon: {
    fontSize: 30,
    paddingHorizontal: 33,
    paddingVertical: 20,
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
  },
});

export default CategorySelection;
