import React, { Component } from "react";
import { sortDiff } from "../utils/functions";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'ASC',
        };
    }

    sortByDifference(items) {
        const direction = this.state.order === 'ASC' ? 'DESC' : 'ASC';
        
        const sorted = sortDiff(items, direction);

        this.props.setItems(sorted);
        this.setState({ order: direction });
    }

    renderRow(item, index) {
        const negative = item.open - item.close < 0;
        const diff = 
            negative 
                ? <Text style={styles.negative}>(${Math.round(item.open - item.close)})</Text> 
                : <Text style={styles.positive}>${Math.round(item.open - item.close)}</Text>;

        return (
            <View key={index} style={styles.tr}>
                <Text style={styles.td}>{item.symbol}</Text>
                <Text style={styles.td}>${Math.round(item.open)}</Text>
                <Text style={styles.td}>${Math.round(item.close)}</Text>
                <Text style={styles.td}>{diff}</Text>
                <Text style={styles.td}>{item.exchange}</Text>
                <Text style={styles.td}></Text>
            </View>
        );
    }

    render() {
        const { data, isLoading } = this.props;

        if (data.length === 0 && !isLoading) {
            return (
                <Text>Data currently unavailable.</Text>
            );
        }

        let content;
        if (isLoading) {
            content = (
                <ActivityIndicator size="large" />
            );
        } else {
            content = (
                <>
                    <View style={styles.tr}>
                        <Text style={styles.th}>Symbol</Text>
                        <Text style={styles.th}>Open</Text>
                        <Text style={styles.th}>Close</Text>
                        <Text style={styles.th}>Diff</Text>
                        <Text style={styles.th}>Exchange</Text>
                        <Text style={styles.th} onClick={() => this.sortByDifference(data) }>
                            {this.state.order === 'ASC' ? '↑' : '↓'}
                        </Text>
                    </View>
                    {
                        data.map((item, index) => {
                            return this.renderRow(item, index);
                        })
                    }
                </>
            )
        }

        return content;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'stretch',
        margin: 'auto',
        minWidth: '350px',
    },
    tr: { 
        flex: 1, 
        alignSelf: 'stretch', 
        flexDirection: 'row',
        height: '15px',
    },
    th: {
        flex: 1,
        fontSize: '3.5vw',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: '15px',
    },
    td: { 
        flex: 1, 
        fontSize: '3.5vw',
        alignSelf: 'stretch',
        width: '100px',
        textAlign: 'center',
        padding: '15px',
    },
    negative: {
        color: 'red',
        fontWeight: 'bold',
    },
    positive: {
        color: 'green',
        fontWeight: 'bold',
    }
});
