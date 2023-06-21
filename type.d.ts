export interface Post {
    _id: string;
    publishedAt: string;
    title: string;
    description: string;
    author: {
      name: string;
      image: string;
    };
    comments: Comment[]; 
    mainImage: {
      asset: {
        url: string;
      };
    };
    slug: {
      current: string;
    };
    body: object[]; 
  }


  interface Comment {
    _id: string;
    name: string;
    approved: boolean; // Include the 'approved' field
    email: string;
    comment: string;
    post: {
      _ref: string;
      _type: string;
    };
  }
  