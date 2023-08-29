import {UsersTemplate} from "@/templates/UsersTemplate";
import Api from "@/services/Api";
import Config from "@/config";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {FetchResponseStatus} from "@/services/types/Fetcher";

let users: any[] = [];

export default async function Users() {
  const session = await getServerSession(authOptions);

  if (!!session?.user) {
    const api = new Api({
      baseUrl: Config.API_BASE_URL,
      userId: session.user.id,
      token: Config.API_TOKEN
    });

    const {data, status} = await api.users.list();
    if (status === FetchResponseStatus.SUCCESS) users = data;
  }

  return <UsersTemplate users={users}/>
}
