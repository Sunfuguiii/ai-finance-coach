from jose import JWTError, jwt
from datetime import datetime, timedelta
from .config import get_settings
settings = get_settings()
def create_access_token1(data: dict,expire_delta: timedelta|None=None)-> str:
    to_encode = data.copy()
    expire=datetime.now() + (expire_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    jwt_token = jwt.encode(to_encode, settings.TOKEN_KEY, algorithm=settings.ALGORITHM)
    return jwt_token
# 解码token
def decode_jwt_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.TOKEN_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise JWTError("Token 是无效或过期的")