
from calendar import c
from datetime import date
import re
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.transaction import TransactionCreate,TransactionUpdate
from app.models.transaction import Transaction
from app.utils.database import get_session
from app.models.user import User
from app.routers.auth import get_current_user2
transaction_rooute= APIRouter(prefix="/transactions",tags=["transactions"])
@transaction_rooute.post("/")
# 创建交易

async def create_transaction(
    transaction_in: TransactionCreate, 
    db: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user2)
):
   # 使用当前登录用户的 ID，确保符合外键约束且安全
    transaction_data = transaction_in.model_dump()
    transaction_data['user_id'] = current_user.id
    transaction = Transaction(**transaction_data)
    db.add(transaction)
    await db.commit()
    await db.refresh(transaction)
    return transaction
@transaction_rooute.put("/{transaction_id}")
async def update_transaction(
    transaction_id: int,
    transaction_update: TransactionUpdate,
    db: AsyncSession = Depends(get_session)
):
    # 查交易
    result = await db.execute(select(Transaction).where(Transaction.id == transaction_id))
    transaction = result.scalar_one_or_none()

    if not transaction:
        return {"status_code": 404, "detail": "交易不存在"}

    # 安全更新（绝对不会报错）
    data = transaction_update.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(transaction, key, value)

    await db.commit()
    await db.refresh(transaction)
    return transaction
@transaction_rooute.get("/")
async def get_transactions(db: AsyncSession = Depends(get_session)):
    stmt = select(Transaction)
    result = await db.execute(stmt)
    transactions = result.scalars().all()
    return transactions
@transaction_rooute.delete("/")
async def get_transactions_by_month(month: int, year: int, db: AsyncSession = Depends(get_session),current_user: User = Depends(get_current_user2)):
    query=select(Transaction).where(Transaction.user_id == current_user.id)
    

    result = await db.execute(query)
    transactions = result.scalars().all()
    return transactions


@transaction_rooute.delete("/{transaction_id}")
async def delete_transaction(transaction_id: int, db: AsyncSession = Depends(get_session),current_user: User = Depends(get_current_user2)):
    stmt = select(Transaction).where(Transaction.id == transaction_id, Transaction.user_id == current_user.id)
    result = await db.execute(stmt)
    transaction = result.scalar_one_or_none()
    if not transaction:
        return {"status_code":404, "detail":"交易记录不存在"}
    await db.delete(transaction)
    await db.commit()
    return {"message": "交易记录删除成功"}

