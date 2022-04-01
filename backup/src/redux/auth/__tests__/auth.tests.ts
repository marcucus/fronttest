import { UserEntity } from "../../../entities/UserEntity";
import { createStoreForTests } from "../../../utils/createStoreForTests";

describe("auth tests suite", () => {
  it("as a user, i should be able to authenticate with google", async () => {
    const { store, actions, di } = createStoreForTests();

    expect(store.getState().auth.authenticated).toEqual(false);
    expect(store.getState().auth.isFetching).toEqual(false);

    const user: UserEntity = { id: "1", email: "email" };

    di.AuthRepository.store([user]);

    const promise = store.dispatch<any>(actions.auth.$authenticateWithGoogle());
    
    expect(store.getState().auth.isFetching).toEqual(true);

    await promise;

    expect(store.getState().auth.isFetching).toEqual(false);
    expect(store.getState().auth.authenticated).toEqual(true);
    expect(store.getState().auth.user).toEqual(user);
  });
});
