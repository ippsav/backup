import create from 'zustand';


export enum UserRole {
  ADMIN="ADMIN",
  USER="USER"
}

export type User = {
  id:string;
  username:string;
  password:string;
  Role:UserRole;
}

export type Product = {
  id:string;
  name:string;
  description:string;
  imageURL:string;
}
export type UserLoginOptions={
  username:string;
  password:string;
}


export type Store {
  user:User;
  token:string;
  products: Product[];
  login:(options:UserLoginOptions) => {user:User,token:string}
  logout:()=>void
}

//functions
const login = (options:UserLoginOptions) =>{

}

const useStore = create<Store>((set) =>({
  user:{},

}))

