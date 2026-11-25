'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TransactionResponse, getCategoryName } from '@/types/transaction';
import { formatAmount } from '@/types/goal';

interface ExpenseCategoryChartProps {
  transactions: TransactionResponse[];
}

// 颜色配置
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function ExpenseCategoryChart({ transactions }: ExpenseCategoryChartProps) {
  // 筛选支出交易
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  if (expenseTransactions.length === 0) {
    return (
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="text-lg">支出分类</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">暂无支出数据</p>
        </CardContent>
      </Card>
    );
  }

  // 1. 使用 Map 进行聚合
const categoryMap = new Map<string, number>();

expenseTransactions.forEach(transaction => {
  const categoryName = getCategoryName('expense', transaction.category);
  // 使用 Map 的 get/set，逻辑更清晰
  const currentValue = categoryMap.get(categoryName) || 0;
  categoryMap.set(categoryName, currentValue + transaction.amount);
});

// 2. 转换为数组并排序
const chartData = Array.from(categoryMap, ([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="text-lg">支出分类</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [formatAmount(Number(value)), '金额']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
