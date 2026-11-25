
import request  from '@/lib/api'
import { GoalCreate, GoalUpdate } from "../types/goal";
export const goalApi = {

    // 获取交易记录列表
    list: async () => {
        return request.get("/goals")
    },

    // 创建交易记录
    create: async (data: GoalCreate) => {
        return request.post("/goals",data)
    },

    // 更新交易记录
    update: async (id: number, data: GoalUpdate) => {
        return request.put(`/goals/${id}`,data)
    },

    // 删除交易记录
    delete: async (id: number) => {
        return request.delete(`/goals/${id}`)
    },
}
