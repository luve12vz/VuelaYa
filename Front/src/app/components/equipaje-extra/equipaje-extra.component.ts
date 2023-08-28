import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipaje-extra',
  templateUrl: './equipaje-extra.component.html',
  styleUrls: ['./equipaje-extra.component.css']
})
export class EquipajeExtraComponent implements OnInit {
  public params: any;
  constructor(private route: ActivatedRoute) { 

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params=>{
        this.params = params;
        if(this.params.IV == "I"){
          
        }
        else{

        }
        
      }
    )

  }

}
