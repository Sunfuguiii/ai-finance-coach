from fastapi import FastAPI
from app.routers.auth import user_router
from app.routers.transaction import transaction_rooute
from app.routers.goal import goal_router
from app.routers.chat import ai_router
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",'http://localhost:3001'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(transaction_rooute)
app.include_router(goal_router)
app.include_router(ai_router)
@app.get("/")
def read_root():
    return {"Hello": "World"}
