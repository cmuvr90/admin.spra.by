import {UsersTemplate} from "@/templates/UsersTemplate";
import Api from "@/services/Api";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {User} from "@/services/types/User";

let users: User[] = [];

export default async function Users() {
  const session = await getServerSession(authOptions);

  if (!!session?.user) {
    const api = new Api({userId: session.user.id});

    const {data, status} = await api.users.list();
    if (status === FetchResponseStatus.SUCCESS) users = data;
  }

  return <UsersTemplate users={users}/>
}
