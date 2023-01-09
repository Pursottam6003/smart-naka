import React from "react";
import { Image, ScrollView, View } from 'react-native';
import { Text, Button, Appbar } from "react-native-paper";
import { Logo } from "../components/Logo";
import { Layout } from "../components/Layout";

const Home = () => {
    return (
        <Layout pageTitle='Assam Police Smart Naka'>
            <View style={{}}>
                <Logo />
                <Text variant="displaySamll">
                    Scan any vehicle at Naka and check
                    if it is in the stolen vehicles database
                </Text>

                <Button dark={true} onPress={() => { }} >
                    Go
                </Button>
            </View>
        </Layout>
    );
}

const History = () => {
    return (
        <Layout pageTitle='History'>
            <ScrollView>
                <Text>Previous scans will go here...</Text>
            </ScrollView>
        </Layout>
    );
}

export { Home, History }