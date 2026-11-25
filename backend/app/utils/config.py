
from pathlib import Path
from pydantic_settings import BaseSettings
# E:\student\2412\project_backend\app\config.py
# __file__:当前文件的路径
# print(__file__)
# Path : 路径操作类 ,可以方便对路径进行操作
# print(Path(__file__))
# resolve : 解析路径，返回绝对路径
# .parent : 获取父目录
# print(Path(__file__).resolve().parent)

# APP_DIR : 应用目录
APP_DIR = Path(__file__).resolve().parent

# ROOT_DIR : 项目根目录
ROOT_DIR = APP_DIR.parent

# BaseSettings : 基础设置类，用于加载环境变量
# 配置类属性名 和 环境变量名 保持一致
class Setting(BaseSettings):
    TOKEN_KEY : str = "token"
    ALGORITHM : str = "HS256"
    DEEPSEEK_API_KEY : str = ""  # 从 .env 读取，切勿硬编码真实密钥
    ACCESS_TOKEN_EXPIRE_MINUTES : int = 300
    DATABASE_URL : str = ""  # 从 .env 读取，切勿硬编码真实密钥
    
    class Config:
        # 配置环境变量文件路径（.env 位于 backend/ 下，即 ROOT_DIR 的上一级）
        env_file = ROOT_DIR.parent / ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # 忽略 .env 中未定义的字段（如 TOKEN_ALGORITHM）
        
    @property
    def DATABASE_SYNC_URL(self) -> str:
        return self.DATABASE_URL.replace("postgresql+asyncpg", "postgresql")

def get_settings():
    return Setting() # 单例模式