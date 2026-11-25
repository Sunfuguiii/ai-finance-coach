import { useEffect, useState } from "react";
import { homeApi } from "@/lib/home-api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb ,Loader2} from "lucide-react";

export default function SmartSuggestions() {
  const [suggestion, setSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // 请求智能建议
  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const data = await homeApi.getSuggestion();
        console.log("获取建议成功:", data);
        setSuggestion(data.suggestion);
      } catch (error) {
        console.error("获取建议失败:", error);
        // 降级：如果接口失败，显示默认建议
        setSuggestion(
          "建议您坚持“50/30/20”预算法则：50%用于必要支出，30%用于弹性支出，20%用于储蓄和投资。定期复盘财务状况是理财成功的关键！"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, []);

  if (loading) {
    return (
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            智能财务建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-500">正在分析您的财务数据...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-l-4 border-l-blue-500 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          智能财务建议
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed text-base">{suggestion}</p>
      </CardContent>
    </Card>
  );
}
