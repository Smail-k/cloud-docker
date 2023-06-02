import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';


import { MenuItems } from '../../../shared/menu-items/menu-items';
import { MyserviceService } from 'src/app/myservice.service';
import { MenuItemsManager } from 'src/app/shared/menu-items/menu-items-manager';
import { MenuItemsCollab } from 'src/app/shared/menu-items/menu-items-collab';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: []
})

export class VerticalAppSidebarComponent implements OnDestroy, OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  status = true;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;
  roleUser: any;
  userName: any;
  menuItemsByRole: any;
  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  //constructor(public authService: MyserviceService){}
  constructor(
    public authServ: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public menuMana: MenuItemsManager,
    public menuCollab: MenuItemsCollab
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.userName = localStorage.getItem('loggedUser');
    this.roleUser = localStorage.getItem('roleUser');
    
    if (this.roleUser === 'Manager') {
      this.menuItemsByRole = this.menuMana.getMenuitemManager();
    } else if (this.roleUser === 'Admin') {
      this.menuItemsByRole = this.menuItems.getMenuitem();
    }else if(this.roleUser === 'Collaborateur'){
      this.menuItemsByRole = this.menuCollab.getMenuitemCollab();
    }

  }
  signOut() {
    this.authServ.logout();
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
