/// <reference types="react-scripts" />

declare module 'clevertap-react';
declare module 'react-mathjax3';
declare module '@tarik.djurdjevic/react-sketch';
declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}
