import os
from openai import OpenAI
from app.utils.config import get_settings
# 创建客户端
# def _client()->OpenAI | None
settings=get_settings()


# 处理简单的聊天请求
def _get_client()->OpenAI|None:
    if not settings.DEEPSEEK_API_KEY:
        return None

    client = OpenAI(
        api_key=settings.DEEPSEEK_API_KEY,
        base_url="https://api.deepseek.com")
    return client
def simple_chat(message: str)->str|None:
    client = _get_client()
    if not client:
        return "DEEPSEEK_API_KEY is not set"
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "你是专业AI财务助手,帮助用户解决财务问题"},
            {"role": "user", "content": message},
        ],
        stream=False
)
    return response.choices[0].message.content
# 处理复杂的聊天请求
def complex_chat(user_prompt: str,context:str)->str|None:
    client = _get_client()
    if not client:
        return "DEEPSEEK_API_KEY is not set"
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "你是一个专门为大学生设计的个人财务教练"
"你将基于用户数据和上下文，比如用户的收入、支出和财务目标，提供专业的财务建议。"
"回答简洁明了，避免使用专业术语。"},
            {"role": "user", "content":f"用户问题:{user_prompt}\n上下文:{context}"},
        ],
        stream=False
)
    return response.choices[0].message.content
