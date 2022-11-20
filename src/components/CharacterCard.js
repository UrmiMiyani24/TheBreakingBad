import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FONTS, COLORS} from '../constants';
import { connect } from "react-redux";
import { updateFavourite, removeFavourite } from '../redux/actions/FavAction';

/**
 * @author Urmi
 * @function CharacterCard
 **/
const CharacterCard = props => {
  const {item, onItemPress, index, length} = props;
  const alignment = length % 2 == 0 ? {alignItems: 'center'} : {alignItems: 'flex-start', marginLeft: 16};

  // To check if it is in favourite list
  const checkFavourite = (id) => {
    return props.favList.some(item => item.char_id == id)
  }
  return (
    <TouchableWithoutFeedback onPress={onItemPress}>
      <View style={[styles.itemContainer, alignment]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item.img}} />
        </View>

        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={[FONTS.h1, styles.name]}>{item.name}</Text>
          <Text numberOfLines={1} style={[FONTS.h2, styles.nickname]}>{item.nickname}</Text>

          {checkFavourite(item.char_id) ? (
            <TouchableWithoutFeedback onPress={() => props.removeFavourite(item)}>
              <Icon
                name="heart"
                size={22}
                color={COLORS.primary}
                style={{position: 'absolute', right: 0, top: 0}}
              />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => props.updateFavourite(item)}>
              <Icon
                name="heart-o"
                size={22}
                color={COLORS.grey1}
                style={{position: 'absolute', right: 0, top: 0}}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispatchToProps)(CharacterCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  imageContainer: {
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
  name: {
    width: '80%',
    fontWeight: '700',
  },
  nickname: {
    width: '80%',
    fontWeight: '300',
  },
});


