import os
import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
app = FastAPI()

class ProxyRequest(BaseModel):
    raw_request: str 

class AIRequest(BaseModel):
    request: str
    response: dict 

@app.post("/proxy")
async def proxy_request(data: ProxyRequest):
    try:
        
        lines = data.raw_request.strip().split('\n')
        method, path, _ = lines[0].split()
        headers = {}
        body = ""
        
        
        for line in lines[1:]:
            if not line.strip():
                continue
            if ':' in line:
                key, value = line.split(':', 1)
                headers[key.strip()] = value.strip()
            else:
                body = line.strip()
        
        
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=method,
                url=f"http://{headers['Host']}{path}",
                headers=headers,
                content=body,
                timeout=10.0
            )
        
        return {
            "status_code": response.status_code,
            "headers": dict(response.headers),
            "body": response.text[:5000]  # Batasi ukuran body
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/ai-recommend")
async def ai_recommend(data: AIRequest):
    try:
        prompt = f"""
        Anda adalah pakar security testing. Analisis request-response berikut:
        REQUEST:
        {data.request}
        
        RESPONSE:
        Status: {data.response['status_code']}
        Headers: {data.response['headers']}
        Body: {data.response['body'][:200]}
        
        Berikan 5 rekomendasi TINDAKAN SPESIFIK untuk security testing lanjutan (misal: SQLi test di parameter X, 
        cek path traversal di header Y, initinya fokus pada top 10 owasp). Format respons sebagai JSON array string.
        """
        
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        
        return {"recommendations": eval(completion.choices[0].message.content)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)