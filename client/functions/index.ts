/* firebase */
import * as functions from "firebase-functions";
/* server */
import server from "./server";

// eslint-disable-next-line import/prefer-default-export
export const nextApp = functions.https.onRequest(server);
