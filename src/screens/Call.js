import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Switch,
} from "react-native";
import bot_off from "../assets/bot_off.png";
import bot_on from "../assets/bot_on.png";
import plus from "../assets/plus.png";

export default function Home(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [mainButton, setMainButton] = useState(false);
  const [isEditorModalVisible, setEditorModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [containersCount, setContainersCount] = useState(0);

  const imageSource = mainButton ? bot_on : bot_off;
  const mainButtonStyle = mainButton
    ? styles.activeBtnContainer
    : styles.disabledBtnContainer;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleEditorModal = () => {
    setEditorModalVisible(!isEditorModalVisible);
  };

  const handleAddedContainer = (index) => {
    setSelectedItemIndex(index);
    toggleEditorModal();
  };

  const handleEdit = () => {
    toggleEditorModal();
    setEditingItem(items[selectedItemIndex]);
    toggleModal();
  };

  const handleDelete = () => {
    toggleEditorModal();
    const updatedItems = [...items];
    updatedItems.splice(selectedItemIndex, 1);
    setItems(updatedItems);
    setContainersCount((prevCount) => prevCount - 1);
  };

  const handleMainButton = () => {
    setMainButton(!mainButton);
  };

  const handleSwitchChange = (index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        // Toggle the switch value for the selected container
        return { ...item, switchValue: !item.switchValue };
      } else if (item.switchValue && index !== null) {
        // If another switch is on, turn it off
        return { ...item, switchValue: false };
      } else {
        return item;
      }
    });

    setItems(updatedItems);
  };

  const addItem = () => {
    if (title && message && containersCount < 4) {
      if (editingItem) {
        const updatedItems = [...items];
        updatedItems[selectedItemIndex] = { title, message };
        setItems(updatedItems);
      } else {
        setItems([...items, { title, message }]);
        setContainersCount((prevCount) => prevCount + 1);
      }

      setTitle("");
      setMessage("");
      toggleModal();
      setEditingItem(null);
      setContainersCount(containersCount + 1);
    }
  };

  useEffect(() => {
    if (editingItem) {
      // If in edit mode, set the title and message from the editingItem
      setTitle(editingItem.title);
      setMessage(editingItem.message);
    } else {
      // If not in edit mode, reset the title and message
      setTitle("");
      setMessage("");
    }
  }, [isModalVisible, editingItem]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleMainButton}
        style={[styles.btnContainer, mainButtonStyle]}
      >
        <Image style={styles.image} source={imageSource} />
        <Text>{`${mainButton ? "ON" : "OFF"}`}</Text>
        <Text>{`Tap to turn ${mainButton ? "OFF" : "ON"}`}</Text>
      </TouchableOpacity>

      <Modal
        visible={isEditorModalVisible}
        transparent={true}
        onRequestClose={toggleEditorModal}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleEditorModal}
        />
        <View style={styles.editorModal}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView style={styles.scrollView}>
        {items
          .sort((a, b) =>
            a.switchValue === b.switchValue ? 0 : a.switchValue ? -1 : 1
          )
          .map((item, index) => (
            <TouchableOpacity
              onPress={() => handleAddedContainer(index)}
              style={styles.addedContainer}
              key={index}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
              <View style={styles.messageContainer}>
                <View style={styles.messageTextContainer}>
                  <Text>{item.message}</Text>
                </View>

                <View style={styles.messageButtonContainer}>
                  <Switch
                    value={item.switchValue}
                    onValueChange={() => handleSwitchChange(index)}
                    thumbColor={item.switchValue ? "green" : "white"}
                    trackColor={{ false: "gray", true: "lightgreen" }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <TouchableOpacity
        onPress={toggleModal}
        style={[
          styles.addItemButton,
          containersCount >= 4 && styles.disabledButton,
        ]}
        disabled={containersCount >= 4}
      >
        <Image style={styles.plusIcon} source={plus} />
        <Text>Add New Mode</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          {/* Conditional rendering of TextInput based on editing status */}
          {editingItem ? (
            <>
              <TextInput
                multiline={true}
                style={styles.input}
                placeholder="Enter title"
                placeholderTextColor={"white"}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
              <TextInput
                multiline={true}
                style={styles.message}
                placeholder="Enter message"
                placeholderTextColor={"white"}
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
            </>
          ) : (
            <>
              <TextInput
                multiline={true}
                style={styles.input}
                placeholder="Enter title"
                placeholderTextColor={"white"}
                value={editingItem ? editingItem.title : title}
                onChangeText={(text) => setTitle(text)}
              />
              <TextInput
                multiline={true}
                style={styles.message}
                placeholder="Enter message"
                placeholderTextColor={"white"}
                value={editingItem ? editingItem.message : message}
                onChangeText={(text) => setMessage(text)}
              />
            </>
          )}
          <Button title="Add Item" onPress={addItem} />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    // marginBottom: "20%",
    width: "95%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },

  addedContainer: {
    backgroundColor: "#2bd9bf",
    width: "100%",
    minHeight: 100,
    borderRadius: 30,
    marginBottom: 10,
    padding: 10,
  },
  activeBtnContainer: {
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "#a0f2e5",
    width: "95%",
    height: "25%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledBtnContainer: {
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "#db6e6e",
    width: "95%",
    height: "25%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  image: {
    width: 130,
    height: 100,
    alignSelf: "center",
  },
  modalContainer: {
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "black",
  },
  input: {
    height: "10%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    width: "80%",
    color: "white",
  },
  message: {
    minHeight: "21%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    width: "80%",
    color: "white",
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  messageContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageTextContainer: {
    width: "80%",
    // backgroundColor: "red",
  },
  messageButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    // backgroundColor: "pink",
  },
  addItemButton: {
    backgroundColor: "red",
    width: "40%",
    position: "absolute",
    bottom: 10,
    height: "5%",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  plusIcon: {
    width: 22,
    height: 22,
  },
  editorModal: {
    width: "85%",
    backgroundColor: "grey",
    position: "absolute",
    left: "7%",
    top: "50%",
    height: "12%",
    justifyContent: "space-evenly",
  },
  editButton: {
    height: "50%",
    justifyContent: "center",
  },
  deleteButton: {
    height: "50%",
    justifyContent: "center",
  },
  editButtonText: {
    color: "white",
    paddingLeft: 15,
    fontSize: 20,
  },
  deleteButtonText: {
    color: "white",
    paddingLeft: 15,
    fontSize: 20,
  },
});
