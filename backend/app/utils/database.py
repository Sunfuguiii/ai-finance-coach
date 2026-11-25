from sqlalchemy import create_engine, text  
from sqlalchemy.orm import sessionmaker,declarative_base
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.asyncio import async_sessionmaker

# 数据库URL
# 格式：postgresql://用户名:密码@主机:端口/数据库名
from .config import get_settings
settings = get_settings()
DATABASE_URL = settings.DATABASE_URL
# 创建数据库引擎
engine = create_async_engine(
    DATABASE_URL,  # 数据库URL
    echo=True)

# 创建会话工厂
# 每个请求一个会话
AsyncSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

async def get_session():
    async with AsyncSessionLocal() as session:
        try:
            yield session  
            await session.commit()  
        except Exception as e:
            await session.rollback()  
            raise e  

Base = declarative_base() # 内部自动就会准备metadata容器