import { Contributor } from "../auth/auth";

declare module 'express-session' {
    interface SessionData {
      user: Contributor;
    }
  }
