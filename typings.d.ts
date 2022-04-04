export interface Post {
    _id: string;
    alamat:string;
    placeholder:string;
    _createdAt: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    tipe: string;
    offsetWidth:number;
    fasilitas: {
        
        image: string;
        image1: string;
        image2: string;
        image3: string;
        image4: string;
    };
    categories:{
        title:string;
    }
    comments:Comment[];
    description:string;
    long:number;
    lang:number;
    mainImage:{
        asset:{
            url:string;
        }

    }
    mainImage2:{
        asset:{
            url:string;
        }
    }
    mainImage3:{
        asset:{
            url:string;
        }
    }
    mainImage4:{
        asset:{
            url:string;
        }
    }
    mainImage5:{
        asset:{
            url:string;
        }
    }
    slug:{
        current:string;
    }

    price:string;
    star:string;
    location:{
        title:string;
        description:string;
    }

    
    body:[object]



}
export interface Comment{
    approved:boolean;
    comment:string;
    email:string;
    name:string;
    post:{
        _ref:string;
        _type:string;
    };
    _id: string;
    _createdAt: string;
    _rev: string;
    _type:string;
    _updatedAt:string
}