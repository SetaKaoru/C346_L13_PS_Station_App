import React,{useState, useEffect} from 'react';
import {FlatList, StatusBar, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";

let originalData = []

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        padding:'auto',
        marginTop: '7',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
    },
    header:{
        textAlign:'center',
        fontWeight:'600',
        fontSize: 30,
        marginBottom: 10,
        backgroundColor: 'crimson',
        color:'white',
    },
    titleStyle: {
        fontSize: 25,
        marginLeft: 7,
        fontWeight: '500'
    },
    textStyle: {
        fontSize: 19,
        marginLeft: 7,
        color: 'white',
    },
});

const App = ({navigation, route}) => {
    const [mydata, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://data.gov.sg/api/action/datastore_search?resource_id=d_d312a5b127e1ae74299b8ae664cedd4e").then((response) => {
            return response.json();
        }).then((myJson)=>{
            if(originalData.length < 1){
                setMyData(myJson);
                originalData = myJson.result.records;
            }
            setMyData(originalData);
        })
    }, []);

    const FilterData = (text) => {
        if (text != ' '){
            let myFilteredData = originalData.filter((item) =>
                item.mrt_station_english.toLowerCase().includes(text));
            setMyData(myFilteredData);
        }
        else{
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {

        const background = () => {
            if (item.mrt_line_english === "North South Line") {
                return ([styles.box, {backgroundColor: 'indianred',}])
            }
            if (item.mrt_line_english === "East West Line") {
                return ([styles.box, {backgroundColor: 'mediumseagreen',}])
            }
            if (item.mrt_line_english === "Circle Line") {
                return ([styles.box, {backgroundColor: 'darkorange',}])
            }
        }

        return (
            <View>
                <TouchableOpacity style={background()} onPress={() => navigation.navigate('Details', {
                    index: index,
                    code: item.stn_code,
                    nameEN: item.mrt_station_english,
                    lineEN: item.mrt_line_english,
                    nameCN: item.mrt_station_chinese,
                    lineCN: item.mrt_line_chinese
                })}>
                    <Text style={[styles.titleStyle, {paddingTop: 3, color: 'white'}]}>{item.stn_code}</Text>
                    <Text style={styles.textStyle}>Name: {item.mrt_station_english}</Text>
                    <Text style={styles.textStyle}>Line: {item.mrt_line_english}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{backgroundColor: 'mintcream'}}>
            <StatusBar/>
            <Text style={styles.header}>MRT Stations <Icon name="train-subway" size={30} color="white" /></Text>
            <Text style={{marginLeft: 5, fontSize: 18, fontWeight: 500, }}>Search:</Text>
            <TextInput style={{borderWidth:1, marginLeft: 5, marginRight: 5, backgroundColor: 'white', marginBottom: 10,}} onChangeText={(text)=>{FilterData(text)}}/>
            <FlatList data={mydata} renderItem={renderItem}/>
        </View>
    );
}

export default App;
