import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appLineClamp]',
  standalone: true,
})
export class LineClampDirective {
  // Cho phép truyền số dòng từ HTML (mặc định là 2 nếu không truyền)
  @Input('appLineClamp') lines: number | string = 2;

  // Xóa bỏ hoàn toàn white-space: nowrap!
  @HostBinding('style.display') display = '-webkit-box';
  @HostBinding('style.-webkit-box-orient') boxOrient = 'vertical';
  @HostBinding('style.overflow') overflow = 'hidden';
  @HostBinding('style.wordBreak') wordBreak = 'break-word';

  @HostBinding('style.-webkit-line-clamp')
  get lineClamp() {
    return this.lines || 2;
  }
}
