import { chatApi } from './chat-api';
import { transactionApi } from './transaction-api';
import { goalApi } from './goal-api';



export const homeApi={
    // 获取交易数据
    getTransactions: async () => {
        return transactionApi.list();
    },
    getGoals: async () => {
        return goalApi.list();
    },
    // 获取智能财务建议
    getSuggestion: async () => {
        return chatApi.getSuggestion();
    }
}