import { inject } from '@angular/core';
import { PATTERN_CONSTANTS } from '@core/constant/common.const';
import { MessageService } from 'primeng/api';

export abstract class AppComponentBase {
  private readonly messageService = inject(MessageService);

  private showMessage(
    severity: 'success' | 'info' | 'warn' | 'error',
    summary = '',
    message = ''
  ) {
    this.messageService.clear('tms');
    this.messageService.add({
      key: 'tms',
      severity,
      summary,
      detail: message,
    });
  }

  showSuccessMessage(message = '') {
    this.showMessage('success', 'Success', message);
  }

  showInfoMessage(message: string) {
    this.showMessage('info', 'Information', message);
  }

  showWarningMessage(message: string) {
    this.showMessage('warn', 'Warning', message);
  }

  showErrorMessage(message: string) {
    this.showMessage('error', 'Error', message);
  }

  validatorMessages: Record<string, (error: any) => string> = {
    required: () => 'Trường này là bắt buộc.',
    minlength: (error: { requiredLength: number }) =>
      `Trường này phải có ít nhất ${error.requiredLength} ký tự.`,
    maxlength: (error: { requiredLength: number }) =>
      `Trường này không được vượt quá ${error.requiredLength} ký tự.`,
    email: () => 'Địa chỉ email không hợp lệ.',
    pattern: (error: { requiredPattern: string }) =>
      `Giá trị không khớp với mẫu: ${this.translateRequiredPatternToMsg(error.requiredPattern)}.`,
    min: (error: { min: number }) =>
      `Giá trị phải lớn hơn hoặc bằng ${error.min}.`,
    max: (error: { max: number }) =>
      `Giá trị phải nhỏ hơn hoặc bằng ${error.max}.`,
    custom: (error: { message: string }) =>
      error.message || 'Giá trị không hợp lệ.',
  };

  translateRequiredPatternToMsg(pattern: string): string {
    const patternMsgMap: Record<string, string> = {
      [PATTERN_CONSTANTS.ONLY_LETTERS_AND_SPACES]:
        'Chỉ chữ cái và khoảng trắng',
      [PATTERN_CONSTANTS.ONLY_NUMBERS]: 'Chỉ số',
      [PATTERN_CONSTANTS.ONLY_LETTERS_AND_NUMBERS]: 'Chỉ chữ cái và số',
    };
    return patternMsgMap[pattern] || `Giá trị không khớp với mẫu: ${pattern}.`;
  }
}
