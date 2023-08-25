import {LoginTemplate} from "@/templates/LoginTemplate";
import {revalidatePath} from "next/cache";

export default function Login() {

  const onLogin = async ({email, password}: {email: string, password: string}) => {
    'use server'
    console.log(email, password);

    // setLoading(true)
    // const {errors, data} = await api.users.login({email, password})
    // if (errors && !data?.user) {
    //   setLoading(false)
    //   return toast.error(errors)
    // }
    // setUser(data.user)
    // location.href = '/'

    revalidatePath(`/login`);
  }

  return <LoginTemplate onLogin={onLogin}/>
}
