import { Request, Response } from "express";
import { Blog } from "../models/blog.model";


// Get all from db
const getAll = (Model:any) => async (req:Request, res:Response) => {
  try {
    const result = Model.find();   
    const data = await result
      .limit(req.query.limit)
      .skip(Number(req.query.skip) * Number(req.query.limit))
      .sort(req.query.sort);
    const totalCount = await Model.countDocuments();
    res.json({
      status: "success",
      message: "Data retrieved successfully",
      data,
      totalCount,
    });
  } catch (err:any) {
    res.status(500).json({
      status: "failure",
      message: err.message ? err.message : "Internal Server error",
    });
  }
};

// Create One
const createOne = (Model: any, name:string) => async (req: Request, res: Response) => {
  try {
    const data = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      message: `${name} created successfully`,
      data,
    })
  } catch (err:any) {
    res.status(500).json({
      status: "failure",
      message: err.message ? err.message : "Internal Server error",
    });
  }
}


// Create One and Update Blog: For comment and Rating
const createOneAndUpdateBlog = (Model: any, name: string) => async (req: Request, res: Response) => {
  try {
    const data = await Model.create(req.body);
    
    if (name.toLowerCase() === "comment") {
      await Blog.findByIdAndUpdate(req.body.blog,
        { $push: { comments: data._id, } },
        { new: true }
      );
    } else if (name.toLowerCase() === "rating") {
      await Blog.findByIdAndUpdate(req.body.blog,
        { $push: { ratings: data._id, } },
        { new: true }
      );
    }
    res.status(201).json({
      status: "success",
      message: `${name} created successfully`,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "failure",
      message: err.message ? err.message : "Internal Server error",
    });
  }
}


//Get By Id
const getOne = (Model: any, name: string) => async (req:Request, res:Response) => {
  try {
    let data;
    if (Model == Blog) {
       data = await Model.findById(req.params.id).populate("author").populate("comments").populate("ratings");
    } else {
       data = await Model.findById(req.params.id);  
    }    
    
    if (!data) {
       res.status(404).json({
        status: "failure",
        message: `${name} not found`,
      });
    }
    res.json({
      status: "success",
      message: `${name} retrieved successfully`,
      data,
    });
  } catch (err:any) {
    res.status(500).json({
      status: "failure",
      message: err.message ? err.message : "Internal Server error",
    });
  }
}


// Update One
const updateOne = (Model: any, name: string) => async (req: Request, res: Response) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      res.status(404).json({
        status: "failure",
        message: `${name} not found`,
      });
    }
    res.json({
      status: "success",
      message: `${name} updated successfully`,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "failure",
      message: err.message ? err.message : "Internal Server error",
    });
  }
}


// Delete One
const deleteOne = (Model: any, name: string) => async (req: Request, res: Response) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(404).json({
        status: "failure",
        message: `${name} not found`,
      });
    }
    res.json({
      status: "success",
      message: `${name} deleted successfully`,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "failure",
      message: err.message ? err.message : "Internal Server error",
    });
  }
}





export { getAll, createOne, getOne, updateOne, deleteOne, createOneAndUpdateBlog };