import {configureStore} from '@reduxjs/toolkit'
import {shazamCoreApi} from './features/shazam/shazamCore'
import playerReducer from './features/playerSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), shazamCoreApi.middleware],
  // middleware: {getDefaultMiddleware} => getDefaultMiddleware().concat(shazamCoreApi.middleware)
})
