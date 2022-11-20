import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Loader from '../components/Loader';
import {Endpoints} from '../config/Server';
import * as Services from '../services/GenericService';
import {COLORS, FONTS, SIZES} from '../constants';
import CharacterCard from '../components/CharacterCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {updateFavourite, removeFavourite} from '../redux/actions/FavAction';

/**
 * @author Urmi
 * @function Home
 **/
const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [characterList, setCharacterList] = useState([]);
  useEffect(() => {
    getAllCharacters();
  }, []);

  //API call to get all characters
  const getAllCharacters = () => {
    setLoading(true);

    let url = Endpoints.getAllCharacters;

    Services.getGenericService(url, '')
      .then(res => {
        if (res) {
          console.log(res);
          setCharacterList(res);
        } else {
        }
      })
      .catch(errMsg => {
        console.log('ERROR ', errMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <CharacterCard
        item={item}
        index={index}
        onItemPress={() =>
          navigation.navigate('Detail', {item: item, list: characterList})
        }
        length={characterList.length}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Loader */}
      <Loader loading={isLoading} />

      {/* Header start */}
      <View style={styles.header}>
        {/* Title */}
        <Text style={[FONTS.title, styles.title]}>The Breaking Bad</Text>

        <View style={styles.iconContainer}>
          {/* Search icon */}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Search')}>
            <Feather
              name="search"
              size={22}
              color={COLORS.white}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>

          {/* Favourite icon */}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Favourites')}>
            <Icon
              name="heart"
              size={22}
              color={COLORS.primary}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {/* Header End */}

      {/* Character List */}
      <View style={{flex: 1}}>
        <FlatList
          data={characterList}
          renderItem={renderItem}
          keyExtractor={item => `${item.char_id}`}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    favList: state.favList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFavourite: data => dispatch(updateFavourite(data)),
    removeFavourite: data => dispatch(removeFavourite(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  list: {
    // justifyContent: 'flex-start',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.white,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    paddingLeft: 20,
  },
});
