"use client";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FieldSet,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
} from "@/components/ui/field";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { authApi } from "@/lib/auth-api";

export function LoginFrom() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit =  async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true);
    const email = formData.email.trim();
    const password = formData.password.trim();
    // 表单字段检查
    
    if (!email || !password) {
      setError("请填写完整信息");
      setLoading(false);
      return;
    }
    //邮箱验证
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setLoading(false);
      return setError("请输入正确的邮箱格式");
    }
    //密码验证
    if (password.length < 8) {
      setLoading(false);
      return setError("密码长度至少8位");
      
    }

try{
   const useinfo=await authApi.login({email,password})
   const token=useinfo.token
   console.log('useinfo',useinfo);
    // // 登录状态标记token
    // // const token = "1234567890";
    // //const命令作用是定义一个常量，常量的值不能改变
    // const token = Math.random().toString(36).substring(2, 15);
    // console.log(token);
    // // 把token存储到localStorage中
    // localStorage.setItem("token", String(token));
    // const logininfo = {
    //   nickname: infoData.nickname,
    //   email: infoData.email,
    // };
    // 把logininfo存储到localStorage中
    localStorage.setItem("token", token);
    const logininfo={
      nickname: useinfo.name,
      email: useinfo.email,
    };
    localStorage.setItem("logininfo", JSON.stringify(logininfo));
    setSuccess("登录成功");
    setTimeout(() => {
      router.replace("/");
    }, 1000); 
  } catch(error:any){
      setError("登录失败");
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>登录账号</CardTitle>
        <CardDescription>输入邮箱和密码以登录</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && <FieldError>{error}</FieldError>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">
                邮箱<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="email"
                placeholder="admin@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">
                密码<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="输入密码"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <FieldDescription>密码长度至少8位字符</FieldDescription>
            </Field>

            <Field>
          
              <Button
                type="submit"
                className="w-full border border-black bg-white text-black"
              >
                {loading ? "登录中..." : "登录"}
              </Button>
              <FieldDescription className="text-center">
                还没有账号？ <Link href="/signup">注册</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginFrom;
