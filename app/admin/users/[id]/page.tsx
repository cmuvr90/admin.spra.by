import {UserTemplate} from "@/templates/UserTemplate";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Api from "@/services/Api";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {User as UserInterface} from "@/services/types/User";
import {revalidatePath} from "next/cache";

let user: UserInterface | null = null;

export default async function User({params: {id}}: Props) {
  const session = await getServerSession(authOptions);

  if (!!session?.user) {
    const api = new Api({userId: session.user.id});

    const {data, status, error} = await api.users.get(id);
    console.log(data, status, error);

    if (status === FetchResponseStatus.SUCCESS) user = data;
  }

  async function onUpdate(value: UserInterface) {
    'use server';
    console.log("user on save = ", value);
    revalidatePath(`/users/${id}`);
  }

  return user && <UserTemplate user={user} onUpdate={onUpdate}/>
}

type Props = {
  params: { id: string }
}