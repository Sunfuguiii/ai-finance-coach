'use client'

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
import { FieldSet, Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend } from "@/components/ui/field";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/auth-api";

//useRouter:用于路由跳转
export function SignupFrom() {
   const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const{id,value} = e.target;
    console.log(id,value);

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    //去掉空格
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    //表单验证
    if(!name||!email||!password||!confirmPassword){
      return setError("请填写完整信息");
    }
    //邮箱验证
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      return setError("请输入正确的邮箱格式");
    }
    //密码验证
    if(password.length<8){
      return setError("密码长度至少8位");
    }
    //确认密码验证
    if(password!==confirmPassword){
      return setError("两次输入密码不一致");
    }
    //创建成功
    const data = {
      name,
      email,
      password
    }
    const res=await authApi.register(data)
    //提交表单
    localStorage.setItem("info",JSON.stringify(data));
    setSuccess("创建成功");
    setTimeout(() => {
        router.push("/login");
    }, 1000);
    console.log(name,email,password,confirmPassword);
 
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>创建账号</CardTitle>
        <CardDescription>输入以下信息完整用户创建</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
           {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}
           {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md">
              {success}
            </div>
          )}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">昵称<span className="text-destructive">*</span></FieldLabel>
                <Input 
                id="name"  
                placeholder="昵称" 
                required 
                value={formData.name} 
                onChange={handleChange} 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">邮箱<span className="text-destructive">*</span></FieldLabel>
                <Input 
                id="email" 
                placeholder="admin@example.com"
                required 
                value={formData.email} 
                onChange={handleChange} 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">密码<span className="text-destructive">*</span></FieldLabel>
                <Input 
                id="password" 
                type="password" 
                placeholder="输入密码" 
                required 
                value={formData.password} 
                onChange={handleChange} 
                />
                <FieldDescription>
                  密码长度至少8位,包含字母、数字和特殊字符
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">确认密码<span className="text-destructive">*</span></FieldLabel>
                <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="输入确认密码" 
                required 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                />
              </Field>
            <Field>
              <Button type="submit" className="w-full">
                创建账号
              </Button>
              <FieldDescription className="text-center">
                如果已经有账号？ <Link href="/login">登录</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupFrom;
