import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appAutoEllipsis]',
  standalone: true,
})
export class AutoEllipsisDirective implements AfterViewInit, OnDestroy {
  // Tự động set các thuộc tính CSS bắt buộc để kiểm tra overflow
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.whiteSpace') whiteSpace = 'nowrap';
  @HostBinding('style.overflow') overflow = 'hidden';
  @HostBinding('style.textOverflow') textOverflow = 'ellipsis';

  private resizeObserver?: ResizeObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const element = this.el?.nativeElement;

    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    // Đợi 1 frame để trình duyệt render xong layout thực tế của Table Cell
    requestAnimationFrame(() => {
      this.initResizeObserver(element);
    });
  }

  private initResizeObserver(element: HTMLElement) {
    this.resizeObserver = new ResizeObserver(() => {
      this.checkOverflow(element);
    });

    this.resizeObserver.observe(element);
  }

  private checkOverflow(element: HTMLElement) {
    if (element.scrollWidth > element.clientWidth) {
      this.textOverflow = 'ellipsis';
    } else {
      // Nếu muốn giữ nguyên ellipsis mọi lúc khi tràn thì bỏ dòng else này
      this.textOverflow = 'clip';
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }
}
