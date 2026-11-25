from app.utils.database import Base   
from sqlalchemy.orm import mapped_column, Mapped
from datetime import datetime
from sqlalchemy import Integer, String, DateTime
from datetime import date
from sqlalchemy import Date
class Transaction(Base):
    __tablename__ = "transactions"
    id: Mapped[int] = mapped_column(Integer, primary_key=True,)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # 交易类型
    type: Mapped[str] = mapped_column(String, nullable=False)
    # 交易分类
    category: Mapped[str] = mapped_column(String, nullable=False)
    # 交易金额
    amount: Mapped[float] = mapped_column(nullable=False)
    # 交易时间
    transaction_time: Mapped[datetime] = mapped_column(Date, default=datetime.now)
    # 交易描述
    description: Mapped[str] = mapped_column(String, nullable=True)
    # 交易来源
    source: Mapped[str] = mapped_column(String, nullable=True)
    # 交易创建时间
    create_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)