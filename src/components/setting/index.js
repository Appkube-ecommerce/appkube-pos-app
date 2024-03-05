import React from 'react'
import { Text, View, Button,TouchableOpacity } from 'react-native';
import styles from './styles';
import {Ionicons,AntDesign,FontAwesome5 } from "@expo/vector-icons";
// import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const setting = () => {

    const navigation = useNavigation();

  const navigateToCustomer = () => {
    navigation.navigate('Customers');
  };

  const navigateToPrint = () => {
    navigation.navigate('PrintToA4');
  };

    const Customer = () => (
        <View>
          <TouchableOpacity style={[styles.flexRow, styles.box,styles.bgLight,styles.gap]} onPress={navigateToCustomer} >
            <View style={[styles.flexRow]}  >
                <Ionicons name="ios-person" size={20} color="black" />
                <Text>Customer</Text>
            </View>
            <AntDesign name="rightcircleo" size={24} color="black" />

          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.box,styles.bgLight,styles.gap]} onPress={navigateToPrint} >
            <View style={[styles.flexRow]}  >
            <FontAwesome5 name="print" size={22} color="black" />
                <Text>Print</Text>
            </View>
            <AntDesign name="rightcircleo" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.box,styles.bgLight,styles.gap]} onPress={() => navigation.navigate('ImportProducts')} >
            <View style={[styles.flexRow]}  >
            <FontAwesome5 name="print" size={22} color="black" />
                <Text>Import Products</Text>
            </View>
            <AntDesign name="rightcircleo" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.box,styles.bgLight,styles.gap]} onPress={() => navigation.navigate('ThermalPrinterComponent')} >
            <View style={[styles.flexRow]}  >
            <FontAwesome5 name="print" size={22} color="black" />
                <Text>Import Products</Text>
            </View>
            <AntDesign name="rightcircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    

  return (
   <View>
    <Customer/>
   </View>
  )
}

export default setting