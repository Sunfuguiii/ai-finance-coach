"use client";

import Header from "@/components/Header";
import SmartSuggestions from "@/components/home/StartSuggestions";
import StatsCards from "@/components/home/StatsCards";
import { useState, useEffect } from "react";
import { TransactionResponse } from "@/types/transaction";
import { GoalResponse } from "@/types/goal";
import { homeApi } from "@/lib/home-api";
import { Skeleton } from "@/components/ui/skeleton";
import ExpenseCategoryChart from "@/components/home/ExpenseCategoryChart";

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [goals, setGoals] = useState<GoalResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Promise.all: 并行获取交易和目标数据
        const [transactionsData, goalsData] = await Promise.all([
          homeApi.getTransactions(),
          homeApi.getGoals(),
        ]);

        // 如果没有真实数据，使用模拟数据
        setTransactions(transactionsData);
        setGoals(goalsData);
      } catch (error) {
        console.error("加载数据失败，使用模拟数据:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 骨架屏处理
  if (loading) {
    return (
      <div className="space-y-6">
        {/* 统计卡片骨架屏 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-none" />
          ))}
        </div>

        {/* 图表骨架屏 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400] rounded-none" />
          <Skeleton className="h-[400] rounded-none" />
        </div>

        {/* 智能建议骨架屏 */}
        <Skeleton className="h-[300] rounded-none" />
      </div>
    );
  }

  // 后台页面内容
  return (
    <div>
      <Header menuName="后台首页" />
      <div className="space-y-6 p-6">
        {/* 卡片统计:交易   & 目标 */}
        <StatsCards transactions={transactions} goals={goals} />

        {/* 图表统计：交易 & 目标 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <ExpenseCategoryChart  transactions={transactions}/>
           
        
        </div>

        {/* 智能财务建议 */}
        <SmartSuggestions />
      </div>
   </div>
  );
}
