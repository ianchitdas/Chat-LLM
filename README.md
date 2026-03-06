First Start Ollama:
ollama run gemma3:1b or any model you are using [Don't Use ollama serve as it takes over all the models!]
backend 
uvicorn main:app --host 0.0.0.0 --port 8000
frontend
npx expo start
