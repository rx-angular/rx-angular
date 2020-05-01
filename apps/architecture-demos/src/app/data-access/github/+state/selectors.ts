import { createSelector } from '@ngrx/store';
import { GitHubFeatureState, GitHubState } from './reducer';

export const selectGitHub = (globalState: any) => {
  return globalState.github;
};

export const selectRepositoryList = createSelector(
  selectGitHub,
  (state: GitHubState) => state.list
);
