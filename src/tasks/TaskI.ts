import ILovePDFTool from "../types/ILovePDFTool";
import DownloadResponse from "../types/responses/DownloadResponse";
import BaseFile from "./BaseFile";

export default interface TaskI {
    /**
     * Task id.
     */
    readonly id: string;
    /**
     * Starts task retrieving the assigned server and task id.
     * @returns Itself.
     */
    start: () => Promise<void>;
    /**
     * Adds a file to task.
     * @param file - File or public URL.
     * @returns Itself.
     */
    addFile: (file: BaseFile | string) => Promise<BaseFile>;
    /**
     * Deletes a file previously created.
     * @param file - File to remove.
     */
    deleteFile: (file: BaseFile) => Promise<void>;
    /**
     * Process uploaded files.
     * @param params - Parameters for the process.
     * @returns Itself.
     */
    process: (params?: Object) => Promise<object>;
    /**
     * Downloads processed files.
     * @returns Result of the process.
     */
    download: () => Promise<DownloadResponse>;
    /**
     * Deletes this task.
     * @returns Itself.
     */
    delete: () => Promise<void>;
    /**
     * Connects a new task to execute it on the files resulting
     * from the previous tool.
     * @returns The new connected task.
     */
    connect: (nextTool: ILovePDFTool) => Promise<TaskI>;
}
