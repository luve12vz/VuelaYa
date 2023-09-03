import { Component,ElementRef,EventEmitter,Input,OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-seleccion-asientos-regreso',
  templateUrl: './seleccion-asientos-regreso.component.html',
  styleUrls: ['./seleccion-asientos-regreso.component.css']
})
export class SeleccionAsientosRegresoComponent implements OnInit {
  rows: any[] = [];
  disabledCheckboxes: string[] = ['4A'];
  selected: number = 0;
  isRandomActive = false;
  public eventListenersAttached: boolean = false;
  @Input() maxSelectedCheckboxes: number = 0;
  @ViewChild('seatsContainer2') seatsContainer!: ElementRef;
  @Output() emitArrayAsientosR = new EventEmitter<string[]>();
  allCheckboxes: HTMLInputElement[] = [];
  constructor(private el: ElementRef) {
    // Agrega las filas y asientos a la estructura
    for (let rowNumber = 1; rowNumber <= 10; rowNumber++) {
      const seats = ['A', 'B', 'C', 'D', 'E', 'F']; // Asientos de A a F por fila
      const row = {
        rowNumber: rowNumber,
        seats: seats.map(seat => ({
          id: `${rowNumber}${seat}`,
          selected: false
        }))
      };
      this.rows.push(row);
    }
  }
  
  ngOnInit(): void {
    this.allCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    
  }


  // Selecciona aleatoriamente 'count' checkboxes de la matriz de checkboxes disponibles
  selectRandomCheckboxes() {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:not(:disabled)')) as HTMLInputElement[];
    const availableCheckboxes = checkboxes.filter((checkbox) => !this.selectedCheckboxes.includes(checkbox.id));
    let count = this.maxSelectedCheckboxes - this.selectedCheckboxes.length;

    while (count > 0 && availableCheckboxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCheckboxes.length);
      const randomCheckbox = availableCheckboxes.splice(randomIndex, 1)[0];
      randomCheckbox.checked = true;

      // Simular un evento 'change' en el checkbox seleccionado aleatoriamente
      const event = new Event('change', { bubbles: true });
      Object.defineProperty(event, 'target', { value: randomCheckbox, enumerable: true });

      this.handleCheckboxChange(event);

      count--;
    }
  }

  toggleRandom(): void {
    this.isRandomActive = !this.isRandomActive;

    if (!this.isRandomActive) {
      this.selectedCheckboxes = [];
      this.selected = 0;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false;
        }
      });
      this.rows.forEach((row) => {
        row.seats.forEach((seat) => {
          seat.selected = false;
        });
      });
      this.emitArrayAsientosR.emit(this.selectedCheckboxes);
      console.log(this.selectedCheckboxes);
    } 
    
    if (this.isRandomActive) {
      // Aquí puedes llamar a la función para seleccionar aleatoriamente los checkboxes
      this.selectedCheckboxes = [];
      this.selected = 0;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false;
        }
      });
      this.rows.forEach((row) => {
        row.seats.forEach((seat) => {
          seat.selected = false;
        });
      });
      this.selectRandomCheckboxes();
      this.emitArrayAsientosR.emit(this.selectedCheckboxes);
      console.log(this.selectedCheckboxes);
    }
  }


  selectedCheckboxes: string[] = [];

  extractSelectedCheckboxes() {
    this.selectedCheckboxes = [];

    for (const row of this.rows) {
      for (const seat of row.seats) {
        if (seat.selected) {
          this.selectedCheckboxes.push(seat.id);
        }
      }
    }
  }

  handleCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const rowIdMatches = checkbox.id.match(/^(\d+)/);
    if (rowIdMatches) {
      const rowId = Number(rowIdMatches[1]) - 1;
      const seatId = checkbox.id.charAt(1);
      if (rowId >= 0 && rowId <= this.rows.length) {
        const row = this.rows[rowId].seats;
        const selectedSeat = row.find(seat => seat.id === checkbox.id);

        if (selectedSeat) {
          selectedSeat.selected = checkbox.checked;
          this.extractSelectedCheckboxes();
        }

        if (checkbox.checked) {
          if (this.selectedCheckboxes.length <= this.maxSelectedCheckboxes) {
            this.selected++;
            console.log(this.selected);
          } else {
            checkbox.checked = false;
          }
        } else {
          this.selected--;
        }
      } else {
        console.log('Row ID fuera de límites:', rowId);
      }
    }
  }


  disableCheckboxes() {
    const checkboxes: NodeListOf<HTMLInputElement> = this.el.nativeElement.querySelectorAll(
      'input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
      if (this.disabledCheckboxes.includes(checkbox.id)) {
        checkbox.disabled = true;
      } else {
        checkbox.disabled = false;
      }
    });
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.emitArrayAsientosR.emit(this.selectedCheckboxes);
    this.displayStyle = "none";
  }
}