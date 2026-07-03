import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  deleteProp,
  insert,
  patch,
  remove,
  setProp,
  toggle,
  update,
  upsert,
} from '@rx-angular/cdk/transformations';
import { DocsLinkComponent } from '../../../shared/docs-link/docs-link.component';

interface User {
  id: number;
  name: string;
  active: boolean;
}

interface Settings {
  theme: string;
  fontSize: number;
  darkMode: boolean;
  beta?: boolean;
}

const INITIAL_USERS: User[] = [
  { id: 1, name: 'Ada', active: true },
  { id: 2, name: 'Linus', active: false },
  { id: 3, name: 'Grace', active: true },
];

const INITIAL_SETTINGS: Settings = {
  theme: 'light',
  fontSize: 14,
  darkMode: false,
  beta: true,
};

/**
 * Small presentational block that pretty-prints a value as JSON and shows
 * whether it is a brand-new reference (the whole point of immutable helpers).
 */
@Component({
  selector: 'rxa-json-ref-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="block">
      <div class="block-head">
        <span class="label">{{ label() }}</span>
        @if (isNewRef()) {
          <span class="badge new">new reference</span>
        }
      </div>
      <pre>{{ pretty() }}</pre>
    </div>
  `,
  styles: [
    `
      .block {
        flex: 1 1 18rem;
        min-width: 14rem;
      }
      .block-head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
      }
      .label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #57606a;
      }
      .badge.new {
        background: #1a7f37;
        color: #fff;
        font-size: 0.7rem;
        padding: 0.05rem 0.4rem;
        border-radius: 999px;
      }
      pre {
        margin: 0;
        padding: 0.5rem;
        background: #0d1117;
        color: #c9d1d9;
        border-radius: 6px;
        font-size: 0.78rem;
        overflow-x: auto;
        max-height: 16rem;
      }
    `,
  ],
})
export class JsonAndRefBlock {
  readonly label = input('');
  readonly value = input<unknown>(null);
  readonly isNewRef = input(false);

  protected readonly pretty = computed(() =>
    JSON.stringify(this.value(), null, 2),
  );
}

/**
 * Demo for `@rx-angular/cdk/transformations`.
 *
 * Every helper returns a brand-new array/object (a shallow copy) instead of
 * mutating the input, which is exactly what signal-based state wants. The demo
 * keeps the previous value around so you can literally see the immutable
 * transformation: the source on the left, the result on the right, with a
 * referential-equality check proving a new reference was produced.
 */
@Component({
  selector: 'rxa-transformations-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsLinkComponent, JsonAndRefBlock],
  template: `
    <rxa-docs-link
      docs="cdk/transformations/transformations"
      source="apps/demos/src/app/features/cdk/transformations"
    />

    <h2>CDK · Transformations</h2>
    <p class="lead">
      <code>&#64;rx-angular/cdk/transformations</code> ships small, strictly
      typed helpers that update arrays and objects <strong>immutably</strong>.
      Each call returns a fresh reference — perfect for signals,
      <code>OnPush</code> change detection and any state that relies on identity
      checks. Click a button below and watch a new value (and a new reference)
      appear without ever touching the previous one.
    </p>

    <section class="demo-card">
      <h3>Array helpers</h3>
      <p class="note">
        <code>insert</code> appends, <code>update</code>/<code>upsert</code>
        merge by a compare key, <code>remove</code> drops matches and
        <code>toggle</code> flips a boolean on every item. The source array is
        never mutated.
      </p>

      <div class="controls">
        <button (click)="insertUser()">insert()</button>
        <button (click)="updateFirst()">update() first</button>
        <button (click)="upsertUser()">upsert()</button>
        <button (click)="removeLast()">remove() last</button>
        <button (click)="toggleActive()">toggle() active</button>
        <button class="ghost" (click)="resetUsers()">reset</button>
      </div>

      <p class="op">
        last op: <strong>{{ lastUserOp() }}</strong>
      </p>

      <div class="before-after">
        <rxa-json-ref-block label="before" [value]="prevUsers()" />
        <span class="arrow">→</span>
        <rxa-json-ref-block
          label="after"
          [value]="users()"
          [isNewRef]="usersChangedRef()"
        />
      </div>
    </section>

    <section class="demo-card">
      <h3>Object helpers</h3>
      <p class="note">
        <code>patch</code> merges a partial, <code>setProp</code> sets one typed
        key, <code>deleteProp</code> removes a key and <code>toggle</code> flips
        a boolean field. Again, a new object is returned every time.
      </p>

      <div class="controls">
        <button (click)="patchSettings()">patch()</button>
        <button (click)="bumpFontSize()">setProp() fontSize</button>
        <button (click)="toggleDarkMode()">toggle() darkMode</button>
        <button (click)="dropBeta()">deleteProp() beta</button>
        <button class="ghost" (click)="resetSettings()">reset</button>
      </div>

      <p class="op">
        last op: <strong>{{ lastSettingsOp() }}</strong>
      </p>

      <div class="before-after">
        <rxa-json-ref-block label="before" [value]="prevSettings()" />
        <span class="arrow">→</span>
        <rxa-json-ref-block
          label="after"
          [value]="settings()"
          [isNewRef]="settingsChangedRef()"
        />
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .lead {
        max-width: 70ch;
      }
      .demo-card {
        border: 1px solid #d0d7de;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1.25rem;
        background: #fafbfc;
      }
      .demo-card h3 {
        margin-top: 0;
      }
      .note {
        color: #57606a;
        max-width: 70ch;
      }
      .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 0.75rem 0;
      }
      .controls button {
        cursor: pointer;
        border: 1px solid #0969da;
        background: #0969da;
        color: #fff;
        border-radius: 6px;
        padding: 0.35rem 0.75rem;
        font-size: 0.85rem;
      }
      .controls button.ghost {
        background: #fff;
        color: #57606a;
        border-color: #d0d7de;
      }
      .op {
        font-size: 0.85rem;
        color: #1a7f37;
        margin: 0 0 0.5rem;
        min-height: 1.2em;
      }
      .before-after {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .arrow {
        font-size: 1.5rem;
        color: #57606a;
      }
    `,
  ],
})
export class TransformationsComponent {
  // --- array state ---------------------------------------------------------
  protected readonly users = signal<User[]>(INITIAL_USERS);
  protected readonly prevUsers = signal<User[]>(INITIAL_USERS);
  protected readonly lastUserOp = signal('—');
  protected readonly usersChangedRef = computed(
    () => this.users() !== this.prevUsers(),
  );

  // --- object state --------------------------------------------------------
  protected readonly settings = signal<Settings>(INITIAL_SETTINGS);
  protected readonly prevSettings = signal<Settings>(INITIAL_SETTINGS);
  protected readonly lastSettingsOp = signal('—');
  protected readonly settingsChangedRef = computed(
    () => this.settings() !== this.prevSettings(),
  );

  private nextId = 4;

  // --- array operations ----------------------------------------------------
  insertUser(): void {
    this.applyUsers(
      (list) =>
        insert(list, {
          id: this.nextId,
          name: `User ${this.nextId}`,
          active: true,
        }),
      `insert(list, { id: ${this.nextId++}, ... })`,
    );
  }

  updateFirst(): void {
    const first = this.users()[0];
    if (!first) {
      return;
    }
    this.applyUsers(
      (list) => update(list, { id: first.id, name: `${first.name}*` }, 'id'),
      `update(list, { id: ${first.id}, name: '${first.name}*' }, 'id')`,
    );
  }

  upsertUser(): void {
    // id 2 already exists (updated), id 99 is new (inserted)
    this.applyUsers(
      (list) =>
        upsert(
          list,
          [
            { id: 2, name: 'Linus (upserted)', active: true },
            { id: 99, name: 'Brand new', active: true },
          ],
          'id',
        ),
      `upsert(list, [{ id: 2, ... }, { id: 99, ... }], 'id')`,
    );
  }

  removeLast(): void {
    const last = this.users().at(-1);
    if (!last) {
      return;
    }
    this.applyUsers(
      (list) => remove(list, last, 'id'),
      `remove(list, { id: ${last.id} }, 'id')`,
    );
  }

  toggleActive(): void {
    this.applyUsers(
      (list) => list.map((u) => toggle(u, 'active')),
      `list.map(u => toggle(u, 'active'))`,
    );
  }

  resetUsers(): void {
    this.applyUsers(() => INITIAL_USERS, 'reset');
    this.nextId = 4;
  }

  // --- object operations ---------------------------------------------------
  patchSettings(): void {
    this.applySettings(
      (s) => patch(s, { theme: 'solarized', fontSize: 16 }),
      `patch(settings, { theme: 'solarized', fontSize: 16 })`,
    );
  }

  bumpFontSize(): void {
    this.applySettings(
      (s) => setProp(s, 'fontSize', s.fontSize + 1),
      `setProp(settings, 'fontSize', fontSize + 1)`,
    );
  }

  toggleDarkMode(): void {
    this.applySettings(
      (s) => toggle(s, 'darkMode'),
      `toggle(settings, 'darkMode')`,
    );
  }

  dropBeta(): void {
    this.applySettings(
      (s) => deleteProp(s, 'beta') as Settings,
      `deleteProp(settings, 'beta')`,
    );
  }

  resetSettings(): void {
    this.applySettings(() => INITIAL_SETTINGS, 'reset');
  }

  // --- helpers -------------------------------------------------------------
  private applyUsers(transform: (list: User[]) => User[], op: string): void {
    const current = this.users();
    this.prevUsers.set(current);
    this.users.set(transform(current));
    this.lastUserOp.set(op);
  }

  private applySettings(
    transform: (s: Settings) => Settings,
    op: string,
  ): void {
    const current = this.settings();
    this.prevSettings.set(current);
    this.settings.set(transform(current));
    this.lastSettingsOp.set(op);
  }
}
