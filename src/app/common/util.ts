import {reduce} from 'underscore';
import {HttpErrorResponse} from '@angular/common/http';

export function sum(array) {
  return reduce(array,
    (acc, cur) => acc + cur || 0, 0);
}

export function errorHandler(error: any) {
  if (error.name === 'HttpErrorResponse') {
    const httpError = error as HttpErrorResponse;
    if (httpError.status === 404) {
      alert('404 资源未找到');
      return;
    }
    if (httpError.status >= 500) {
      alert(`${httpError.status} 服务器内部错误`);
      return;
    }
  }
  console.error(error);
}

export function handle404(message: string) {
  return (error: any) => {
    if (error.name === 'HttpErrorResponse') {
      const httpError = error as HttpErrorResponse;
      if (httpError.status === 404) {
        alert(message);
        return;
      }
    }
    errorHandler(error);
  };
}
