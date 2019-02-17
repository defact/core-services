import { User } from "../../../users/entities/user";
import { Session } from "../../interfaces/session";

export interface Authenticator {
  verify(session: Session): Promise<User>
}
