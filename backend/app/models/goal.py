from datetime import datetime, date
from annotated_types import T
from sqlalchemy import Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.utils.database import Base

class Goal(Base):
    __tablename__ = "goals"
    id: Mapped[int] = mapped_column(Integer,primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)
    title: Mapped[str] = mapped_column(String(255),nullable=True,default="")
    target_amount: Mapped[float] = mapped_column(nullable=True,default=0.0)
    current_amount: Mapped[float] = mapped_column(nullable=True,default=0.0)
    deadline: Mapped[date] = mapped_column(Date,nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
