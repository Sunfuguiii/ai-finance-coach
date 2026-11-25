import     request  from './api'

export const authApi = {
    register:async(data:{email:string,password:string,name?:string})=>{
        return request.post('/auth/register',data)
    },
    login:async(data:{email:string,password:string})=>{
        return request.post('/auth/login',data)
    }
}
