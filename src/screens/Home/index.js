import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList, ActivityIndicator} from 'react-native';
import {Header} from '../../components/Header';
import {SvgXml} from 'react-native-svg';
import * as Icons from '../../constants/svg';
import {SCREENS} from '../../constants/screens';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/scalingUtils';
import {addPost, fetchPosts} from '../../utils/fetchData';
import * as Colors from '../../themes/colors';
import * as Fonts from '../../themes/fonts';
import axios from 'axios';

const Home = props => {
  const {navigation} = props;
  const [data, setData] = useState();
  const [loading , setLoading] = useState(true)
  const fetchData = async () => {
    try {
      const response = await fetchPosts();
      setData(response);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  const updateData = newData => {
    console.log(newData , 'newdata');
    setData(prevData => [...prevData, newData]);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(SCREENS.QUIZ, {
            category: item?.title,
            selectNumber: item?.id,
          })
        }>
        <View style={styles.textView}>
          <Text style={styles.text}>name  {item?.name}</Text>
          <Text style={styles.subText}>email  {item?.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <ActivityIndicator size="large" color={Colors.PURPLE} />
      </View>
    );
  }
  return (
    <>
      <Header title={'HOME'} isLeft />
      <View style={styles.container}>
   
      <FlatList
      ListFooterComponent={<>
         <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(SCREENS.FORM, { fetchData: fetchData, updateData: updateData })
        
        }>
        <Text>Add User</Text>
      </TouchableOpacity>
      </>}
      
        keyExtractor={(item, index) => index}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
    </>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PURPLE,
    paddingVertical : 20
  },
  card: {
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    backgroundColor: Colors.LIGHT_BLUE,
    borderRadius: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(1),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    marginVertical: responsiveHeight(0.5),
  },
  text: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    fontFamily: Fonts.DMSANS_BOLD,
    color: Colors.PURPLE,
  },
  subText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
    color: Colors.LIGHT_BLACK,
    marginTop: responsiveHeight(1),
  },
  button: {
    backgroundColor: Colors.BLACK,
    padding: 20,
    borderRadius: 25,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
});

export default Home;
