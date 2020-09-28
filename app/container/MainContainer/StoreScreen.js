import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Keyboard, Image, Linking, ScrollView } from 'react-native';
import BottomBar from '../../common/BottomBar';
import Header from '../../common/Header';
import { smartScale, WINDOW } from '../../utils/AppUtils';
import withLoader from '../../redux/actionCreator/withLoader';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../theme/index';
import Colors from '../../theme/Colors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Picker from 'react-native-picker';
import AppImages from '../../assets/images/index';

const dropDown_Data = [
    {
        title: 'Baseball',
        icon_img: AppImages.baseball,
        item_img: [
            {

                image: AppImages.product_baseball,
                img_title: 'Baseball',
                product_link: 'https://www.amazon.in/BELCO-SPORTS-Meteor-Competition-Baseball/dp/B07QVKH69B/ref=sr_1_3?dchild=1&keywords=baseball&qid=1599828488&sr=8-3',
            },
            {
                img_title: 'Bat',
                image: AppImages.product_bat,
                product_link: 'https://www.amazon.in/Neulife-Wooden-Baseball-bat-Heavy/dp/B07VB74WNV?ref_=Oct_s9_apbd_orecs_hd_bw_b3iLF3H&pf_rd_r=RQZE3D42ENW3AGS44K1E&pf_rd_p=fce2177a-1619-5da0-8ec9-8779449d268d&pf_rd_s=merchandised-search-10&pf_rd_t=BROWSE&pf_rd_i=3403620031',
            },
        ]
    },
    {
        title: 'Basketball',
        icon_img: AppImages.basketball,
        item_img: [
            {

                image: AppImages.product_basketball,
                img_title: 'Basketball',
                product_link: 'https://www.amazon.in/Spalding-NBA-Rebound-Basketball-Size-7/dp/B00I99K8Q0/ref=sr_1_4?crid=1FR7LSOOD1QR0&dchild=1&keywords=basketball&qid=1595934866&sprefix=baske%2Caps%2C982&sr=8-4',
            },
            {
                img_title: 'Net',
                image: AppImages.product_net,
                product_link: 'https://www.amazon.in/Elk-Power-Professional-Basketball-Ring/dp/B07PFQXG9L/ref=sr_1_8?crid=2NRQ6GY62MRXK&dchild=1&keywords=basketball+net&qid=1599828577&sprefix=basket%2Caps%2C295&sr=8-8',
            },
        ]
    },
    {
        title: 'Swimming',
        icon_img: AppImages.swimming,
    },
    {
        title: 'Batminton',
        icon_img: AppImages.batminton,
    },
    {
        title: 'Test skill',
        icon_img: AppImages.testskill,
    },
    {
        title: 'Soccer',
        icon_img: AppImages.soccor
    }
]

class StoreScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skillMap: [],
            selectedSkillMap: '',
            selectedSkillMapImg: '',
            storeData: [],
        };
    }

    componentDidMount() {
        var tempArr = dropDown_Data;
        console.log('skillmap-----> ', tempArr);
        this.setState({
            skillMap: tempArr,
            selectedSkillMap: tempArr[0].title,
            selectedSkillMapImg: tempArr[0].icon_img
        });
        this.getStoredItems()
    }

    getStoredItems() {
        const { selectedSkillMap, skillMap, selectedSkillMapImg, storeData } = this.state;
        const { loader } = this.props;
        loader(true);
        var tempSkillId = '';
        console.log('try--->', skillMap)
        console.log('try222--->', selectedSkillMap)
        skillMap.forEach((element) => {
            if (element.title === selectedSkillMap) {
                this.setState({
                    selectedSkillMapImg: element.icon_img
                });
            }
        });
        loader(false);
        this.setState({
            storeData: skillMap,
        })
    }

    onSkillMapClick() {
        let data = [];
        let tempSelectedValue = this.state.selectedSkillMap;
        this.state.skillMap.forEach((element) => {
            data.push(element.title);
        });
        console.log('item===>', data)
        Picker.init({
            pickerData: data,
            selectedValue: [tempSelectedValue],
            pickerConfirmBtnText: 'Confirm',
            pickerCancelBtnText: 'Cancel',
            pickerTitleText: '',
            pickerConfirmBtnColor: [62, 62, 62, 1],
            pickerCancelBtnColor: [62, 62, 62, 1],
            onPickerConfirm: (data) => {
                console.log('Confirm-->', data);
                this.setState({
                    selectedSkillMap: data.toString(),
                });
                this.getStoredItems();
            },
            onPickerCancel: (data) => {
                console.log('Cancel-->', data);
            },
            onPickerSelect: (data) => {
                console.log('Select-->', data);
            },
        });
        Picker.show();
    }

    onStoreItemClick(product_link) {
        Linking.canOpenURL(product_link).then((supported) => {
            if (supported) {
                Linking.openURL(product_link);
            } else {
                console.log("Don't know how to open URI: " + product_link);
            }
        });
    }

    renderProduct = (val, selectedSkillMap) => (
        <View>
            {(val.title === selectedSkillMap) ? (
                val.item_img && val.item_img.length > 0 ?
                    (
                        <FlatList
                            numColumns={2}
                            // nestedScrollEnabled={true}
                            data={val.item_img}
                            // ItemSeparatorComponent={() => <View style={{ backgroundColor: 'red', }}></View>}
                            contentContainerStyle={{ alignItems: 'center' }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={((item, index) => {
                                // const { item } = item
                                // console.log('item======>', item.item)
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={newstyles.flatlist}
                                        onPress={() => this.onStoreItemClick(item.item.product_link)}>
                                        <Image source={item.item.image} resizeMode='contain' style={newstyles.productImgStyle}></Image>
                                        <Text style={newstyles.stoleText}>{item.item.img_title}</Text>
                                    </TouchableOpacity>

                                )
                            })}
                        ></FlatList>
                    ) : (<Text style={newstyles.noItemAvail}>No items available</Text>)
            ) : null}
        </View>
    )

    render() {
        const { selectedSkillMap, selectedSkillMapImg, storeData, skillMap } = this.state
        const { loader } = this.props
        loader(false);
        return (
            <View style={{ flex: 1 }}>
                <Header></Header>
                <View style={[newstyles.buttonViewStyle, { marginHorizontal: smartScale(2), marginTop: smartScale(1.4) }]}>
                    <TouchableOpacity>
                        <Icon name='shop' size={smartScale(6)}></Icon>
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.SectionTextStyle, { marginStart: smartScale(1) }]}>
                            {'store'}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={newstyles.skillContainer}
                    onPress={() => { this.onSkillMapClick() }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={selectedSkillMapImg} style={{
                            height: smartScale(4),
                            width: smartScale(4),
                            marginEnd: smartScale(1),
                            // backgroundColor: Colors.black
                        }} resizeMode='contain'></Image>
                        <Text style={newstyles.soccer1}>{selectedSkillMap}</Text>
                    </View>
                    <EntypoIcon name='chevron-with-circle-down' size={smartScale(2.5)} color={Colors.white}></EntypoIcon>
                </TouchableOpacity>
                <View>
                    {
                        storeData.map(val => {
                            return (
                                this.renderProduct(val, selectedSkillMap)
                            )
                        })
                    }
                </View>
                <BottomBar></BottomBar>
            </View >
        )
    }
}

export default connect(null, {})(withLoader(StoreScreen));

const newstyles = StyleSheet.create({
    buttonViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    skillContainer: {
        marginHorizontal: smartScale(2),
        borderRadius: smartScale(0.5),
        paddingHorizontal: smartScale(1.2),
        paddingVertical: smartScale(1.4),
        marginTop: smartScale(1.7),
        backgroundColor: Colors.blue168AE9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    soccer1: {
        fontSize: smartScale(2.5),
        color: Colors.white
    },
    flatlist: {
        paddingHorizontal: smartScale(2),
        paddingVertical: smartScale(1.5),
        marginTop: smartScale(2.5),
        // marginHorizontal: smartScale(3),
        backgroundColor: Colors.skillSectionColor,
    },
    productImgStyle: {
        height: smartScale(22),
        width: smartScale(22),
        // justifyContent: 'space-between'
    },
    stoleText: {
        fontFamily: 'audiowide-regular',
        textAlign: 'center',
        paddingTop: smartScale(1.5),
        fontSize: smartScale(2),
        // color: Colors.black,
        // backgroundColor: 'yellow'
    },
    noItemAvail: {
        fontFamily: 'audiowide-regular',
        fontSize: smartScale(2.5),
        textAlign: 'center',
        marginTop: smartScale(15)
    }
})