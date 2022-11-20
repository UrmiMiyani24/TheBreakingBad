import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import {FONTS, COLORS} from '../constants';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import {Endpoints} from '../config/Server';
import * as Services from '../services/GenericService';
import { connect } from "react-redux";
import { updateFavourite, removeFavourite } from '../redux/actions/FavAction';

/**
 * @author Urmi
 * @function Search
 **/
const Search = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [characterList, setCharacterList] = useState([]);

  // Flatlist item
  const renderItem = ({item, index}) => {
    return <CharacterCard item={item} index={index} length={characterList.length} />;
  };

  // Render empty item
  const emptyItem = () => {
    if (search != '') {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[FONTS.largeTitle, styles.title]}>
            No character found
          </Text>
          <Text style={[FONTS.largeTitle, styles.subTitle]}>Try again</Text>
        </View>
      );
    } else {
      return <></>;
    }
  };

  //API call to search character
  const searchCharacters = searchKey => {
    setLoading(true);
    setCharacterList([]);
    setSearch(searchKey);

    let url = Endpoints.searchCharacter + searchKey;

    Services.getGenericService(url, '')
      .then(res => {
        if (res) {
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

  return (
    <View style={styles.container}>
      {/* Statusbar */}
      <StatusBar backgroundColor={COLORS.grey} barStyle="light-content" />
      {/* Loader */}
      <Loader loading={isLoading} />

      {/* Search header */}
      <View style={styles.searchHeader}>

        {/* Back icon */}
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={22} color={COLORS.white} />
        </TouchableWithoutFeedback>

        {/* Search Input */}
        <TextInput
          style={styles.searchText}
          autoFocus={true}
          value={search}
          placeholder='Search'
          placeholderTextColor={COLORS.grey2}
          selectionColor={COLORS.white}
          onChangeText={text => searchCharacters(text)}
        />

        {/* Close icon */}
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Icon
            name="close"
            size={22}
            color={COLORS.white}
            style={{position: 'absolute', right: 16}}
          />
        </TouchableWithoutFeedback>
      </View>

      {/* Character List */}
      <View style={{flex: 1}}>
        <FlatList
          data={characterList}
          renderItem={renderItem}
          keyExtractor={item => `${item.char_id}`}
          numColumns={2}
          contentContainerStyle={styles.list}
          ListEmptyComponent={emptyItem}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favList: state.favList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFavourite: (data) => dispatch(updateFavourite(data)),
    removeFavourite: (data) => dispatch(removeFavourite(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchHeader: {
    backgroundColor: COLORS.grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
  },
  searchText: {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: 'Roboto-Thin',
    marginLeft: 10,
    color: COLORS.white
  },
  emptyContainer: {
    alignSelf: 'flex-start',
    padding: 24,
    marginTop: 50,
  },
  title: {
    color: COLORS.primary,
  },
  subTitle: {
    color: COLORS.lightGray,
  },
});

