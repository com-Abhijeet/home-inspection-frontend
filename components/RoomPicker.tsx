import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface RoomPickerProps {
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  data: { [key: string]: any };
}

const RoomPicker: React.FC<RoomPickerProps> = ({ selectedRoom, setSelectedRoom, data }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedRoom}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedRoom(itemValue)}
      >
        <Picker.Item label="Select a Room" value={null} />
        {Object.keys(data).map((room) => (
          <Picker.Item key={room} label={room} value={room} />
        ))}
      </Picker>
      {selectedRoom && (
        <Button title="Clear Selection" onPress={() => setSelectedRoom(null)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

export default RoomPicker;
