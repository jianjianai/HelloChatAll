import type { AllUserMessageData } from "./ai/all/AllUserMessageData";

export interface Message{
  data:object;
  delete:()=>void;
}

export interface AllUserMessage extends Message{
  data:AllUserMessageData;
}