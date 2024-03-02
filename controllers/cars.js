const Car = require('../models/Car');

//@desc   Get all cars
//@route  GET /api/v1/cars
//@access Public
exports.getCars = async (req, res, next) => {
  let query;

  const reqQuery = {...req.query};

  const removeField = ['select', 'sort', 'page', 'limit'];

  removeField.forEach(param => delete reqQuery[param]);
  // console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Hospital.find(JSON,parse(queryStr)).populate('appointments');

  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }
  else {
    query = query.sort('-createAt');
  }

  try {
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 25;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await Car.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const cars = await query;

    const pagination = {};

    if(endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      }
    }
    if(startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      }
    }

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    })
  } catch(err) {
    res.status(400).json({
      success: false
    })
  }
}

//@desc   Get single car
//@route  GET /api/v1/cars/:id
//@access Public
exports.getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.param.id);

    if(!car)
      return res.status(400).json({
        success: false
      })

    res.status(200).json({
      success: true,
      data: car
    })
  } catch(err) {
    res.status(400).json({
      success: false
    })
  }
}

//@desc   Create new car
//@route  POST /api/v1/cars/
//@access Private
exports.createCar = async (req, res, next) => {
  const car = await Car.create(req.body);
  res.status(201).json({
    success: true,
    data: car
  })
}

//@desc   Update car
//@route  PUT /api/v1/cars/:id
//@access Private
exports.updateHospital = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params,id, req.body, {
      new: true,
      runValidators: true
    })

    if(!car)
      return res.status(400).json({
        success: false
      })
    
    res.status(200).json({
      success: true,
      data: car
    })
  } catch(err) {
    res.status(400).json({
      success: false
    })
  }
}

//@desc   Delete car
//@route  DELETE /api/v1/cars/:id
//@access Private
exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if(!car)
      return res.status(400).json({
        success: false,
      })
    
    await car.deleteOne();
    res.status(200).json({
      success: true,
      data: {}
    })
  } catch(err) {
    res.status(400).json({
      success: false
    })
  }
}
