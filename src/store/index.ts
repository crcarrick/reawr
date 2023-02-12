import Store from 'electron-store'

import { ThemeMode } from '../constants'
import type { IRecording } from '../types'

export interface IPreferences {
  readonly mode: ThemeMode
}

export interface IStore {
  readonly preferences: IPreferences
  readonly recordings: IRecording[]
}

export const store = new Store<IStore>({
  defaults: {
    preferences: {
      mode: ThemeMode.SYSTEM,
    },
    recordings: [],
  },
  schema: {
    preferences: {
      type: 'object',
      properties: {
        mode: {
          type: 'string',
        },
      },
    },
    recordings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          events: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                duration: {
                  type: 'number',
                },
                startTime: {
                  type: 'number',
                },
                endTime: {
                  type: 'number',
                },
              },
            },
          },
          recordingInfo: {
            type: 'object',
            properties: {
              mouseId: {
                type: 'string',
              },
              runId: {
                type: 'string',
              },
              testName: {
                type: 'string',
              },
              testDate: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
})
