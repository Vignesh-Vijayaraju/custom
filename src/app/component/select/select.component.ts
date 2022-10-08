import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

type CrumpOptions = {value: string | number, option: string, status?: "disabled" | "danger" | "warning" };
@Component({
  selector: 'crump-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  /**
	 * Contains the options for the selctbox with type CrumpOptions.
	 */
  @Input() 
  set options(value: CrumpOptions[]) {
    this._options = value;
  };

  get options() {
    return this._options;
  }

  /**
	 * Property to Disable the Dropdown
   * default = false
	 */
  @Input() 
  set disabled(value: boolean) {
    this._disabled = value;
  };

  get disabled() {
    return this._disabled;
  }

  /**
	 * Property to show default text.
   * default = 'Select'
	 */
  @Input() 
  set placeholder(value: string) {
    this._placeholder = value;
  };

  get placeholder() {
    return this._placeholder;
  }

  /**
	 * Property to show dropdown type, either multiple or default
   * default = 'default'
	 */
  @Input() 
  set type(value: 'multi' | 'default') {
    this._type = value;
  };

  get type() {
    return this._type;
  }

  /**
	 * Property to show form invalid state
   * default = false
	 */
  @Input() 
  set invalid(value: boolean) {
    this._invalid = value;
  };

  get invalid() {
    return this._invalid;
  }

  /**
	 * Property to show form invalid state text
   * default = ''
	 */
  @Input() 
  set invalidText(value: string) {
    this._invalidText = value;
  };

  get invalidText() {
    return this._invalidText;
  }

  /**
	 * Property to add max height to the dropdown
   * default = 250
	 */
  @Input() 
  set maxHeight(value: number) {
    this._maxHeight = value;
  };


  get maxHeight() {
    return this._maxHeight;
  }

  @ViewChild('crumpdropdown') crumpDropdown!:ElementRef;
  @ViewChild('dropdowninput') dropdownInput!:ElementRef;

  protected _options!: CrumpOptions[];
  protected _disabled: boolean = false;
  protected _placeholder: string = 'Select';
  protected _type: 'multi' | 'default' = 'default';;
  protected _invalid: boolean = false;
  protected _invalidText!: string;
  protected _maxHeight: number = 250;

  //Stores the Exact Filtered Values by default contains all the values
  filterOptions!: CrumpOptions[];

  //Used as a flag to Show and Hide Dropdowns on DOM Events
  isOpen: boolean = false;

  //Sets value of dropdown component
  dropdownValue: string = "";

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterOptions = this.options;
  }
  

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event:any): void {
     if (!this.crumpDropdown.nativeElement.contains(event.target)) {
        // clicked outside => close dropdown list
     this.isOpen = false;
     }
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
    this.isOpen && this.dropdownInput.nativeElement.select();
  }

  /**
   * On Click Select the content inside dropdown
   */
  onDropdownClick(event: any) {
  }
 

  /**
   * On Select method to set the selected value
   * Option Object is passed
   */

  onSelect(option:CrumpOptions) {
    this.dropdownValue = option.status !== 'disabled' ? option.option : this.dropdownValue;
    this.dropdownInput.nativeElement.value = this.dropdownValue;
    this.toggleDropdown();
  }
}

export { CrumpOptions };
