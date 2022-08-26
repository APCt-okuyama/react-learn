import { v4 as uuid } from 'uuid';

export class Record {
    id: any;
    userId: string;    
    description: string
    category: string
    detail: [RecordDetail]

    //constructor(id: String, {description}, detail: RecordDetail) {
    constructor(id: String, {description, detail} ) {        
        this.id = id;
        this.category = 'User';
        this.userId = uuid();
        this.description = description;

        if (detail.length){
            console.log("detail:" + JSON.stringify(detail));            
            console.log("add detail:" + detail.length);
            this.detail = detail;
        }
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

    constructor(userId: String, { title, url, description, image } ){
        console.log("title:" + title);
        console.log("url:" + url);

        this.id = uuid();
        this.userId = userId;        
        this.category = 'UserDetail';

        this.title = title;
        this.url = url;
        this.description = description;
        this.image = image;
    }
}
