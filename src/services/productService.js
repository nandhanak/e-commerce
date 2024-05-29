

const Category=require("../models/cartitem");
const product = require("../models/productModel");
const Product=require("../models/productModel");
const { findById } = require("../models/user");

async function createProduct(reqData){
    let topLeval=await Category.findOne({name:reqData.topLevelCategory});

    if(!topLeval){
        topLeval=new Category({
            name:reqData.topLevelCategory,
            lavel:1
        })
       
    }
    let secondLevel=await Category.findOne({
        name:reqData.secondLevelCategory,
        parentCategory:topLeval._id,
    
    })
    if(!secondLevel){
        secondLevel=new Category({
            name:reqData.secondLevelCategory,
            parentCategory:topLeval._id,
            level:2
        })
    }
    let thirdLevel=await Category.findOne({
        name:reqData.thirdLevelCategory,
        parentCategory:secondLevel._id,

    })
    if(!thirdLevel){
        thirdLevel=new Category({
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3,


        })
    }
    const product=new Product({
        titile:reqData.titile,
        color:reqData.color,
        description:reqData.description,
        discountPrice:reqData.discountPrice,
        discountPersentage:reqData.discountPersentage,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price: reqData.price,
        sizes:reqData.sizes,
        quantity:reqData.quantity,
        category:reqData.category._id,


    })
    return await product.save();
}

async function deleteProduct(productId){
    const product=await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "product deleted";
}
async function updateProduct(productId,reqData){
    const updateProduct=await Product.findByIdAndUpdate(productId,reqData);
}

async function findProductById(id){
    const product=await Product.findById(id).populate("category").exec();

    if(!product){
        return "product not found ";
    }
    return product;
}

async function getAllProduct(reqQuery){
    let {category,color,sizes,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=reqQuery;

    pageSize=pageSize||10;

    let query=Product.find().populate("categorys");

    if(category){
        const existCategory=await Category.findOne({name:category})
        if(!existCategory){
            query=query.where("categorys").equals(existCategory._id);
        }
        else{
            return {content:[],currentPage:1,totolPage:0}
        }
    }
    if(color){
        const colorSet=new Set(color.split(",").map(color=>color.trim().toLowerCase()));

        const colorRagex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null;
        query=query.where("color").reqex(colorRagex);

    
    }
    if(sizes){
        const sizeSet=new Set(sizes);
        query=await query.where("sizes.name").includes([...sizeSet]);


    }
    if(minPrice && maxPrice){
        query=await query.where("discountedPrice").item(maxPrice);
    }
    if(minDiscount){
        query=await query.where("discountedPeersentage").get(minDiscount);
    }
    if(stock){
        if(stock=="in_stock"){
            query=await query.where("quantity").get(0);
        
        }else if(stock=="out_of_stock"){
            query=await query.where("quantity").get(1);
        }
        if(sort){
          const sortDirection=sort==="price_hight"?-1:1;
          query=await query.sort({discountPrice:sortDirection})

        }
        const totalProducts=await Product.countDocuments(query);
        const skip=(pageNumber-1)*pageSize;

        query=query.skip(skip).limit(pageSize);

        const products=await query.exec();

        const totolPages=Math.ceil(totalProducts/pageSize);

        return {content:products,currentPage:pageNumber,totolPages}

    }
}
async function createMultiProduct(products){
    for(let product of products){
        await createProduct(product);

    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    findProductById,
    createMultiProduct
}