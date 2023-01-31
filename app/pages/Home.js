import React, { useState } from "react";
import { View } from 'react-native';
import { Text, Button, Card } from "react-native-paper";
import { Logo } from "../components/Logo";
import { Layout } from "../components/Layout";

const Home = () => {
    return (
        <Layout pageTitle='Airavat Smart Guard'>
            <View style={{}}>
                <Logo />
                <Text variant="displaySamll">
                    Scan any vehicle at Entrance Gate & check
                    the vehicles details 
                </Text>
                <Button dark={true} onPress={() => { }} >
                    Go
                </Button>
            </View>
        </Layout>
    );
}

const History = () => {
    const [list, setList] = useState([
        {id: 'TN01AS9299', stolen: true},
        {id: 'HR26DK8337', stolen: false},
        {id: 'GJ18BC7451', stolen: true},
        {id: 'WB06J7158', stolen: false},
        {id: 'GBAS52RXZ', stolen: false},
        {id: '01CC1A001', stolen: false},
        {id: 'AP29AN0074', stolen: true},
        {id: 'DL14543', stolen: false},
        {id: 'MH21EE7598', stolen: false},
        {id: 'DDUBRI5', stolen: false},
        {id: 'INDGJ03ER0563', stolen: false},
        {id: 'IND567890', stolen: false},
        {id: '16B120556A', stolen: true},
        {id: 'KL65K765', stolen: false},
        {id: 'MH20DV2363', stolen: false},
        {id: 'IND22BH6517A', stolen: false},
        {id: 'TN63DB5481', stolen: false}
    ])

    return (
        <Layout pageTitle='History'>
            {list.map(s => (
                <Card mode="elevated" elevation={1} style={{marginBottom: 8}} key={s.id}>
                    <Card.Title title={`License plate: ${s.id}`} />
                    <Card.Content>
                        {s.stolen && (
                            <Text variant="bodySmall" style={{ color: 'red' }}>Stolen</Text>
                        )}
                        {!s.stolen && (
                            <Text variant="bodySmall">Not stolen</Text>
                        )}
                    </Card.Content>
                </Card>
            ))}
            {!list && (
                <Text>Previous scans goes here...</Text>
            )}
        </Layout>
    );
}

export { Home, History }