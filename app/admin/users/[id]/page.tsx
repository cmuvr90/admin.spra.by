import {UserTemplate} from "@/templates/UserTemplate";
import {User as UserInterface} from "@/services/types/User";
import {getUser} from "@/serverActions/user";

let user: UserInterface | null = null;

export default async function User({params: {id}}: Props) {
  try {
    user = await getUser(id);
  } catch (e) {
    console.log('ERROR = ', e);
  }

  return user && <UserTemplate user={user}/>
}

type Props = {
  params: { id: string }
}