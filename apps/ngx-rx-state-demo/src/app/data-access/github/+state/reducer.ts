import {createReducer, on} from '@ngrx/store';
import {repositoryListFetchSuccess} from './actions';
import {RepositoryListItem} from './repository-list.model';
import {getData} from '../github.service';

export const GITHUB_FEATURE_KEY = 'github';

export interface GitHubState {
    user: string,
    list: RepositoryListItem[]
}
const initialGitHubState = {
    user: 'ReactiveX',
    list: getData()
};

export interface GitHubFeatureState {
    [GITHUB_FEATURE_KEY]: GitHubState
}

const _gitHubReducer = createReducer(
    initialGitHubState,
    on(repositoryListFetchSuccess, (state, action) => ({
            ...state,
            list: uniteItemArrays(state.list, action.list)
        })
    )
);

export const gitHubReducer = (state, action) => _gitHubReducer(state, action);

function uniteItemArrays(...arrs: RepositoryListItem[][]) {
    return Array.from(
        new Map(arrs
            .reduce((arr: any, a: any): any => arr.concat(a), [])
            .map(i => [i.id, i])
        ).entries()
    ).map(e => e[1])
}
