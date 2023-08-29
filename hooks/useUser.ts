import {useSession} from "next-auth/react";
import {User} from "@/services/User";

export function useUser() {
  const session = useSession();
  return session?.data?.user ? new User(session.data.user) : null
}
