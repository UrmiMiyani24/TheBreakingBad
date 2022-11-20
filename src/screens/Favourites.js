import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, } from 'react-native'
import { connect } from "react-redux";
import { updateFavourite } from '../redux/actions/FavAction';
import {FONTS, COLORS} from '../constants';
import CharacterCard from '../components/CharacterCard';
import Icon from 'react-native-vector-icons/Ionicons';

/**
* @author Urmi
* @function Favourites
**/
const Favourites = (props) => {

  // Flatlist item
  const renderItem = ({item, index}) => {
    return (
      <CharacterCard 
        item={item} 
        index={index} 
        length={props.favList.length}
        />
    );
  };

  // Render empty item
  const emptyItem = () => {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[FONTS.largeTitle, styles.title]}>
            No Favourite Added
          </Text>
        </View>
      );
    
  };

 return(
  <View style={styles.container}>

    {/* Favourite header */}
    <View style={styles.header}>

    {/* Title */}
    <Text style={[FONTS.title, styles.title]}>Favourites</Text>

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

    <FlatList
      data={props.favList}
      renderItem={renderItem}
      keyExtractor={item => `${item.char_id}`}
      numColumns={2}
      contentContainerStyle={styles.list}
      ListEmptyComponent={emptyItem}
    />
  </View>
  )
}

const mapStateToProps = (state) => {
  return {
    favList: state.favList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFavourite: (data) => dispatch(updateFavourite(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'black'
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
})
