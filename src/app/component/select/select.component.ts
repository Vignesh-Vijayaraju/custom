import { Component, Input, OnInit } from '@angular/core';

type CrumpOptions = {value: string | number, option: string, status?: "disabled" | "danger" | "warning" };
@Component({
  selector: 'crump-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {

  @Input() 
  set options(value: CrumpOptions[]) {
    this._options = value;
  };


  get options() {
    return this._options;
  }

  @Input() disabled: boolean = false;

  @Input() placeholder: string = 'Select';

  @Input() type: 'multi' | 'default' = 'default';

  @Input() invalid: boolean = false;

  @Input() invalidText!: string;

  @Input() maxHeight: number = 250;

  protected _options!: CrumpOptions[];

  //Stores the Exact Filtered Values by default contains all the values
  filterOptions!: CrumpOptions[];

  //Used as a flag to Show and Hide Dropdowns on DOM Events
  isOpen: boolean = false;

  //Sets value of dropdown component
  dropdownValue: string = "";

  constructor() {}

  ngOnInit(): void {
    this.filterOptions = this.options;
  }
  

  /**
   * Filter as person inputs
   * gets the event
   */

  filter(event: any) {
    let filterValue = event.target?.value.toLowerCase();
      const p: any = filterValue ?? Array.from(filterValue).reduce(
        (a, v, i) => `[^${filterValue.substr(i)}]`,
        ''
      );
      const re = RegExp(p);

      this.filterOptions = this.options.filter((options) =>
        options.option.toLowerCase().match(re)
      );
  }

  /**:
   * On Focus and On Blur to show and Hide Dropdowns
   * takes no params
   */

  toggleDropdown() {
    this.isOpen = !this.disabled && !this.isOpen;
  }

 

  /**
   * On Select method to set the selected value
   * Option Object is passed
   */

  onSelect(option:CrumpOptions) {
    this.dropdownValue = option.status !== 'disabled' ? option.option : this.dropdownValue;
    this.toggleDropdown();
  }
}

export { CrumpOptions };
