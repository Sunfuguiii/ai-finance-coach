
import { GoalResponse } from "@/types/goal";
import { TransactionResponse } from "@/types/transaction";
import { ChatResponse } from "@/types/chat";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatAmount } from "@/types/goal";



interface StatsCardsProps {
    transactions: TransactionResponse[];
    goals: GoalResponse[];
  }
  
export default function StatsCards({ transactions, goals }: StatsCardsProps) { 

  // 统计数据：总收入
  const totalIncome = transactions
      .filter((tx) => tx.type === "income") 
      .reduce((sum, t) => sum + t.amount, 0); // 累加计算 ：计算收入
  
  // 统计数据：总支出
  const totalExpense = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

  // 统计数据：总余额
  const totalBalance = totalIncome - totalExpense;

  const cards = [
    {
      title: '总收入',
      value: formatAmount(totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: '总支出',
      value: formatAmount(totalExpense),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: '结余',
      value: formatAmount(totalBalance),
      icon: Wallet,
      color: totalBalance >= 0 ? 'text-blue-600' : 'text-orange-600',
      bgColor: totalBalance >= 0 ? 'bg-blue-50' : 'bg-orange-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {
      cards.map((card,index)=>{
        return (
          <Card key={index} className="rounded-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
        </Card>
        )
      })
    }   
</div>
  )

}