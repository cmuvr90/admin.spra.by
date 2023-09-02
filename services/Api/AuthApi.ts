import Api from "@/services/Api/index";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default class AuthApi {
  static api = async () => {
    const session = await getServerSession(authOptions);
    return new Api(session ? {userId: session.user.id} : {});
  }
}
