import { NgOptimizedImage } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="header__logo">
        <img class="logo__img" src="assets/logo.svg" alt="" />
        <a routerLink="/">ngx-isr</a>
      </div>
      <div class="header__nav">
        <a href="https://github.com/eneajaho/ngx-isr?source=docs" target="_blank">
            <img ngSrc="assets/github-mark.svg" width="20" height="20" alt="Github logo">
            <span>Github</span>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 60px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header__logo {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        transition: all 0.2s ease-in-out;
      }
      .header__logo:hover {
        transform: scale(1.05);
      }
      .logo__img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .header__nav {
        display: flex;
        align-items: center;
      }
      .header__nav a {
        font-size: 16px;
        padding: 6px 12px;
        border-radius: 4px;
        color: #000;
        transition: all 0.2s ease-in-out;
        margin-left: 10px;

        display: flex;
        align-items: center;
        gap: 5px
      }
      .header__nav a:hover {
        background: rgb(170 173 195 / 16%);
      }
    `,
  ],
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
