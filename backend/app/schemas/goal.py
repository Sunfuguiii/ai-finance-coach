from pydantic import BaseModel
from datetime import datetime
from datetime import date
class GoalBase(BaseModel):
    title:str
    target_amount: float
    current_amount: float=0.0
    deadline: date|None=None
class GoalCreate(GoalBase):
    pass
class GoalUpdate(GoalBase):
    pass
class GoalResponse(GoalBase):
    id: int
    created_at: datetime
    source:str|None=None