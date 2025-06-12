from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def ttst():
    return {"message": "Welcome to the MedQuery API!"}  

