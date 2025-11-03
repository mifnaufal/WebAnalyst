import axios from 'axios';
import type { ParsedRequest } from '../utils/requestParser';

// URL Backend FastAPI
const BACKEND_URL = 'http://localhost:8000/api/analyze'; 

// Tipe data yang kita harapkan dari backend
interface BackendResponse {
    response: {
        status_code: number;
        headers: Record<string, string>;
        body: string;
    };
    recommendation: string;
}

/**
 * Mengirim request yang sudah diparse ke backend untuk diproxy dan dianalisis AI.
 */
export async function sendRequestToBackend(requestData: ParsedRequest): Promise<BackendResponse> {
    try {
        const response = await axios.post<BackendResponse>(BACKEND_URL, requestData);
        return response.data;
    } catch (error) {
        console.error("Error saat call backend:", error);
        // Buat respons error palsu agar UI tetap bisa menampilkannya
        return {
            response: {
                status_code: 500,
                headers: { 'Error': 'Backend connection failed' },
                body: error instanceof Error ? error.message : String(error)
            },
            recommendation: "Gagal terhubung ke server backend/proxy. Pastikan backend FastAPI berjalan."
        };
    }
}