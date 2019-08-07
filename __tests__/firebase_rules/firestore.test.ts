import * as firebase from "@firebase/testing";
import * as fs from "fs";

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "next-sample-app-25deb";
const rules = fs.readFileSync("firestore.rules", "utf8");

/*
 * ============
 *  Test Cases
 * ============
 */
describe("firestore-test", (): void => {
  // はじめに１度ルールを読み込ませる
  beforeAll(
    async (): Promise<void> => {
      await firebase.loadFirestoreRules({
        projectId,
        rules
      });
    }
  );

  // test毎にデータをクリアする
  afterEach(
    async (): Promise<void> => {
      await firebase.clearFirestoreData({ projectId });
    }
  );

  // 全テスト終了後に作成したアプリを全消去
  afterAll(
    async (): Promise<void> => {
      await Promise.all(
        firebase.apps().map((app): Promise<any> => app.delete())
      );
    }
  );

  /**
   * Creates a new app with authentication data matching the input.
   *
   * @param {object} auth the object to use for authentication (typically {uid: some-uid})
   * @return {object} the app.
   */
  function authedApp(auth): firebase.firestore.Firestore {
    return firebase.initializeTestApp({ projectId, auth }).firestore();
  }

  /**
   * todos
   * read, create
   */
  describe("todos collection test", (): void => {
    test("should handle read todos", async (): Promise<void> => {
      const db = authedApp({ uid: "testUser" });
      const todos = db.collection("todos").doc("testUser");
      await firebase.assertSucceeds(todos.get());
    });

    test("should handle create todos", async (): Promise<void> => {
      const db = authedApp({ uid: "testUser" });
      const todos = db.collection("todos").doc("testUser");
      await firebase.assertSucceeds(
        todos.set({
          todo: "test test"
        })
      );
    });
  });
});
