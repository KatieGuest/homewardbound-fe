import {
  Alert,
  AppRegistry,
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import Axios from "axios";
import React, { Component } from "react";

class LikedPetsScreen extends Component {
  static navigationOptions = {
    title: "Your liked pets"
  };
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  async getLikedPets() {
    try {
      let { data } = await Axios.get(
        "https://gh-homewardbound.herokuapp.com/api/pets/liked"
      );
      this.setState({ ...this.state, pets: data });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    await this.getLikedPets();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="Go home" onPress={() => navigate("Home")} />
        <ScrollView>
          <Text style={{ fontSize: 30 }}>Your liked pets</Text>
          {this.state.pets.map(pet => {
            return (
              <View key={pet.id} style={{ flex: 1 }}>
                <Image
                  source={{ uri: pet.imageUrl }}
                  style={{ flex: 8, height: 400 }}
                />
                <Text style={{ fontSize: 30, textAlign: "center" }}>
                  {pet.name}
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  {pet.breed}
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  {pet.age}
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  {pet.sex}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default LikedPetsScreen;
