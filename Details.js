import React from 'react';
import {FlatList, StatusBar, Text, TextInput, TouchableOpacity, View, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
    boxx: {
        flexDirection: 'column',
        padding:'auto',
        marginTop: '7',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        justifyContent: 'space-around',
    },
    titleStyle: {
        fontSize: 33,
        marginLeft: 7,
        fontWeight: 'bold',
        fontFamily: 'Gill Sans',
        textAlign: 'center'
    },
    textStyle: {
        fontSize: 22,
        marginLeft: 7,
        color: 'white',
        fontFamily: 'Gill Sans',
        fontWeight: '700',
        marginBottom: '6'
    },
});

const Details = ({navigation, route}) => {

    const background = () => {
        if (route.params.lineEN === "North South Line") {
            return ([styles.box, {backgroundColor: 'indianred',}])
        }
        if (route.params.lineEN === "East West Line") {
            return ([styles.box, {backgroundColor: 'mediumseagreen',}])
        }
        if (route.params.lineEN === "Circle Line") {
            return ([styles.boxx, {backgroundColor: 'darkorange', marginBottom: 6}])
        }
    }

    return (
        <View style={{backgroundColor: 'mintcream'}}>
            <View style={background()}>
                <Text style={[styles.titleStyle, {paddingTop: 3, color: 'white'}]}>{route.params.code}</Text>
                {/*<Text style={styles.textStyle}>Name: </Text>*/}
                {/*<Text style={[styles.textStyle, {textAlign: 'right'}]}>{route.params.nameEN}</Text>*/}
                <Text style={styles.textStyle}>Name: {route.params.nameEN}</Text>
                <Text style={styles.textStyle}>Chinese Name: {route.params.nameCN}</Text>
                <Text style={styles.textStyle}>Line: {route.params.lineEN}</Text>
                <Text style={[styles.textStyle, {marginBottom: 6}]}>Line in Chinese: {route.params.lineCN}</Text>
            </View>
            <Button title={'Back'} onPress={() => navigation.navigate('Home')}/>
        </View>
    );
};

export default Details;
