from ast import stmt
from calendar import c
from os import name
from app.utils.token import decode_jwt_token

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.database import get_session
from fastapi import HTTPException
from sqlalchemy import select
from app.utils.security import password_hash, verify_password
from app.utils.token import create_access_token1
from fastapi.security import OAuth2PasswordBearer
user_router = APIRouter(prefix="/auth",tags=["auth"])
OAuth2_scheme=OAuth2PasswordBearer(tokenUrl="/login")
@user_router.post("/register")
async def register_user(user_in: UserCreate, db: AsyncSession = Depends(get_session)):
    # 检查用户名是否已存在
    stmt=select(User).where(User.email == user_in.email)
    result = await db.execute(stmt)
    user=result.scalar_one_or_none()
    if user:
        raise HTTPException(status_code=400, detail="用户名已存在")
    user=User(
        name=user_in.name,
        email=user_in.email,
        password=password_hash(user_in.password),
    )
    db.add(user)
 
    await db.commit()
    await db.refresh(user)
    return {"message": "用户注册成功"}
@user_router.post("/login")
async def login_user(user_in: UserCreate, db: AsyncSession = Depends(get_session)):

    # 检查用户名是否已存在
    stmt=select(User).where(User.email == user_in.email)
    result = await db.execute(stmt)
    user=result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=400, detail="用户名不存在")
    # 检查密码是否正确
    if not verify_password(user_in.password, user.password):
        raise HTTPException(status_code=400, detail="密码错误")
    # 生成 token
    token = create_access_token1({"sub": user.email})
    name=user.name
    email=user.email
    return {"token": token,"name":name,"email":email}
# 获取当前用户
async def get_current_user(db: AsyncSession = Depends(get_session),token: str = Depends(OAuth2_scheme)):
    try:
        payload = decode_jwt_token(token)
    except ValueError:
        raise HTTPException(status_code=401, detail="无效的 token")
    email=payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="无效的 token")
    stmt=select(User).where(User.email == email)
    result = await db.execute(stmt)
    user=result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="用户不存在")
    return user

@user_router.get("/current_user")
async def get_current_user2(current_user: User = Depends(get_current_user)):
    
    return current_user
