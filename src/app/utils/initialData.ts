const getInitialData = () => ([
  {
    id: 1,
    productTitle: "sepatu",
    productPrice: 91000,
    productStock:999,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 2,
    productTitle: "tas",
    productPrice: 123141,
    productStock:999,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 3,
    productTitle: "handuk",
    productPrice: 900988,
    productStock:999,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 4,
    productTitle: "Life pod",
    productPrice: 99999999,
    productStock:999,
    createdAt: '2022-04-14T04:27:34.572Z',
  }
]);

// function getAllProducts(){
//     return getInitialData
// }
// function addProduct({title, price, stock}){
//     getInitialData = [...getInitialData,{
//         id: Date.now(),
//         productTitle:title,
//         productPrice:price,
//         productStock:stock,
//         createdAt:new Date().toISOString()
//     }]
// }

export {getInitialData};