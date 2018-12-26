import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import {Router} from '@angular/router'
import {Subscription} from "rxjs";

import {AuthService} from '../../services/auth.service'
import {MaterialService} from '../../classes/material.service'
import {strictEqual} from "assert";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef
  aSub: Subscription

  links = [
    {url: '/fixture', name: 'Светильники'},
    {url: '/fixturegroup', name: 'Группы светильников'}
  ]

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    //this.aSub нужен чтобы удалить компонент из памяти
    this.aSub = this.auth.logout().subscribe(
      () => this.router.navigate(['/login']),
    )
    //Обязательно очистить токен
    this.auth.clearToken();
  }

}
