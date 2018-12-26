import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {FilterFixture} from "../../shared/interfaces";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-fixture-filter',
  templateUrl: './fixture-filter.component.html',
  styleUrls: ['./fixture-filter.component.css']
})
export class FixtureFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<FilterFixture>()
  isValid = true

  id_geograph: number
  id_owner: number
  id_fixture_type: number
  id_substation: number
  id_mode: number

  geographs = [
    {
      id_geograph: 1,
      name_geograph: "geograph 1"
    },
    {
      id_geograph: 2,
      name_geograph: "geograph 2"
    }
  ]

  owners = [
    {
      id_owner: 1,
      name_owner: "owner 1"
    },
    {
      id_owner: 2,
      name_owner: "owner 2"
    }
  ]

  fixture_types = [
    {
      id_fixture_type: 1,
      name_fixture_type: "type 1"
    },
    {
      id_fixture_type: 2,
      name_fixture_type: "type 2"
    }
  ]

  substations = [
    {
      id_substation: 1,
      name_substation: "substation 1"
    },
    {
      id_substation: 2,
      name_substation: "substation 2"
    }
  ]

  modes = [
    {
      id_mode: 0,
      name_mode: "mode 1"
    },
    {
      id_mode: 1,
      name_mode: "mode 2"
    }
  ]

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {

  }

  validate() {
    if (!this.id_geograph) {
      this.isValid = true
      return
    }
  }

  submitFilter() {
    const filter: FilterFixture = {
      id_geograph: -1,
      id_owner: -1,
      id_fixture_type: -1,
      id_substation: -1,
      id_mode: -1
    }

    if (this.id_geograph) {
      filter.id_geograph = this.id_geograph
    }
    if (this.id_owner) {
      filter.id_owner = this.id_owner
    }
    if (this.id_fixture_type) {
      filter.id_fixture_type = this.id_fixture_type
    }
    if (this.id_substation) {
      filter.id_substation = this.id_substation
    }
    if (this.id_mode) {
      filter.id_mode = this.id_mode
    }

    console.log('this.id_geograph=' + this.id_geograph)

    this.onFilter.emit(filter)
  }


}
