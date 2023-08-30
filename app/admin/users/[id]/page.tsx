import {UserTemplate} from "@/templates/UserTemplate";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Api from "@/services/Api";
import {FetchResponseStatus} from "@/services/types/Fetcher";

let user = {};

export default async function User({params: {id}}: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!!session?.user) {
    const api = new Api({userId: session.user.id});

    const {data, status, error} = await api.users.get(id);
    console.log(data, status, error);

    if (status === FetchResponseStatus.SUCCESS) user = data;
  }

  return <UserTemplate user={user}/>
}
