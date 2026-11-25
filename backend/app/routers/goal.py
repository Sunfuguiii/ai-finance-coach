from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.goal import GoalCreate, GoalUpdate
from app.models.goal import Goal
from app.utils.database import get_session
from app.models.user import User
from app.routers.auth import get_current_user2
goal_router= APIRouter(prefix="/goals",tags=["goals"])
@goal_router.post("")
async def create_goal(goal: GoalCreate, db: AsyncSession = Depends(get_session),user: User = Depends(get_current_user2)):
    db_goal = Goal(**goal.model_dump(),user_id=user.id)
    db.add(db_goal)
    await db.commit()
    await db.refresh(db_goal)
    return db_goal
@goal_router.get("")
async def get_goals(db: AsyncSession = Depends(get_session),user: User = Depends(get_current_user2)):
    query=select(Goal).where(Goal.user_id ==user.id)
    query=query.order_by(Goal.created_at.desc())
    result = await db.execute(query)
    goals = result.scalars().all()
    return goals
@goal_router.get("/{goal_id}")
async def get_goal(goal_id: int, db: AsyncSession = Depends(get_session),user: User = Depends(get_current_user2)):
    query=select(Goal).where(Goal.id == goal_id, Goal.user_id == user.id)
    result = await db.execute(query)
    goal = result.scalar_one_or_none()
    if not goal:
        return {"status_code":404, "detail":"目标不存在"}
    return goal
@goal_router.put("/{goal_id}")
async def update_goal(goal_id: int, goal: GoalUpdate, db: AsyncSession = Depends(get_session),user: User = Depends(get_current_user2)):
    query=select(Goal).where(Goal.id == goal_id, Goal.user_id == user.id)
    result = await db.execute(query)
    db_goal = result.scalar_one_or_none()
    if not db_goal:
        return {"status_code":404, "detail":"目标不存在"}
    for key, value in goal.model_dump().items():
        setattr(db_goal, key, value)
    await db.commit()
    await db.refresh(db_goal)
    return db_goal
@goal_router.delete("/{goal_id}")
async def delete_goal(goal_id: int, db: AsyncSession = Depends(get_session),user: User = Depends(get_current_user2)):
    query=select(Goal).where(Goal.id == goal_id, Goal.user_id == user.id)
    result = await db.execute(query)
    db_goal = result.scalar_one_or_none()
    if not db_goal:
        return {"status_code":404, "detail":"目标不存在"}
    await db.delete(db_goal)
    await db.commit()
    return {"message": "目标删除成功"}