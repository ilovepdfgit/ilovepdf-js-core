import TaskFactory from "./TaskFactory";
import XHRPromise from "../utils/XHRPromise";
import JWT from "../auth/JWT";
import dotenv from 'dotenv';
import ILovePDFFile from "../utils/ILovePDFFile";
import path from 'path';
import { inRange } from "../utils/math";
import WatermarkTask from "./WatermarkTask";

// Load env vars.
dotenv.config();

const taskFactory = new TaskFactory();
const xhr = new XHRPromise();
const auth = new JWT(xhr, process.env.PUBLIC_KEY!, process.env.SECRET_KEY!);

describe('WatermarkTask', () => {

    it('process', () => {
        const task = taskFactory.newTask('watermark', auth, xhr) as WatermarkTask;

        return task.start()
        .then(() => {
            const file = new ILovePDFFile(path.resolve(__dirname, '../tests/input/sample.pdf'));
            return task.addFile(file);
        })
        .then(() => {
            return task.process({ text: 'testing', mosaic: true });
        })
        .then(() => {
            return task.download();
        })
        .then(data => {
            console.log(`Length: ${ data.length }`);
            expect( inRange(data.length, 14641, 150) ).toBeTruthy();
        });
    });

    it('process with mosaic setting', () => {
        const task = taskFactory.newTask('watermark', auth, xhr) as WatermarkTask;

        return task.start()
        .then(() => {
            const file = new ILovePDFFile(path.resolve(__dirname, '../tests/input/sample_2b.pdf'));
            return task.addFile(file);
        })
        .then(() => {
            return task.process({ text: 'testing', mosaic: true });
        })
        .then(() => {
            return task.download();
        })
        .then(data => {
            console.log(`Length: ${ data.length }`);
            expect( inRange(data.length, 33771, 150) ).toBeTruthy();
        });
    });

});
