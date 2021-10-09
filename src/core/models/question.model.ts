export class Question {
  accepted_answer_id:number;
  answer_count:number;
  closed_date:number;
  closed_reason:string;
  creation_date:number;
  is_answered:boolean;
  last_activity_date:number;
  last_edit_date:number;
  link:string;
  owner:any;
  question_id:number;
  score:number;
  tags:string[];
  title:string;
  view_count:number;
  constructor(item:Question){};
}
