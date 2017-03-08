import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') get opened() {
    // bind to the host element's 'open' class.
    // Retun property's boolean value to show/hide nav dropdown.
    return this.isOpen;
  }

  @HostListener('click') open() {
    // Toggle the boolean value when host element is clicked
    // Shows or hides dropdown
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave') close() {
    // When the mouse leaves host element, set value to false.  Close
    this.isOpen = false;
  }

  private isOpen: boolean = false;
}
