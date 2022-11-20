import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {FONTS, COLORS} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {updateFavourite, removeFavourite} from '../redux/actions/FavAction';
import LinearGradient from 'react-native-linear-gradient';

/**
 * @author Urmi
 * @function Detail
 **/
const Detail = props => {
  const [item, setItem] = useState(null);
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    setItem(props.route.params.item);
    let array = props.route.params.list;
    let index = array.indexOf(props.route.params.item);
    if (index != -1) {
      array.splice(index, 1);
    }
    setCharacterList(array);
  }, []);

  const checkFavourite = id => {
    return props.favList.some(i => i.char_id == id);
  };

  // Flatlist item
  const renderItem = ({item, index}) => {
    return (
      <Text style={[FONTS.h2, styles.value, styles.season]}>Season {item}</Text>
    );
  };

  //Flatlist other charcter item
  const renderCharacterItem = ({item, index}) => {
    return (
      <View style={[styles.itemContainer]}>
        <View style={styles.itemImageContainer}>
          <Image style={styles.image} source={{uri: item.img}} />
        </View>

        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={[FONTS.h1, styles.name]}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={[FONTS.h2, styles.nickname]}>
            {item.nickname}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header start */}
      <ImageBackground
        source={{uri: item?.img}}
        resizeMode="cover"
        style={styles.imagebg}>
        <LinearGradient
          colors={['#FC000000', '#000000']}
          style={{height: '100%', width: '100%', position: 'absolute', top: 0}}
        />
        <View style={{justifyContent: 'center', width: '100%'}}>
          {/* Back icon */}
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={25}
              color={COLORS.white}
              style={{position: 'absolute', left: 20, top: 12}}
            />
          </TouchableWithoutFeedback>

          {checkFavourite(item?.char_id) ? (
            <FontAwesome
              name="heart"
              size={25}
              color={COLORS.primary}
              style={{position: 'absolute', right: 20, top: 12}}
            />
          ) : (
            <FontAwesome
              name="heart-o"
              size={25}
              color={COLORS.grey1}
              style={{position: 'absolute', right: 20, top: 12}}
            />
          )}
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: item?.img}} />
          </View>

          {/* Header name, nickname, status*/}
          <View style={styles.nameContainerHeader}>
            <Text
              numberOfLines={1}
              style={[FONTS.largeTitleDark, styles.nameHeader]}>
              {item?.name}
            </Text>
            <Text numberOfLines={1} style={[FONTS.h2, styles.nicknameHeader]}>
              {item?.nickname}
            </Text>
            <Text numberOfLines={1} style={[FONTS.h3, styles.status]}>
              {item?.status}
            </Text>
          </View>
        </View>
      </ImageBackground>
      {/* Header End */}

      {/* Potrayed and DOB */}
      <View style={styles.potrayedContainer}>
        <View>
          <Text style={[FONTS.h3, styles.label]}>Potrayed</Text>
          <Text style={[FONTS.h2, styles.value]}>{item?.portrayed}</Text>
        </View>

        <View style={styles.dobContainer}>
          <Text style={[FONTS.h2, styles.value]}>{item?.birthday}</Text>
          <Feather
            name="gift"
            size={13}
            color={COLORS.white}
            style={{marginLeft: 10}}
          />
        </View>
      </View>

      {/* Occupation */}
      <View style={styles.occupationContainer}>
        <Text style={[FONTS.h3, styles.label]}>Occupation</Text>

        {item?.occupation.map(data => (
          <Text style={[FONTS.h2, styles.value]}>{data}</Text>
        ))}
      </View>

      {/* Appeared in */}
      <View style={styles.occupationContainer}>
        <Text style={[FONTS.h3, styles.label]}>Appeared in</Text>

        <View style={styles.seasonContainer}>
          <FlatList
            horizontal
            data={item?.appearance}
            renderItem={renderItem}
            keyExtractor={item => `Season${item}`}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>

      {/* Other Characters */}
      <View style={styles.otherContainer}>
        <Text numberOfLines={1} style={[FONTS.largeTitle, styles.nameHeader]}>
          Other characters
        </Text>
        <FlatList
          horizontal
          data={characterList}
          renderItem={renderCharacterItem}
          keyExtractor={item => `${item.char_id}`}
          contentContainerStyle={styles.characterList}
        />
      </View>
    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
    paddingTop: '35%',
    marginBottom: 20,
  },
  imagebg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 150,
    borderRadius: 4,
  },
  nameContainerHeader: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  nameHeader: {
    color: COLORS.white,
    fontWeight: '700',
  },
  nicknameHeader: {
    fontWeight: '300',
  },
  status: {
    color: COLORS.red,
    lineHeight: 20,
  },
  label: {
    color: COLORS.primary,
  },
  value: {
    marginTop: 4,
  },
  potrayedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 23,
  },
  dobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  occupationContainer: {
    flexDirection: 'column',
    marginTop: 30,
    marginVertical: 2,
    paddingHorizontal: 23,
  },
  seasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  season: {
    backgroundColor: COLORS.grey,
    borderRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 4,
  },
  list: {
    marginTop: 10,
  },
  otherContainer: {
    flexDirection: 'column',
    marginTop: 30,
    paddingHorizontal: 23,
  },
  characterList: {
    marginTop: 30,
    marginBottom: 40,
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 50,
  },
  itemImageContainer: {
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 150,
    borderRadius: 4,
  },
  nameContainer: {
    flexDirection: 'column',
    width: 150,
  },
});
