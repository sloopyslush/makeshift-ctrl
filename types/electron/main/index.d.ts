import { BrowserWindow } from 'electron';
import { MakeShiftPortFingerprint, MakeShiftDeviceEvents, MakeShiftSerialEvents } from '@eos-makeshift/serial';
import { saveCueFile, CueId, CueMap, Cue } from './cues';
import { Theme } from './themes';
export type DeviceId = string;
export type MakeShiftEvent = string;
export type EventCueMap = Map<MakeShiftEvent, Cue>;
export type LayerLabel = {
    name: string;
    color: string;
    graphic?: string;
    audio?: any;
};
export type Layout = {
    layers: EventCueMap[];
    layerLabels: LayerLabel[];
};
export type CompactedLayout = {
    layers: Map<MakeShiftEvent, string>[];
    layerLabels: LayerLabel[];
};
export type Size = {
    width: number;
    height: number;
};
export declare function getMainWindow(): BrowserWindow;
/**
 * IPC Call API
 *
 * UI interactions with side effects - opening folders, running cues directly
 */
declare const ipcMainCallHandler: {
    openCueFolder: () => Promise<void>;
    runCue: (cueId: any) => Promise<void>;
};
/**
 * IPC Get API
 *
 * Gets state data in various formats
 */
declare const ipcMainGetHandler: {
    connectedDevices: () => Promise<MakeShiftPortFingerprint[]>;
    deviceEvents: () => Promise<MakeShiftDeviceEvents>;
    serialEvents: () => Promise<MakeShiftSerialEvents>;
    hardwareDescriptors: () => Promise<{
        MakeShift: any;
        Sensors: any;
    }>;
    eventsAsList: () => Promise<any[]>;
    logRank: () => Promise<{
        all: number;
        debug: number;
        deviceEvent: number;
        info: number;
        warn: number;
        error: number;
        fatal: number;
        none: number;
    }>;
    allCues: () => Promise<CueMap>;
    cueById: (id: any) => Promise<Cue>;
    cueByFolder: (folder: any) => Promise<CueMap>;
    clientSize: () => Promise<Size>;
    defaultTheme: () => Promise<Theme>;
    themeFromPath: (path: string) => Promise<Theme>;
};
/**
 * IPC Set API
 *
 * modifies state
 */
declare const ipcMainSetHandler: {
    cueFile: typeof saveCueFile;
    cueForEvent: (data: {
        cueId: string;
        event: string;
        contents: Uint8Array;
    }) => Promise<string>;
};
export declare function attachWatchers(): Promise<void>;
export declare function detachCueFromEvent({ layerName, event, cueId }: {
    layerName: string;
    event: MakeShiftEvent;
    cueId: CueId;
}): Promise<void>;
export declare function attachCueToEvent({ layerName, event, cueId }: {
    layerName: string;
    event: MakeShiftEvent;
    cueId: CueId;
}): Promise<void>;
/**
 * Exports
 */
export type IpcMainCallHandler = typeof ipcMainCallHandler;
export type IpcMainGetHandler = typeof ipcMainGetHandler;
export type IpcMainSetHandler = typeof ipcMainSetHandler;
export {};
