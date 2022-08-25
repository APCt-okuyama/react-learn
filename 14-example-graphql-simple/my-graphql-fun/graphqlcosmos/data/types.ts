import { v4 as uuid } from 'uuid';

export class Record {
    id: any;
    userId: string;    
    description: string
    category: string
    detail:[RecordDetail]

    constructor(id: String, {description}) {
        this.id = uuid();
        this.category = 'User';
        this.userId = uuid();
        this.description = description;
        const newDetail = new RecordDetail(this.userId,{title:"test1", url:"test2", description:"test3",image:"test4"}); 
        this.detail =[newDetail];
    }
}

export class RecordDetail {

    id: any
    userId: String    
    category: String
    url: String
    title: String
    description: String
    image: String

    constructor(userId: String, {title, url, description, image}) {
        this.id = uuid();
        this.userId = userId;        
        this.category = 'UserDetail';
        //
        this.title = title;
        this.url = url;
        this.description = description;
        this.image = image;
    }
}
