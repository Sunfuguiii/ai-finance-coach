from pydantic import BaseModel
from datetime import datetime


class TransactionBase(BaseModel):
    user_id: int
    type: str
    category: str
    amount: float
    description: str | None = None
    source: str | None = None
    transaction_time: datetime | None = None


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    type: str | None = None
    category: str | None = None
    amount: float | None = None
    description: str | None = None
    source: str | None = None
    date: datetime | None = None


class TransactionResponse(TransactionBase):
    id: int
    source: str | None = None
    create_at: datetime