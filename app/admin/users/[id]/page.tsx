import {UserTemplate} from "@/templates/UserTemplate";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Api from "@/services/Api";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {User as UserInterface} from "@/services/types/User";
import {revalidatePath} from "next/cache";

let user: UserInterface | null = null;
let api: Api | null;

export default async function User({params: {id}}: Props) {
  const session = await getServerSession(authOptions);
  api = !!session?.user ? new Api({userId: session.user.id}) : null;

  async function onUpdate(value: UserInterface) {
    'use server';
    if (api) {
      const {data, status, error} = await api.users.update(value.id, value);
      revalidatePath(`/users/${id}`);
      return data;
    }
    return null;
  }

  if (api) {
    const {data, status, error} = await api.users.get(id);
    if (status === FetchResponseStatus.SUCCESS) user = data;
  }

  return user && <UserTemplate user={user} onUpdate={onUpdate}/>
}

type Props = {
  params: { id: string }
}