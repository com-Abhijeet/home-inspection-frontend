import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import InspectionHistory from "./InspectionHistory";

interface ReviewScreenProps {
  inspectionData: any;
  handleRemoveOption: (room: string, category: string, option: string) => void;
  handleAddImage: (
    room: string,
    category: string,
    option: string,
    uri: string
  ) => void;
}

const Review: React.FC<ReviewScreenProps> = ({
  inspectionData,
  handleRemoveOption,
  handleAddImage,
}) => {
  const handleImageUpload = async (
    room: string,
    category: string,
    option: string
  ) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(result);

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        handleAddImage(room, category, option, result.assets[0].uri);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenHeader}>Step 2 : Review</Text>
      {inspectionData.map((inspection: any, index: number) => (
        <View key={index} style={styles.inspectionContainer}>
          <Text style={styles.inspectionHeader}>Inspection Data</Text>
          {inspection.defects.map((defect: any, defectIndex: number) => (
            <View key={defectIndex} style={styles.defectContainer}>
              <Text style={styles.roomText}>Room : {defect.room}</Text>
              <Text style={styles.categoryText}>
                Category : {defect.category}
              </Text>
              {defect.options.map((option: any, optionIndex: number) => (
                <View key={optionIndex} style={styles.optionContainer}>
                  <Text style={styles.optionText}>Defect : {option.name}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleImageUpload(
                        defect.room,
                        defect.category,
                        option.name
                      )
                    }
                    style={styles.iconButton}
                  >
                    <Icon name="camera" size={30} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      handleRemoveOption(
                        defect.room,
                        defect.category,
                        option.name
                      )
                    }
                    style={styles.iconButton}
                  >
                    <Icon name="times" size={30} color="red" />
                  </TouchableOpacity>
                  {option.localUri && (
                    <View style={styles.image}>
                      <Image
                        source={{ uri: option.localUri }}
                        style={styles.image}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  inspectionContainer: {
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
  },
  screenHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inspectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 2,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  defectContainer: {
    marginBottom: 10,
    backgroundColor: "#fafafa",
    padding: 10,
    elevation: 2,
    borderRadius: 11,
  },
  roomText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  categoryText: {
    fontWeight: "600", // Semi-bold
    fontSize: 14,
    marginTop: 4, // Add some spacing between room and category
  },
  optionText: {
    flex: 1,
    fontWeight: "400", // Regular 300
    fontSize: 14,
  },
  defectHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 5,
  },
  iconButton: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
});

export default Review;
