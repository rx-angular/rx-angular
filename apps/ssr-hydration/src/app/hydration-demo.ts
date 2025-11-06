import {
  Component,
  effect,
  inject,
  Input,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { HydrationTrackerService } from './hydration-tracker';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-item',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p class="email">{{ user.email }}</p>
      <span class="role" [class]="'role-' + user.role.toLowerCase()">
        {{ user.role }}
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Item {
  @Input() user!: User;

  constructor() {
    doWork();
  }
}

function doWork() {
  let a = 0;
  for (let i = 0; i < 10000; i++) {
    a += i;
  }
}

@Component({
  selector: 'app-hydration-demo',
  imports: [RouterOutlet, RxFor, Item],
  encapsulation: ViewEncapsulation.None,

  template: `
    <div class="container">
      <div class="comparison-container">
        <div class="rx-for-section">
          <h2>RxFor Directive (with hydration)</h2>
          <div class="users-grid">
            <app-item
              *rxFor="let user of users(); trackBy: 'id'; strategy: 'low'"
              [user]="user"
            />
          </div>
        </div>

        @if (loadAfterHydration()) {
          <div class="rx-for-section">
            <h2>RxFor Directive (after hydration)</h2>
            <div class="users-grid">
              <app-item
                *rxFor="let user of users(); trackBy: 'id'"
                [user]="user"
              />
            </div>
          </div>
        }
      </div>
    </div>

    <router-outlet />
  `,
  styles: `
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        sans-serif;
    }

    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }

    h2 {
      color: #555;
      margin-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 10px;
    }

    .comparison-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }

    .users-section,
    .rx-for-section {
      margin-bottom: 0;
    }

    .users-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      margin-top: 20px;
      max-height: 600px;
      padding-right: 10px;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
    }

    .user-card {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 8px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      h3 {
        margin: 0;
        color: #333;
        font-size: 1.1em;
      }

      .email {
        color: #666;
        margin: 0;
        font-size: 0.85em;
      }

      .role {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.8em;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        &.role-admin {
          background-color: #ff6b6b;
          color: white;
        }

        &.role-manager {
          background-color: #4ecdc4;
          color: white;
        }

        &.role-user {
          background-color: #45b7d1;
          color: white;
        }
      }
    }
  `,
})
export class HydrationDemo {
  loadAfterHydration = signal(false);

  constructor() {
    const s = inject(HydrationTrackerService);
    effect(() => {
      const isHydrated = s.isFullyHydrated();

      untracked(() => {
        if (isHydrated) {
          this.loadAfterHydration.set(true);
        } else {
          this.loadAfterHydration.set(false);
        }
      });
    });
  }

  protected readonly users = signal<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'User',
    },
    { id: 6, name: 'David Miller', email: 'david@example.com', role: 'User' },
    { id: 7, name: 'Emma Davis', email: 'emma@example.com', role: 'Manager' },
    { id: 8, name: 'Frank Garcia', email: 'frank@example.com', role: 'User' },
    { id: 9, name: 'Grace Martinez', email: 'grace@example.com', role: 'User' },
    {
      id: 10,
      name: 'Henry Rodriguez',
      email: 'henry@example.com',
      role: 'Admin',
    },
    { id: 11, name: 'Ivy Anderson', email: 'ivy@example.com', role: 'User' },
    { id: 12, name: 'Jack Taylor', email: 'jack@example.com', role: 'User' },
    { id: 13, name: 'Kate Thomas', email: 'kate@example.com', role: 'Manager' },
    { id: 14, name: 'Liam Hernandez', email: 'liam@example.com', role: 'User' },
    { id: 15, name: 'Maya Moore', email: 'maya@example.com', role: 'User' },
    { id: 16, name: 'Noah Martin', email: 'noah@example.com', role: 'User' },
    {
      id: 17,
      name: 'Olivia Jackson',
      email: 'olivia@example.com',
      role: 'Admin',
    },
    { id: 18, name: 'Paul Thompson', email: 'paul@example.com', role: 'User' },
    { id: 19, name: 'Quinn White', email: 'quinn@example.com', role: 'User' },
    {
      id: 20,
      name: 'Rachel Harris',
      email: 'rachel@example.com',
      role: 'Manager',
    },
    {
      id: 21,
      name: 'Samuel Sanchez',
      email: 'samuel@example.com',
      role: 'User',
    },
    { id: 22, name: 'Tina Clark', email: 'tina@example.com', role: 'User' },
    { id: 23, name: 'Uma Ramirez', email: 'uma@example.com', role: 'User' },
    {
      id: 24,
      name: 'Victor Lewis',
      email: 'victor@example.com',
      role: 'Admin',
    },
    { id: 25, name: 'Wendy Lee', email: 'wendy@example.com', role: 'User' },
    {
      id: 26,
      name: 'Xavier Walker',
      email: 'xavier@example.com',
      role: 'User',
    },
    { id: 27, name: 'Yara Hall', email: 'yara@example.com', role: 'Manager' },
    { id: 28, name: 'Zoe Allen', email: 'zoe@example.com', role: 'User' },
    { id: 29, name: 'Adam Young', email: 'adam@example.com', role: 'User' },
    { id: 30, name: 'Bella King', email: 'bella@example.com', role: 'User' },
    { id: 31, name: 'Caleb Wright', email: 'caleb@example.com', role: 'Admin' },
    { id: 32, name: 'Diana Lopez', email: 'diana@example.com', role: 'User' },
    { id: 33, name: 'Ethan Hill', email: 'ethan@example.com', role: 'User' },
    {
      id: 34,
      name: 'Fiona Scott',
      email: 'fiona@example.com',
      role: 'Manager',
    },
    { id: 35, name: 'George Green', email: 'george@example.com', role: 'User' },
    { id: 36, name: 'Hannah Adams', email: 'hannah@example.com', role: 'User' },
    { id: 37, name: 'Ian Baker', email: 'ian@example.com', role: 'User' },
    {
      id: 38,
      name: 'Julia Gonzalez',
      email: 'julia@example.com',
      role: 'Admin',
    },
    { id: 39, name: 'Kevin Nelson', email: 'kevin@example.com', role: 'User' },
    { id: 40, name: 'Luna Carter', email: 'luna@example.com', role: 'User' },
    {
      id: 41,
      name: 'Marcus Mitchell',
      email: 'marcus@example.com',
      role: 'Manager',
    },
    { id: 42, name: 'Nora Perez', email: 'nora@example.com', role: 'User' },
    { id: 43, name: 'Oscar Roberts', email: 'oscar@example.com', role: 'User' },
    {
      id: 44,
      name: 'Penelope Turner',
      email: 'penelope@example.com',
      role: 'User',
    },
    {
      id: 45,
      name: 'Quentin Phillips',
      email: 'quentin@example.com',
      role: 'Admin',
    },
    { id: 46, name: 'Ruby Campbell', email: 'ruby@example.com', role: 'User' },
    {
      id: 47,
      name: 'Sebastian Parker',
      email: 'sebastian@example.com',
      role: 'User',
    },
    {
      id: 48,
      name: 'Tessa Evans',
      email: 'tessa@example.com',
      role: 'Manager',
    },
    { id: 49, name: 'Uriah Edwards', email: 'uriah@example.com', role: 'User' },
    {
      id: 50,
      name: 'Violet Collins',
      email: 'violet@example.com',
      role: 'User',
    },
    {
      id: 51,
      name: 'William Stewart',
      email: 'william@example.com',
      role: 'User',
    },
    {
      id: 52,
      name: 'Ximena Sanchez',
      email: 'ximena@example.com',
      role: 'Admin',
    },
    { id: 53, name: 'Yusuf Morris', email: 'yusuf@example.com', role: 'User' },
    { id: 54, name: 'Zara Rogers', email: 'zara@example.com', role: 'User' },
    { id: 55, name: 'Aaron Reed', email: 'aaron@example.com', role: 'Manager' },
    {
      id: 56,
      name: 'Brianna Cook',
      email: 'brianna@example.com',
      role: 'User',
    },
    {
      id: 57,
      name: 'Cameron Morgan',
      email: 'cameron@example.com',
      role: 'User',
    },
    {
      id: 58,
      name: 'Delilah Bell',
      email: 'delilah@example.com',
      role: 'User',
    },
    { id: 59, name: 'Eli Murphy', email: 'eli@example.com', role: 'Admin' },
    { id: 60, name: 'Faith Bailey', email: 'faith@example.com', role: 'User' },
    {
      id: 61,
      name: 'Gabriel Rivera',
      email: 'gabriel@example.com',
      role: 'User',
    },
    {
      id: 62,
      name: 'Hazel Cooper',
      email: 'hazel@example.com',
      role: 'Manager',
    },
    {
      id: 63,
      name: 'Isaac Richardson',
      email: 'isaac@example.com',
      role: 'User',
    },
    { id: 64, name: 'Jasmine Cox', email: 'jasmine@example.com', role: 'User' },
    { id: 65, name: 'Kai Howard', email: 'kai@example.com', role: 'User' },
    { id: 66, name: 'Lily Ward', email: 'lily@example.com', role: 'Admin' },
    { id: 67, name: 'Mason Torres', email: 'mason@example.com', role: 'User' },
    {
      id: 68,
      name: 'Natalie Peterson',
      email: 'natalie@example.com',
      role: 'User',
    },
    { id: 69, name: 'Owen Gray', email: 'owen@example.com', role: 'Manager' },
    { id: 70, name: 'Piper Ramirez', email: 'piper@example.com', role: 'User' },
    { id: 71, name: 'Quinn James', email: 'quinn@example.com', role: 'User' },
    { id: 72, name: 'Riley Watson', email: 'riley@example.com', role: 'User' },
    {
      id: 73,
      name: 'Sophia Brooks',
      email: 'sophia@example.com',
      role: 'Admin',
    },
    { id: 74, name: 'Tyler Kelly', email: 'tyler@example.com', role: 'User' },
    { id: 75, name: 'Uma Sanders', email: 'uma@example.com', role: 'User' },
    {
      id: 76,
      name: 'Vincent Price',
      email: 'vincent@example.com',
      role: 'Manager',
    },
    {
      id: 77,
      name: 'Willow Bennett',
      email: 'willow@example.com',
      role: 'User',
    },
    { id: 78, name: 'Xander Wood', email: 'xander@example.com', role: 'User' },
    { id: 79, name: 'Yara Barnes', email: 'yara@example.com', role: 'User' },
    {
      id: 80,
      name: 'Zachary Ross',
      email: 'zachary@example.com',
      role: 'Admin',
    },
    { id: 81, name: 'Aria Henderson', email: 'aria@example.com', role: 'User' },
    { id: 82, name: 'Blake Coleman', email: 'blake@example.com', role: 'User' },
    {
      id: 83,
      name: 'Chloe Jenkins',
      email: 'chloe@example.com',
      role: 'Manager',
    },
    { id: 84, name: 'Dylan Perry', email: 'dylan@example.com', role: 'User' },
    { id: 85, name: 'Elena Powell', email: 'elena@example.com', role: 'User' },
    { id: 86, name: 'Felix Long', email: 'felix@example.com', role: 'User' },
    {
      id: 87,
      name: 'Gianna Patterson',
      email: 'gianna@example.com',
      role: 'Admin',
    },
    {
      id: 88,
      name: 'Hunter Hughes',
      email: 'hunter@example.com',
      role: 'User',
    },
    { id: 89, name: 'Iris Flores', email: 'iris@example.com', role: 'User' },
    {
      id: 90,
      name: 'Jaxon Washington',
      email: 'jaxon@example.com',
      role: 'Manager',
    },
    {
      id: 91,
      name: 'Kendall Butler',
      email: 'kendall@example.com',
      role: 'User',
    },
    { id: 92, name: 'Layla Simmons', email: 'layla@example.com', role: 'User' },
    { id: 93, name: 'Miles Foster', email: 'miles@example.com', role: 'User' },
    { id: 94, name: 'Nova Gonzales', email: 'nova@example.com', role: 'Admin' },
    { id: 95, name: 'Orion Bryant', email: 'orion@example.com', role: 'User' },
    {
      id: 96,
      name: 'Paisley Alexander',
      email: 'paisley@example.com',
      role: 'User',
    },
    {
      id: 97,
      name: 'Quinton Russell',
      email: 'quinton@example.com',
      role: 'Manager',
    },
    { id: 98, name: 'Raven Griffin', email: 'raven@example.com', role: 'User' },
    { id: 99, name: 'Sage Diaz', email: 'sage@example.com', role: 'User' },
    {
      id: 100,
      name: 'Tristan Hayes',
      email: 'tristan@example.com',
      role: 'User',
    },
    { id: 101, name: 'Uma Myers', email: 'uma@example.com', role: 'Admin' },
    { id: 102, name: 'Violet Ford', email: 'violet@example.com', role: 'User' },
    {
      id: 103,
      name: 'Wesley Hamilton',
      email: 'wesley@example.com',
      role: 'User',
    },
    {
      id: 104,
      name: 'Xara Graham',
      email: 'xara@example.com',
      role: 'Manager',
    },
    {
      id: 105,
      name: 'Yosef Sullivan',
      email: 'yosef@example.com',
      role: 'User',
    },
  ]);
}
