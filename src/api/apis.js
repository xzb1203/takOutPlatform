import axios from 'axios';
//请求路径
// 服务器IP
const IP = 'http://127.0.0.1:5000'
// 请求基本路径 
axios.defaults.baseURL = IP
//商品图片上传接口地址
export const ITEMS_IMG_UPLOAD = IP + '/goods/goods_img_upload'
//获取商品图片地址
export const GET_ITEMS_IMG = IP + '/upload/imgs/goods_img/'
//店铺头像接口上传地址
export const SHOP_PIC = IP+'/upload/shop/'
//店铺图片上传接口
export const STORE_PIC = IP+'/shop/upload'


//登录接口
export const login = (account, password) => axios.post('/users/checkLogin', { account, password })
//token接口
export const checktoken = token=>axios.get('/users/checktoken',{params:{token}})
//添加账号
export const accAdd = (account, password,userGroup)=>axios.post('/users/add', { account, password ,userGroup})
//账号列表
export const pages = (currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})
//删除账号
export const delAcc = id=>axios.get('/users/del',{params:{id}})
//批量删除账号
export const batchdel = ids=>axios.get('/users/batchdel',{params:{ids}})
//获取账号信息
export const accountinfo = id=>axios.get('/users/accountinfo',{params:{id}})
//检查旧密码
export const checkoldpwd = (oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})
//修改密码
export const editpwd = (newPwd, id)=>axios.post('/users/editpwd', {newPwd, id})
//获取商品列表
export const list = (currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})
//删除商品
export const dels = id=>axios.get('/goods/del',{params:{id}})
//修改商品
export const goodsEdit = (name,category,price,imgUrl,goodsDesc,id)=>axios.post('/goods/edit', { name,category,price,imgUrl,goodsDesc,id})
//修改账户
export const edit = (id,account,userGroup)=>axios.post('/users/edit', {id,account,userGroup})
//获取分类
export const catelist = (currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})
//添加分类
export const addcate = (cateName,state)=>axios.post('/goods/addcate',{cateName,state})
//删除分类
export const delcate = id=>axios.get('/goods/delcate',{params:{id}})
//修改分类
export const editcate = (id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})
//查询商品分类
export const categories = ()=>axios.get('/goods/categories',{params:{}})
//添加商品
export const add = (name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})
//商品图片上传
export const upload = ()=>axios.post('/goods/goods_img_upload',{})
// 获取订单列表
export const orderList = (currentPage,pageSize)=>axios.get('/order/list',{params:{currentPage,pageSize}})
//查询订单列表
export const search = (currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get('/order/search',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})
//修改订单
export const changeList = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})
// export const changeList = (params)=>axios.post('/order/edit',{params})
//获取店铺详情
export const shopInfo = ()=>axios.get('/shop/info',{params:{}})
//店铺内容修改
export const shopEdit = (params)=>axios.post('/shop/edit',params)
//首页报表接口
export const totaldata = ()=>axios.get('/order/totaldata',{params:{}})
//订单报表接口
export const ordertotal = (date)=>axios.get('/order/ordertotal',{params:{date}})
















