import axios from 'axios';
import { API_URL, API_KEY } from '@env';
import APIError from '../../utils/APIError';
import dayjs from 'dayjs';

export const fetchStock = async (symbol, date) => {
    try {
        let lt = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
        date = dayjs(date).format('YYYY-MM-DD');

        const response = await axios.get(`${API_URL}/stocks/${symbol}?gt=${date}&lt=${lt}`, {
            headers: {
                'x-api-key': API_KEY,
            }
        });
        return response.data;
    } catch (error) {
        throw new APIError({ message: error.message });
    }
}