import {UserTemplate} from "@/templates/UserTemplate";
import {User} from "@/services/User";

export default async function CrateUser() {
  return <UserTemplate user={User.DEFAULT}/>
}