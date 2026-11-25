"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
} from "@/components/ui/alert-dialog"
import {
  TransactionResponse,
  type TransactionUpdate,
} from "@/types/transaction";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { transactionApi } from "@/lib/transaction-api";
import CreateTransaction from "@/components/transactions/CreateTransaction";
import { EditTransactionDialog } from "@/components/transactions/EditTransactionDialog";
import { TransactionCreate } from "@/types/transaction";
import { toast } from "sonner";

// 储蓄目标页面
export default function Transactions() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTransaction, setEditTransaction] =
    useState<TransactionResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 定义：加载交易记录方法
  const loadTransactions = async () => {
    const res = await transactionApi.list();
    console.log("交易记录列表:", res);
    // setTransactions(res.data);
    setTransactions(res);
  };

  // 组件挂载时执行加载交易记录
  useEffect(() => {
    loadTransactions();
  }, []);

  // 创建交易记录
  const createTransaction = async (transaction: TransactionCreate) => {
    await transactionApi.create(transaction);
    loadTransactions();
  };

  const handleEdit = (transaction: TransactionResponse) => {
    setEditDialogOpen(true);
    setEditTransaction(transaction);
  };

  const updateTransaction = async (transaction: TransactionUpdate) => {
    try {
      // 1. 调用后端更新接口
      await transactionApi.update(transaction.id, transaction);
      // 2. 关闭弹窗
      setEditDialogOpen(false);
      // 3. 刷新列表
      loadTransactions();
      // 4. 成功提示
      toast.success("交易记录更新成功");
    } catch (error) {
      // 捕获错误并提示
      console.error("更新失败:", error);
      toast.error("更新失败，请稍后重试");
    }
  };
  //  打开删除对话框
  const handleDelete = (id: number) => {
    setDeleteDialogOpen(true);
    // 删除临时id 保存
    setDeleteId(id);
  };

  // 确认删除
  const deleteTransaction = async () => {
    if (!deleteId) return;

    try {
      await transactionApi.delete(deleteId);
      toast.success("删除成功");
      loadTransactions();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "删除失败");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };
  return (
    <div>
      <Header menuName="交易记录" />

      <div className="container mx-auto p-6 max-w-4xl">
        {/* 交易记录标题 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">交易记录</h1>

          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            新增交易
          </Button>
        </div>

        {/* 交易记录列表 */}

        <div className="border border-gray-300 p-4 rounded-md">
          <div className="overflow-auto">
            <Table>
              {transactions.length === 0 && (
                <TableCaption>暂无交易记录</TableCaption>
              )}

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100]">日期</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>支付方式</TableHead>
                  <TableHead>备注</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead className="w-[100] text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.transaction_time}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {transaction.type === "income" ? "收入" : "支出"}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-gray-500">
                      {transaction.source}
                    </TableCell>
                    <TableCell className="max-w-[200] overflow-hidden text-ellipsis whitespace-nowrap">
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"} ¥{" "}
                        {transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell className="w-[100] text-center flex justify-center items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        title="编辑"
                        onClick={() => handleEdit(transaction)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                        {" "}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          title="删除"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 新增交易弹窗 */}
        <CreateTransaction
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={createTransaction}
        />

        {/* 编辑交易对话框 */}
        <EditTransactionDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          transaction={editTransaction}
          onSubmit={updateTransaction}
        />
            {/*  AlertDialog：删除提示框 */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除?</AlertDialogTitle>
              <AlertDialogDescription>
                 此操作将永久删除该交易记录，无法恢复。确定要继续吗？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
               onClick={deleteTransaction}
              >
                确认删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
