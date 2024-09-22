import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Inspection } from "@/types/types";
import DisplayLabels from "./ui/DisplayLabels";
import { RootStackParamList } from "@/types/navigationTypes";
import { useRoute, RouteProp } from "@react-navigation/native";
import ImageViewing from "react-native-image-viewing";

const ViewImages = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ViewImages">>();
  const { inspection } = route.params;
  const { unit } = route.params;
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePress = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    console.log("clicked"), setIsViewerVisible(true);
  };

  return (
    <ScrollView style={styles.scrollViewContent}>
      <View style={styles.infoContainer}>
        <DisplayLabels label="unit no" text={unit.unitNo} />
        <DisplayLabels label="Type" text={unit.unitType} />
        <DisplayLabels label="Status" text={unit.unitStatus} />
      </View>
      <View style={styles.hr}></View>
      <View style={styles.imageContainer}>
        {inspection.defects?.map((defect, defectIndex) => (
          <View key={defectIndex} style={styles.defectContainer}>
            <View style={styles.defectTitle}>
              <Text style={styles.room}>Room: {defect.room}</Text>
              <Text style={styles.category}>Category: {defect.category}</Text>
            </View>
            <View style={styles.hr2}></View>
            <View style={styles.optionsContainer}>
              {defect.options.map((option, optionIndex) => (
                <View key={optionIndex} style={styles.optionCard}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  {option.cloudinaryUrl ? (
                    <TouchableOpacity
                      onPress={() =>
                        option.cloudinaryUrl &&
                        handleImagePress(option.cloudinaryUrl)
                      }
                    >
                      <Image
                        source={{ uri: option.cloudinaryUrl }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text>No image available</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
      {selectedImage && (
        <ImageViewing
          images={[{ uri: selectedImage }]}
          imageIndex={0}
          visible={isViewerVisible}
          onRequestClose={() => setIsViewerVisible(false)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: "white",
  },
  infoContainer: {
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  hr: {
    borderBottomColor: "#442dd8",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  hr2: {
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  defectContainer: {
    marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  defectTitle: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  room: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 16,
    color: "#555",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionCard: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#f9f9f9",
    alignItems: "center",
    elevation: 2,
  },
  optionName: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 5,
  },
});

export default ViewImages;
