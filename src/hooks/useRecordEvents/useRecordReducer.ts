import { useCallback, useReducer } from 'react'

import type { IEvent } from '../../types'

const ADD_CURRENT_EVENT = 'ADD_CURRENT_EVENT' as const
const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT' as const

type AddCurrentEventAction = {
  readonly type: typeof ADD_CURRENT_EVENT
  readonly payload: { readonly elapsed: number }
}

type SetCurrentEventAction = {
  readonly type: typeof SET_CURRENT_EVENT
  readonly payload: Pick<IEvent, 'name' | 'startTime'>
}

type Action = AddCurrentEventAction | SetCurrentEventAction
type State = {
  readonly events: IEvent[]
  readonly currentEvent: Pick<IEvent, 'name' | 'startTime'>
}

const initialState: State = {
  events: [],
  currentEvent: {
    name: null,
    startTime: null,
  },
}

function reducer(state: State, action: Action): State {
  if (action.type === ADD_CURRENT_EVENT) {
    // bail out if we have no currentEvent
    // this can happen as a result of the "autosave" behavior
    // that happens when the recording timer stops
    if (Object.values(state.currentEvent).includes(null)) {
      return state
    }

    const endTime = action.payload.elapsed
    const duration = endTime - state.currentEvent.startTime

    return {
      ...state,
      events: [
        ...state.events,
        {
          ...state.currentEvent,
          duration,
          endTime,
        },
      ],
      currentEvent: {
        name: null,
        startTime: null,
      },
    }
  }

  if (action.type === SET_CURRENT_EVENT) {
    return {
      ...state,
      currentEvent: action.payload,
    }
  }

  return state
}

export function useRecordReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addCurrentEvent = useCallback(
    (payload: AddCurrentEventAction['payload']) =>
      dispatch({ type: ADD_CURRENT_EVENT, payload }),
    []
  )
  const setCurrentEvent = useCallback(
    (payload: SetCurrentEventAction['payload']) =>
      dispatch({ type: SET_CURRENT_EVENT, payload }),
    []
  )

  return {
    state,
    addCurrentEvent,
    setCurrentEvent,
  }
}
