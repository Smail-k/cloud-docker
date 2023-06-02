import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}
let roleUser = localStorage.getItem('roleUser');
let menuItemss: Menu[] = [];
const getRole = roleUser;

  menuItemss = [
    {
      state: 'starter-manager',
      name: 'Dashboard',
      type: 'link',
      icon: 'content_copy'
    },
    {
      state: 'tache',
      name: 'Tache',
      type: 'sub',
      icon: 'book',
      children: [
        { state: 'liste', name: 'Liste', type: 'link' },
      ],
    },
    {
      state: 'affectation',
      name: 'Affecter Tache',
      type: 'sub',
      icon: 'book',
      children: [
        { state: 'liste', name: 'Liste', type: 'link' },
      ],
    },
  ]

const MENUITEMS: Menu[] = menuItemss;

@Injectable()
export class MenuItemsManager {
  
  getMenuitemManager(): Menu[] {
   // console.log('calll first 3');
    return MENUITEMS;
  }
}
