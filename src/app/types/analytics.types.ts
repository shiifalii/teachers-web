export interface LoginEventProperties {
  centre: string;
  employeeId: string;
  subject: string;
  role: string;
  classId: string;
  class: string;
}

export interface ClickedClassEventProperties {
  name: string;
}

export interface ViewStudentsEventProperties {
  isClicked: 'Yes' | 'No';
  class: string;
}

export interface TopicUnlockEventProperties {
  topicName: string;
  chapterName: string;
  className: string;
}

export interface ClickedViewDetailsEventProperties {
  testName: string;
  topicName: string;
  goal: string;
}

export interface SearchEventProperties {
  level: 'Test' | 'Topic' | 'Chapter' | 'Class';
  subject: string;
  searchText: string;
}
