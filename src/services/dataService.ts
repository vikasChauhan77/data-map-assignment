import axios from 'axios';
import type { nodeDataType } from '@/types';
const url = "http://localhost:3000/data";

export async function getData(): Promise<nodeDataType[]> {
    const response = await axios.get(url);
    return response.data as nodeDataType[];
};