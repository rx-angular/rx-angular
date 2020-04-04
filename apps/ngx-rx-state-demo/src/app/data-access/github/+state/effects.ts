import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {GitHubService} from '../github.service';
import {fetchRepositoryList, repositoryListFetchError, repositoryListFetchSuccess} from './actions';

@Injectable({
    providedIn: 'root'
})
export class GitHubEffects {

    fetchGithubRepositoriesList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchRepositoryList.type),
            switchMap(action =>
                this.gitHubService.getData(action).pipe(
                    tap(v => console.log('EFFECT fetch Data', v)),
                    map(list => repositoryListFetchSuccess({list})),
                    catchError(error => of(repositoryListFetchError({error})))
                )
            )
        )
    );

    constructor(private actions$: Actions, private gitHubService: GitHubService) {

    }

}
