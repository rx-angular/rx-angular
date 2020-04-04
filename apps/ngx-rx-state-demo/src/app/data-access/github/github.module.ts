import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {GitHubEffects} from "./+state/effects";
import {GITHUB_FEATURE_KEY, gitHubReducer} from "./+state/reducer";

@NgModule({
    imports: [
        StoreModule.forFeature(GITHUB_FEATURE_KEY, gitHubReducer),
        EffectsModule.forFeature([GitHubEffects]),
    ],
    declarations: [],
    bootstrap: []
})
export class GithubModule {


}
