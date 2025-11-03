export interface ParsedRequest {
    method: string;
    url: string; // URL lengkap (misal: https://api.target.com/users)
    headers: Record<string, string>;
    body: string;
}

/**
 * Mengubah raw HTTP request string (format Burp Suite) menjadi objek terstruktur.
 */
export function parseRawRequest(rawRequest: string): ParsedRequest | null {
    const lines = rawRequest.trim().split('\n');
    if (lines.length === 0) return null;

    const requestLine = lines[0].trim().split(' ');
    if (requestLine.length < 3) return null;

    const method = requestLine[0].toUpperCase();
    const path = requestLine[1];

    const bodyIndex = lines.findIndex(line => line.trim() === '');
    const headerLines = bodyIndex > 0 ? lines.slice(1, bodyIndex) : lines.slice(1);
    const body = bodyIndex > 0 ? lines.slice(bodyIndex + 1).join('\n').trim() : '';

    const headers: Record<string, string> = {};
    let host = '';

    for (const line of headerLines) {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex > 0) {
            const name = line.substring(0, separatorIndex).trim();
            const value = line.substring(separatorIndex + 1).trim();
            headers[name] = value;
            if (name.toLowerCase() === 'host') {
                host = value;
            }
        }
    }

    if (!host) {
        console.error("Format request tidak valid: Header 'Host' tidak ditemukan.");
        return null; 
    }
    
    const url = `https://${host}${path}`;

    return { method, url, headers, body };
}