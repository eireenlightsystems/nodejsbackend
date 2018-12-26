import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Fixture} from "../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() fixtures: Fixture[]
  @ViewChild('modal') modalRef: ElementRef

  selectedFixture: Fixture
  modal: MaterialInstance

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  selectFixture(fixture: Fixture) {
    this.selectedFixture = fixture
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }
}
