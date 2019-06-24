import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  Image,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import Axios from "axios";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LikedPetsScreen from "./LikedPetsScreen";

//import DeviceInfo from "react-native-device-info";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Welcome"
  };
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      currentPetIndex: 0
      //deviceId: ""
    };
  }

  // getdeviceId = () => {
  //   const id = DeviceInfo.getUniqueID();
  //   this.setState({ ...this.state, deviceId: id });
  // };

  currentPet() {
    return this.state.pets[this.state.currentPetIndex] || {};
  }

  async getNewPets() {
    try {
      let { data } = await Axios.get(
        "https://gh-homewardbound.herokuapp.com/api/pets"
      );
      this.setState({ ...this.state, pets: data, currentPetIndex: 0 });
    } catch (error) {
      console.error(error);
    }
  }

  async decideOnPet(likedPet) {
    try {
      await Axios.post("https://gh-homewardbound.herokuapp.com/api/pets", {
        petId: this.currentPet().id,
        like: likedPet,
        //placeholder for deviceId
        userId: 2
      });
      this.setState({
        ...this.state,
        currentPetIndex: this.state.currentPetIndex + 1
      });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    await this.getNewPets();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="See My Liked Pets"
          onPress={() => navigate("LikedPets")}
        />

        <Image
          source={{ uri: this.currentPet().imageUrl }}
          style={{ flex: 8 }}
        />
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          {this.currentPet().name}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {this.currentPet().breed}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {this.currentPet().age}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {this.currentPet().sex}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch"
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => {
                this.decideOnPet(false);
              }}
              title="🐾"
              color="grey"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => {
                this.decideOnPet(true);
              }}
              title="❤️"
              color="green"
            />
          </View>
        </View>
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  LikedPets: { screen: LikedPetsScreen }
});

//AppRegistry.registerComponent("Homeward Bound", () => Main);
const App = createAppContainer(MainNavigator);
export default App;
