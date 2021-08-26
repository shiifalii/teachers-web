import { jsPDF } from 'jspdf';

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.onmessage = ev => {
  let { pages, width, height } = ev.data;
  const doc = new jsPDF('p', 'px', [width, height]);
  // const docWidth = doc.internal.pageSize.getWidth();
  // const docHeight = doc.internal.pageSize.getHeight();
  pages.forEach((page: any, i: number) => {
    //@ts-ignore
    doc.addImage(page, 'JPEG', 0, 0, width, height, undefined, 'MEDIUM');
    if (i !== pages.length - 1) {
      doc.addPage([width, height]);
    }
  });
  ctx.postMessage(doc.output('blob'));
};
