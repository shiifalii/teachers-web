export interface Notification {
  _id: string;
  updatedAt: string;
  body: string;
  isViewed: boolean;
  data: {
    conceptIds: string;
    chapterIds: string;
    batchId: string;
    batchName: string;
    conceptName: string;
    chapterName: string;
  };
}
