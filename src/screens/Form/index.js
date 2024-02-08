import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {addPost} from '../../utils/fetchData';
import {BLACK, PURPLE} from '../../themes/colors';
import {Header} from '../../components/Header';
import CommanTextInput from '../../components/CommanTextInput';
import CustomTextInput from '../../components/CommanTextInput';

const Form = ({navigation, route}) => {
  const { updateData} = route.params;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleAddData = () => {
    const postData = {
      email: email,
      name: name,
    };

    addPost(postData)
      .then(response => {
        console.log('Post added successfully:', response);
        Alert.alert('Success', 'User added successfully');
        updateData(response);
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });

    navigation.goBack();
  };

  return (
    <>
      <Header title={'Form'} isLeft />
      <View style={styles.container}>
      <CustomTextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomTextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddData}>
          <Text>Add User</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PURPLE,
    paddingHorizontal : 30
  },
  input: {
    borderWidth: 2,
    borderColor: BLACK,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    marginVertical : 20
  },
  button: {
    backgroundColor: BLACK,
    padding: 10,
    paddingHorizontal : 20,
    borderRadius: 20,
    marginTop : 50
  },
});

export default Form;
