import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Observable, Subscription} from 'rxjs/index'

import {MaterialService, MaterialInstance} from '../shared/classes/material.service'
import {FixtureService} from '../shared/services/fixture.service'
import {FilterFixture, Fixture} from '../shared/interfaces'

const STEP = 3

@Component({
  selector: 'app-fixture-page',
  templateUrl: './fixture-page.component.html',
  styleUrls: ['./fixture-page.component.css']
})
export class FixturePageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef

  fixtures: Fixture[] = []
  filter: FilterFixture = {
    id_geograph: -1,
    id_owner: -1,
    id_fixture_type: -1,
    id_substation: -1,
    id_mode: -1
  }
  tooltip: MaterialInstance
  oSub: Subscription
  isFilterVisible = false

  offset = 0
  limit = STEP

  loading = false
  reloading = false
  noMoreFixtures = false

  constructor(private fixtureService: FixtureService) {
  }

  ngOnInit() {
    this.fetch()
    this.reloading = true
  }

  private fetch() {
    const params = Object.assign({}, {
        offset: this.offset,
        limit: this.limit
      },
      this.filter)

    this.oSub = this.fixtureService.fetch(params).subscribe(fixtures => {
      this.fixtures = this.fixtures.concat(fixtures)
      this.noMoreFixtures = fixtures.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  applyFilter(filter: FilterFixture) {
    this.fixtures = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }
}

