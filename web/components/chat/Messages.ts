export interface Message<T extends Object>{
  id: string;
  type: string;
  data:T;
  delete:()=>void;
}