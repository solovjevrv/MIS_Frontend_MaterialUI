export class User {
  username: string;
  userpost: string;
  constructor(public name: string, public post: string) {
    this.username = name;
    this.userpost = post;
  }
}