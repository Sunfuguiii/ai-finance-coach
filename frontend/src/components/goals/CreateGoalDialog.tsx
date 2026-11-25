'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoalCreate, GoalResponse } from '@/types/goal';
import { DollarSign, Calendar } from 'lucide-react';

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GoalCreate) => Promise<void>;
}

export function CreateGoalDialog({ open, onOpenChange, onSubmit }: CreateGoalDialogProps) {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('0');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  // 重置表单
  useEffect(() => {
    if (!open) {
      setTitle('');
      setTargetAmount('');
      setCurrentAmount('0');
      setDeadline('');
      setLoading(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('请输入目标名称');
      return;
    }

    const target = parseFloat(targetAmount);
    if (isNaN(target) || target <= 0) {
      alert('请输入有效的目标金额');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        target_amount: target,
        current_amount: parseFloat(currentAmount) || 0,
        deadline: deadline || null,
        
      });
      onOpenChange(false);
    } catch (error) {
      console.error('创建失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480]">
        <DialogHeader>
          <DialogTitle>新建储蓄目标</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* 目标名称 */}
            <div className="space-y-2">
              <Label htmlFor="title">目标名称</Label>
              <Input
                id="title"
                placeholder="例如：买房首付、旅行基金"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 text-sm"
                maxLength={255}
                required
              />
            </div>

            {/* 目标金额 */}
            <div className="space-y-2">
              <Label htmlFor="targetAmount">目标金额</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">￥</span>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="0.00"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="pl-9 h-9 text-sm"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* 当前金额和截止日期 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="currentAmount">当前金额（可选）</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">￥</span>
                  <Input
                    id="currentAmount"
                    type="number"
                    placeholder="0.00"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className="pl-9 h-9 text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">截止日期（可选）</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '创建中...' : '创建目标'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
