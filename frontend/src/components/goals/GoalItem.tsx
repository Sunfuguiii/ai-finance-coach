import type { GoalResponse } from "@/types/goal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, TrendingUp, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { calculateProgress ,getRemainingDays,formatAmount} from "@/types/goal";

interface GoalItemPros {
  goal: GoalResponse;
  onEdit:(goal:GoalResponse)=>void
  handleDelete:(id:number)=>void
}

export function GoalItem({ goal,onEdit,handleDelete }: GoalItemPros) {
  const progress = calculateProgress(
    goal.current_amount || 0,
    goal.target_amount || 0
  );

  const remainingDays =  getRemainingDays(goal.deadline || '') ;

  const remainingAmount = (goal.target_amount || 0)- (goal.current_amount || 0) ;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle>{goal.title}</CardTitle>
          </div>

          <div className="flex gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              title="编辑"
              onClick={()=>onEdit(goal)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
              title="删除"
              onClick={()=>handleDelete(goal.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 完成进度 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">完成进度</span>
            <span className="font-semibold text-blue-600">
              {progress.toFixed(1)}%
            </span>
          </div>
          <Progress value={progress} />
        </div>

        {/* 金额信息 */}

        <div className="grid grid-cols-2 gap-3 py-2 border-y">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">当前</p>
            <p className="text-base font-bold text-green-600">{formatAmount(goal.current_amount || 0)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-0.5">目标</p>
            <p className="text-base font-bold text-blue-600">{formatAmount(goal.target_amount || 0)}</p>
          </div>
        </div>

        {/* 其他信息： */}

        <div className="space-y-2 pt-1">
          {/* 存入差额 */}

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-gray-600">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>还需存入</span>
            </div>
            <span className="font-semibold text-orange-600">{formatAmount(remainingAmount)}</span>
          </div>

          {/* 截止日期 */}
          {goal.deadline && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Calendar className="h-3.5 w-3.5" />
                <span>截止日期</span>
              </div>

              <div className="text-right">
                <p className="font-medium">{goal.deadline}</p>
                {
                    remainingDays >= 0 && (
                        <p className={`text-xs font-semibold ${
                            remainingDays <= 7
                            ? "text-red-600"
                            : remainingDays <= 30
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}>
                            {remainingDays}天剩余
                        </p>
                        )
                }
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
