export declare const ctrlIpcApi: {
    test: string;
    call: {
        openCueFolder: string;
        runCue: string;
    };
    get: {
        deviceEvents: string;
        serialEvents: string;
        hardwareDescriptors: string;
        eventsAsList: string;
        connectedDevices: string;
        logRank: string;
        clientSize: string;
        allCues: string;
        cueById: string;
        cueByFolder: string;
        defaultTheme: string;
        themeFromPath: string;
    };
    set: {
        cueFile: string;
        cueForEvent: string;
    };
    onEv: {
        cue: {
            added: string;
            changed: string;
            removed: string;
        };
        device: {
            connected: string;
            disconnected: string;
        };
        terminal: {
            data: string;
        };
    };
};
export declare const storeKeys: {
    UuidNamespace: string;
    MainWindowState: string;
    DeviceLayout: string;
};
export type CtrlIpcApi = typeof ctrlIpcApi;
export type StoreKeys = typeof storeKeys;
