import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-equipaje-extra',
  templateUrl: './equipaje-extra.component.html',
  styleUrls: ['./equipaje-extra.component.css']
})
export class EquipajeExtraComponent implements OnInit {
  public params: any;
  extraCountmano: number = 0;
  extraCount23kg: number = 0;
  maxMaletas: number = 3;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.params = params;
        if (this.params.IV == "I") {

        }
        else {

        }

      }
    )

  }
  incrementExtraMano() {
    if (this.extraCountmano < this.maxMaletas) {
      this.extraCountmano++;
    }

  }
  decrementExtraMano() {
    if (this.extraCountmano > 0) {
      this.extraCountmano--;
    }
  }

  incrementExtra() {
    if (this.extraCount23kg < this.maxMaletas) {
      this.extraCount23kg++;
    }

  }
  decrementExtra() {
    if (this.extraCount23kg > 0) {
      this.extraCount23kg--;
    }
  }

}