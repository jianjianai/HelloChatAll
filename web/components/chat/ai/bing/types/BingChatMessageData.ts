class BingChatMessageData{
    constructor(
        public makerMessage:string='default',
        public takcTime:{
            thisTime:number,
            maxTime:number
        }={thisTime:0,maxTime:0},
    ){}
}

export {BingChatMessageData}