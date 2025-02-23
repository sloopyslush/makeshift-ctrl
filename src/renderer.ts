import { LogMessage, MakeShiftPortFingerprint } from "@eos-makeshift/serial"
import {
  IpcMainCallHandler,
  IpcMainGetHandler,
  IpcMainSetHandler,
  ipcMainDeleteHandler
} from 'types/electron/main/index'
import { CtrlIpcApi } from "electron/ipcApi"
import { Cue } from 'types/electron/main/cues'
import { MakeShiftBlockJSON } from "electron/main/blockly"

type CueEvHandler = (callback: (cue: Cue) => void) => () => void
type DeviceEvHandler = (callback: (fp: MakeShiftPortFingerprint) => void) => () => void
type TerminalEvHandler = (callback: (fp: LogMessage) => void) => () => void

export type View = 'blockly' | 'code'

export const ViewList: View[] = ['blockly', 'code']

export interface rndrCtrlAPI {
  test: (val: any) => void,
  call: IpcMainCallHandler,
  get: IpcMainGetHandler,
  set: IpcMainSetHandler,
  delete: ipcMainDeleteHandler,
  onEv: {
    blockly: {
      toolboxUpdate: (callback: (e: any, toolbox: any) => void) => void,
      blocksUpdate: (callback: (e: any, blocklist: MakeShiftBlockJSON[]) => void) => void,
      workspaceUpdate: (callback: (e: any, workspace: any) => void) => void,
      workspaceListUpdate:(callback: (e: any, workspaceList: string[]) => void) => void,
    },
    cue: {
      added: CueEvHandler,
      changed: CueEvHandler,
      removed: CueEvHandler,
    },
    device: {
      connected: DeviceEvHandler,
      disconnected: DeviceEvHandler,
    },
    terminal: {
      data: TerminalEvHandler
    },
  }
  removeListener: (evName: string, cb: any) => void,
}

export interface IPluginAPI {

}

declare global {
  interface Window {
    MakeShiftCtrl: rndrCtrlAPI
    plugin: IPluginAPI
    // cue: ICueAPI
  }
}
