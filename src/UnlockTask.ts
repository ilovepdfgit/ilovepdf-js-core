import Task from "./Task";
import ILovePDFTool from "./types/ILovePDFTool";
import { TaskParams } from './Task';

export default class UnlockTask extends Task {
    public type: ILovePDFTool;

    constructor(publicKey: string, secretKey: string, params: TaskParams = {}) {
        super(publicKey, secretKey, params);

        this.type = 'unlock';
    }

}