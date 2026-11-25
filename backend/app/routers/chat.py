from calendar import c
import re
from fastapi import APIRouter, Depends
from app.schemas.chat import ChatRequest
from app.models.user import User
from app.utils.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from app.routers.auth import get_current_user2
from app.utils.config import get_settings
from openai import OpenAI
from app.services.lim_client import complex_chat,simple_chat
from sqlalchemy import select, func
from app.models.transaction import Transaction
from app.models.goal import Goal


ai_router = APIRouter(prefix="/ai",tags=["ai"])

async def _user_context(db: AsyncSession, user: User):
    # 获取用户的收入和支出
    income_query=select(func.sum(Transaction.amount)).where(Transaction.user_id==user.id,Transaction.type=="income")
    income_result=await db.execute(income_query)
    income=income_result.scalar()or 0
    print(income)
    expense_query=select(func.sum(Transaction.amount)).where(Transaction.user_id==user.id,Transaction.type=="expense")
    expense_result=await db.execute(expense_query)
    expense=expense_result.scalar()or 0
    # 用户的目标
    goal_query=select(Goal).where(Goal.user_id==user.id).order_by(Goal.created_at.desc())
    goal_result=await db.execute(goal_query)
    goal=goal_result.scalar() or Goal()
    goal_summary=f"用户的目标是:{goal.title},目标金额是:{goal.target_amount},当前金额是:{goal.current_amount},截止日期是:{goal.deadline}"
    # 构建上下文
    return f"用户的收入是:{income},支出是:{expense}\n{goal_summary}"
@ai_router.post("")
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_session),user:User=Depends(get_current_user2)):
    context=await _user_context(db,user)
    result=complex_chat(request.messages, context)
    return {"message": result}

@ai_router.get("/suggestion")
async def get_suggestions(
     db: AsyncSession = Depends(get_session),
    user: User = Depends(get_current_user2)
    ):
    
    
     # 1 装上下文信息：用户收入 支出 财务目标
    context = await _user_context(db, user)
    
    # 2 提示词构建：模型根据用户信息给出财务建议 简短
    prompt = f"基于以下财务数据：{context}。请给出一条简短的财务建议，50字以内，语气要专业且鼓励人心。"
    
    # 3 调用模型
    suggestions = complex_chat(prompt, context)
    
    return {"suggestion": suggestions}