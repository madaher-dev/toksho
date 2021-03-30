class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Build Query

    const queryObj = { ...this.queryString }; //destructure the whole querry string and save it in a new object
    const excludeFields = ['page', 'sort', 'limit', 'fields']; // those fields will be used as command and not filter

    excludeFields.forEach(el => delete queryObj[el]);
    // Advanced Filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, match => `$${match}`); // adding $sign for operators
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // if there is a sort operator in the query
      const sortBy = this.queryString.sort.split(',').join(' '); //enables multiple sorting with ,
      this.query = this.query.sort(sortBy); //sort by
    } else {
      this.query = this.query.sort('-createdAt'); //sort by created date if no sorting requested
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // if there are fields operator in the query
      const fields = this.queryString.fields.split(',').join(' '); //enables multiple fields separated with ,
      this.query = this.query.select(fields); //sort by
    } else {
      this.query = this.query.select('-__v'); //remove the __v field in case no fields queried (all except __v)
      this.query = this.query.select('-secretResource');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; //default page is 1
    const limit = this.queryString.limit * 1 || 100; //default limit per page is 100
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
