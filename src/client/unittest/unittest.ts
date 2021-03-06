"use strict";

import * as path from "path";
import * as baseTestRunner from "./baseTestRunner";
import * as settings from "./../common/configSettings";
import {OutputChannel} from "vscode";

export class PythonUnitTest extends baseTestRunner.BaseTestRunner {
    constructor(pythonSettings: settings.IPythonSettings, outputChannel: OutputChannel, workspaceRoot: string) {
        super("unittest", pythonSettings, outputChannel, true, workspaceRoot);
    }

    public isEnabled(): boolean {
        return this.pythonSettings.unitTest.unittestEnabled;
    }
    public runTests(): Promise<any> {
        if (!this.pythonSettings.unitTest.unittestEnabled) {
            return Promise.resolve();
        }

        let ptyhonPath = this.pythonSettings.pythonPath;
        let pythonUnitTestArgs = Array.isArray(this.pythonSettings.unitTest.unittestArgs) ? this.pythonSettings.unitTest.unittestArgs : [];
        return new Promise<any>(resolve => {
            this.run(ptyhonPath, ["-m", "unittest"].concat(pythonUnitTestArgs.concat(["discover"]))).then(messages => {
                resolve(messages);
            });
        });
    }
}