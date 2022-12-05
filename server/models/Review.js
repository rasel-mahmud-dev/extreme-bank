import Base from "./Base";


class Review extends Base {
    static collectionName = "reviews";
    _id
    name = ""
    image = ""
    text = 0
    created_at = ""
    updated_at = ""

    constructor(data) {
        super(Review.collectionName);
        this.name = data.name
        this.text = data.text
        this.image = data.image
        this.created_at = data.updated_at ? data.created_at : new Date()
        this.updated_at = data.updated_at ? data.updated_at : new Date()
    }
}

export default Review;
