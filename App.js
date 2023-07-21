import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';
import NavBar from './NavBar';
import firebase from 'firebase/app'

class App extends React.Component {
  
  constructor(){
    super();
    this.state={
       products:[],
       loading:true
    }
    this.db=firebase.firestore()
    //this.increaseQuantity=this.increaseQuantity.bind(this);
  }

  componentDidMount (){
    firebase
      .firestore()
      .collection('products')
      //.where('price','<', 500 )
      .orderBy('price')
      .onSnapshot((snapshot)=>{
        console.log(snapshot);
        snapshot.docs.map((doc)=>{
          console.log(doc.data());
        })

        const products=snapshot.docs.map((doc)=>{
          const data= doc.data();
          data['id']=doc.id;
          return data;
        })

        this.setState({
          products: products,
          loading:false
        });
      })
  }
handleIncreaseQuantity=(product)=>{
   // console.log("hey increase quantity of product", product);
    const {products}=this.state;
    const index=products.indexOf(product);

    // products[index].qty+=1;


    // this.setState({
    //   products:products  
    // })

    const docRef=this.db.collection('products').doc(products[index].id);

    docRef
      .update({qty:products[index].qty+1})
      .then(()=>{
        console.log('document updated successfully');
      })
      .catch((err)=>{
        console.log("error",err);
      })
};
handleDecreaseQuantity=(product)=>{
   // console.log("decrease quantity of product=", product);
    const {products}=this.state;
    const index=products.indexOf(product);
    if(products[index].qty<=0){
        return;
    }

    // this.setState({
    //     products:products
    // })

    const docRef=this.db.collection('products').doc(products[index].id);

    docRef
      .update({qty:products[index].qty-1})
      .then(()=>{
        console.log('document updated successfully');
      })
      .catch((err)=>{
        console.log("error",err);
      })
}
handleDeleteProduct=(id)=>{
    const {products}=this.state;

    // const items=products.filter((item)=>item.id!=id);
    // //this will return me an array of items whose id!=id passed in the function

    // this.setState({
    //     products:items
    // })

    const docRef=this.db.collection('products').doc(id);

    docRef
      .delete()
      .then(()=>{console.log("deleted successully")})
      .catch((err)=>{
        console.log("error",err);
      })
}

getCartCount=()=>{
  const {products}=this.state;
  let count=0;

  products.forEach((product)=>{
    count+=product.qty;
  })

  return count;
}

getCartTotal=()=>{
  const {products}=this.state;

  let cartTotal=0;
  products.map((product)=>{
    cartTotal=cartTotal+product.qty*product.price
  })
  return cartTotal;
}

addProduct=()=>{
  firebase
    .firestore()
    .collection('products')
    .add({
      img:'',
      qty:1,
      price:9999,
      title : "washing machine"
    })
    .then((docRef)=>{
      console.log("new product added", docRef);
    })
    .catch((err)=>{
      console.log('Error',err);
    })
}
  
  
  render(){
    const {products ,loading}=this.state;
      return (
        <div className="App">
          
          <h1>Cart</h1>
         
          <NavBar count={this.getCartCount()} />
          <button onClick={this.addProduct}>Add Product</button>
          <Cart 
            products={products}
            onIncreaseQuantity={this.handleIncreaseQuantity}
            onDecreaseQuantity={this.handleDecreaseQuantity}
            onDeleteProduct={this.handleDeleteProduct}
          />
          {loading && <h1>Loading..</h1>}
          <div style={{padding:10, fontSize:20 }}>TOTAL:{this.getCartTotal()}</div>
        </div>
      );
  }
}



export default App;
