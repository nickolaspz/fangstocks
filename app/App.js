import moment from 'moment';
import Table from './components/Table';
import { StatusBar } from 'expo-status-bar';
import { sortDiff } from './utils/functions';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { fetchStock } from './services/api-connector/functions';

const STOCK_WATCH_LIST = ['FB', 'AMZN', 'NFLX', 'GOOG'];

export default function App() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [chosenDate, setChosenDate] = useState(null);

	const onDateChange = (date) => {
		setLoading(true);
		setChosenDate(date.format('YYYY-MM-DD'));
	}

	const loadData = async () => {
		let data = [];
		for (const stock of STOCK_WATCH_LIST) {
			const response = await fetchStock(stock, chosenDate);
			response?.[0] && data.push(response?.[0]);
		}

		setItems(sortDiff(data));
		setLoading(false);
	}

	useEffect(() => {
		if (!chosenDate) return;

		loadData();
	}, [chosenDate]);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				FANG stocks
				<br />
				{chosenDate
					&& (
						<Text> for {moment(chosenDate).format('Do MMM YYYY')}</Text>
					)
				}
			</Text>
			<View style={styles.calendar}>
				<CalendarPicker
					maxDate={new Date()}
					height={375}
					onDateChange={onDateChange}
				/>
			</View>
			{chosenDate
				&& (
					<Table data={items} isLoading={loading} setItems={setItems} />
				)
			}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'top',
	},
	header: {
		padding: '20px',
		fontSize: '30px',
		fontWeight: 'bold',
		fontFamily: 'sans-serif',
		textAlign: 'center',
	},
	calendar: {
		backgroundColor: '#FFFFFF',
		marginTop: 50,
		marginBottom: 50,
		alignSelf: 'stretch'
	}
});
