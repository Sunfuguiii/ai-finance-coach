import request  from '@/lib/api'
import { ChatRequest } from '@/types/chat'

export const chatApi = {
    
    // 发送消息：财务教练沟通信息
    sendMessage:async (data: ChatRequest) => {
        return request.post("/ai",data )
    },
    
    // 获取智能财务建议
    getSuggestion:async () => {
        return request.get("/ai/suggestion")
    },  
}