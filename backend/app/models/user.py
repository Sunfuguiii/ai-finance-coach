from venv import create
from sqlalchemy import Column, Integer, String, DateTime
from app.utils.database import Base 
from sqlalchemy.orm import mapped_column, Mapped
from datetime import datetime, timedelta
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True,)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    # 用户月收入
    monthly_income: Mapped[float] = mapped_column(server_default="0.0")
    #期初余额
    initial_balance: Mapped[float] = mapped_column(server_default="0.0")
    # 期末余额
    final_balance: Mapped[float] = mapped_column(server_default="0.0")
    create_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)