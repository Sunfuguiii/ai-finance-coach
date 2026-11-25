import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarWithBadge() {

  return (
    <Avatar>
      <AvatarImage src="https://upload-bbs.miyoushe.com/upload/2024/12/21/154205760/d0ddd2ac25b673d817f0cfd17a1a7ccd_329289472563817090.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg" alt="@shadcn" />
      <AvatarFallback>头像</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
export default AvatarWithBadge;
