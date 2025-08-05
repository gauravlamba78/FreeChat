import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import conversionsSlice from "./conversions/conversionsSlice";
import documentsSlice from "./documents/documentsSlice";
import imagesSlice from "./images/imagesSlice";
import voice_interactionsSlice from "./voice_interactions/voice_interactionsSlice";
import rolesSlice from "./roles/rolesSlice";
import permissionsSlice from "./permissions/permissionsSlice";
import organizationsSlice from "./organizations/organizationsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
conversions: conversionsSlice,
documents: documentsSlice,
images: imagesSlice,
voice_interactions: voice_interactionsSlice,
roles: rolesSlice,
permissions: permissionsSlice,
organizations: organizationsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
