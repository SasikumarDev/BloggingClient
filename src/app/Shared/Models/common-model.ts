export class CommonModel {
}

export class Questions {
    public Qid: number;
    public Question: string;
    public AskedBy: number;
    public AskedOn: Date;
    public Tags: string;
}

export class DParameter {
    public Id: string;
    public Name: string;
}

export class Users {
    public UsId: number;
    public FirstName: string;
    public LastName: string;
    public EmailId: string;
    public Password: string;
    public Dob: Date;
    public ImagePath: string;
    public CreateDate: Date;
    public Updatedate: Date;
}

export class Answer {
    public Aid: number;
    public Qid: number;
    public Answer: string;
    public AnswredBy: number;
    public AnswredOn: Date;
}

export class Message {
    public  Qid: string;
    public  Body: string;
    public  To: string;
    public  Dtime: Date;
    public  Navigation: string;
}

