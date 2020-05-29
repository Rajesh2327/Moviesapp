import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon} from 'react-native-elements';
import Profile from './Profile';
import Cart from './Cart';
import Setting from './Setting';
const numColumns = 3;
const WIDTH = Dimensions.get('window').width;
class Movies extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getDataFromAPI();
  }
  getDataFromAPI = async () => {
    const endpoint = 'https://api.androidhive.info/json/movies_2017.json';
    const res = await fetch(endpoint);
    const data = await res.json();
    this.setState({items: data});
  };
  _renderItem = ({item, index}) => {
    let {cardText, cardImage, card} = styles;
    return (
      <TouchableOpacity
        onPress={() => alert(item.title + '\n' + item.price)}
        style={card}>
        <Image source={{uri: item.image}} style={cardImage} />
        <Text>{item.title}</Text>
        <Text style={cardText}>{item.price}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    let {container, loader, header, desc, screentext} = styles;
    let {items} = this.state;
    if (items.length === 0) {
      return (
        <View style={loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View>
        <View style={header}>
          <Text style={desc}>Shop</Text>
        </View>
        <Text style={screentext}>New Release Movies</Text>
        <FlatList
          style={container}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

const TabNavigator = createMaterialBottomTabNavigator({
  Home: {
    screen: Movies,
    navigationOptions: {
      tabBarLabel: 'Movies',
      activeColor: '#ff0000',
      inactiveColor: '#000000',
      barStyle: {backgroundColor: '#67baf6'},
      tabBarIcon: () => (
        <View>
          <Icon name={'movie'} size={25} style={{color: '#ff0000'}} />
        </View>
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'profile',
      activeColor: '#ff0000',
      inactiveColor: '#000000',
      barStyle: {backgroundColor: '#67baf6'},
      tabBarIcon: () => (
        <View>
          <Icon name={'person'} size={25} style={{color: '#ff0000'}} />
        </View>
      ),
    },
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: 'Cart',
      activeColor: '#ff0000',
      inactiveColor: '#000000',
      barStyle: {backgroundColor: '#67baf6'},
      tabBarIcon: () => (
        <View>
          <Icon
            name={'add-shopping-cart'}
            size={25}
            style={{color: '#ff0000'}}
          />
        </View>
      ),
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: 'Setting',
      activeColor: '#ff0000',
      inactiveColor: '#000000',
      barStyle: {backgroundColor: '#67baf6'},
      tabBarIcon: () => (
        <View>
          <Icon name={'settings'} size={25} style={{color: '#ff0000'}} />
        </View>
      ),
    },
  },
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 10,
  },
  cardText: {
    fontSize: 16,

    marginBottom: 30,
  },

  cardImage: {
    height: '100%',
    width: '100%',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    flex: 1,
    margin: 15,
    marginBottom: 30,
    paddingBottom: 12,
    height: WIDTH / numColumns,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#67baf6',
  },
  desc: {
    color: '#fff',
    fontSize: 25,
    marginLeft: 10,
  },
  screentext: {
    fontSize: 20,
    paddingTop: 5,
  },
});

export default createAppContainer(TabNavigator);
