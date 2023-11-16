export type User = {
  id: string;
  username: string;
  
  provider: "github" | "credentials";
};

export type Document = {
  id: string;
  title: string;
  content: string;
};
