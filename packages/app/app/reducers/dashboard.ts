import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';

import { DeezerEditorialCharts, DeezerTrack } from '@nuclear/core/src/rest/Deezer';
import { LastfmTopTag } from '@nuclear/core/src/rest/Lastfm.types';

import {loadBestNewAlbumsAction, loadBestNewTracksAction, loadEditorialChartsAction, loadTopTagsAction, loadTopTracksAction, PitchforkAlbum, PitchforkTrack} from '../actions/dashboard';
import { Dashboard } from '../actions/actionTypes';

export type DashboardReducerState = {
  bestNewAlbums: PitchforkAlbum[];
  bestNewTracks: PitchforkTrack[];
  topTracks: DeezerTrack[];
  topTags: LastfmTopTag[];

  editorialCharts?: DeezerEditorialCharts;
}

const initialState: DashboardReducerState = {
  bestNewAlbums: [],
  bestNewTracks: [],
  topTracks: [],
  topTags: [],
  editorialCharts: {
    playlists: {
      data: [],
      total: 0
    },
    tracks: {
      data: [],
      total: 0
    }
  }
};

const dashboardActions = {
  loadBestNewAlbumsAction,
  loadBestNewTracksAction,
  loadTopTagsAction,
  loadTopTracksAction,
  loadEditorialChartsAction
};

type DashboardReducerActions = ActionType<typeof dashboardActions>

const DashboardReducer = createReducer<DashboardReducerState, DashboardReducerActions>(initialState, {
  [Dashboard.LOAD_BEST_NEW_ALBUMS_SUCCESS]: (state, action) => produce(state, draft => {
    draft.bestNewAlbums = action.payload;
  }),
  [Dashboard.LOAD_BEST_NEW_TRACKS_SUCCESS]: (state, action) => produce(state, draft => {
    draft.bestNewTracks = action.payload;
  }),
  [Dashboard.LOAD_TOP_TRACKS_SUCCESS]: (state, action) => produce(state, draft => {
    draft.topTracks = action.payload;
  }),
  [Dashboard.LOAD_TOP_TAGS_SUCCESS]: (state, action) => produce(state, draft => {
    draft.topTags = action.payload;
  }),
  [Dashboard.LOAD_EDITORIAL_CHARTS_SUCCESS]: (state, action) => produce(state, draft => {
    draft.editorialCharts = action.payload;
  })
});

export default DashboardReducer;
