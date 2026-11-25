import { useState } from "react";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";




interface DeleteGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}
export default function DeleteGoalDialog({ open, onOpenChange, onConfirm }: DeleteGoalDialogProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(open);
    const deleteGoal = () => {
        onConfirm();
        setDeleteDialogOpen(false);
    }
    return (
         <AlertDialog open={open} onOpenChange={onOpenChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除?</AlertDialogTitle>
              <AlertDialogDescription>
                此操作将永久删除该交易记录，无法恢复。确定要继续吗？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={deleteGoal}>
                确认删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>)}