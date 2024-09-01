export class User {
  createUser() {}

  validateUser() {}

  updateUserData() {}
}

interface UserProperties {
  uid: string;
  username: string | null;
  email: string;
  locale: string;
  profilePhoto: string;
  passwordHas: string;
}
