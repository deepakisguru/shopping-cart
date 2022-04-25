import './App.css';
import { Grid, Container, Divider, Button, Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import SuccessModal from './successModal';
import fbIcon from './images/facebook.png';
import twitterIcon from './images/twitter.png';
import instaIcon from './images/instagram.png';
import { connect } from 'react-redux';
import { useState } from 'react';

function App(props) {
  const [cart, setCart] = useState(props.cart)

  const addQty = (id) => {
    let cartItem = cart

    let items = cartItem.map(item => {
      if (item.id == id) {
        item.qty += 1
      }
      return item;
    })
    setCart([...items])
  }

  const subtractQty = (id) => {
    let cartItem = cart

    let items = cartItem.map(item => {
      if (item.id == id) {
        item.qty -= 1
      }
      return item;
    }).filter(item => item.qty != 0)
    setCart([...items])
  }

  const deleteItem = (id) => {
    let cartItem = cart

    let items = cartItem.filter(item => item.id != id)
    setCart([...items])
  }

  const getSubTotal = () => {
    let sum = 0;

    let cartItem = cart

    let items = cartItem.map(item => {
      sum += item.qty * item.Price
    })
    return sum;
  }

  const shippingChage = () => {

    let subTotal = getSubTotal();
    if (subTotal > 1000) {
      return 0
    }
    else return 200;
  }

  return (
    <div className="App">
      <Grid container alignItems="center" className="header1">
        <Container>
          <Grid container direction="row" justifyContent="flex-end">
            <Grid item md={2} sm={4} xs={4}>
              <Grid container direction="row" justifyContent="space-around">
                <Grid item>
                  <SearchOutlinedIcon />
                </Grid>
                <Grid item>
                  <PersonOutlinedIcon />
                </Grid>
                <Grid item>
                  <ShoppingCartOutlinedIcon />
                  <span className="itemCount">{cart.length}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid container alignItems="center" className="header2">
        <Container>
          <Grid container direction="row" justifyContent="center">
            <Grid item md={6}>
              <Grid container direction="row" justifyContent="space-around">
                <Grid item>
                  <p className="tabs">Products</p>
                </Grid>
                <Grid item>
                  <p className="tabs">Stories</p>
                </Grid>
                <Grid item>
                  <p className="tabs">Skin Assessment</p>
                </Grid>
                <Grid item>
                  <p className="tabs">Ingredients</p>
                </Grid>
                <Grid item>
                  <p className="tabs">Blog</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Container>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <p className="heading">Shopping Cart</p>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item md={8} sm={12} xs={12}>
            <Container>
              <Divider />
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item md={6} sm={4} xs={4} align="left">
                  <p className="tableHeader" style={{ paddingLeft: '10%' }}>Product</p>
                </Grid>
                <Grid item>
                  <p className="tableHeader" style={{ minWidth: '50px' }}>Price</p>
                </Grid>
                <Grid item>
                  <p className="tableHeader" style={{ minWidth: '50px' }}>Quantity</p>
                </Grid>
                <Grid item>
                  <p className="tableHeader" style={{ minWidth: '50px' }}>Total</p>
                </Grid>
                <Grid item>
                  <CloseOutlinedIcon style={{ visibility: 'hidden' }} />
                </Grid>
              </Grid>
              <Divider />

              {cart.map((data) => {
                return <Grid key={data.id} container direction="row" justifyContent="space-between" alignItems="center" style={{ marginTop: '30px' }}>
                  <Grid item md={6} sm={4} xs={4} align="left">
                    <Grid container direction="row" justifyContent="" alignItems="center">
                      <Grid item>
                        <img src={data.itemImg} alt="" className="itemImage" />
                      </Grid>
                      <Grid item align="left" className="itemName">
                        <p className="tableHeader">{data.Name}<br />
                          {data.Size}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <p className="tableHeader" style={{ minWidth: '50px' }}>₹{data.Price.toFixed(2)}</p>
                  </Grid>
                  <Grid item style={{ border: '1px solid #999999', }} className="qtyBox">
                    <p className="tableHeader" style={{ minWidth: '50px' }}>
                      <IconButton className="iconButton" onClick={() => { subtractQty(data.id) }}><RemoveRoundedIcon /></IconButton>
                      {data.qty}
                      <IconButton className="iconButton" onClick={() => { addQty(data.id) }}><AddRoundedIcon /></IconButton>
                    </p>
                  </Grid>
                  <Grid item>
                    <p className="tableHeader" style={{ minWidth: '50px' }}>₹{(data.Price * data.qty).toFixed(2)}</p>
                  </Grid>
                  <Grid item>
                    <CloseOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => { deleteItem(data.id) }} />
                  </Grid>
                </Grid>
              })}

            </Container>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <div className="cartTotalBox">
              <Container>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item md={12} align="left">
                    <p className="cartTotal">Cart Total</p>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <p className="cartText">Sub Total</p>
                  </Grid>
                  <Grid item>
                    <p className="totalAmount">₹{getSubTotal().toFixed(2)}</p>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <p className="cartText">Shipping</p>
                  </Grid>
                  <Grid item>
                    <p className="cartText">{shippingChage() == 0 ? "Free" : '₹' + shippingChage().toFixed(2)}</p>
                  </Grid>
                </Grid>
                <Divider style={{ marginTop: '30px' }} />
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    <p className="cartTotalText">Total</p>
                  </Grid>
                  <Grid item>
                    <p className="totalAmount">₹{(getSubTotal() + shippingChage()).toFixed(2)}</p>
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item md={12} sm={12} xs={12}>
                  <SuccessModal />
                  </Grid>
                </Grid>
              </Container>
            </div>
          </Grid>
        </Grid>

      </Container>
      <Grid container direction="row" justifyContent="space-between" className="footerBox">
        <Grid item md={12}>
          <Container>
            <Grid container direction="row">
              <Grid item md={12} sm={12} xs={12} align="left">
                <p className="brandName">Brand Name</p>
              </Grid>
              <Grid item md={3} sm={12} xs={12} align="left">
                <p className="information">information</p>
                <a href="/">about us</a> <br />
                <a href="/">faqs</a> <br />
                <a href="/">refund policy</a> <br />
                <a href="/">terms & conditions</a>
              </Grid>
              <Grid item md={3} sm={12} xs={12} align="left">
                <p className="information">support</p>
                <span className="email">hello@sample.com</span>
              </Grid>
              <Grid item md={3} sm={12} xs={12} align="left">
                <p className="information">newsletter</p>
                <span className="newsletter">
                  Subscribe to receive updates, <br /> access deals and more
                </span>
                <Input type="text" placeholder="Enter email address" className="emailInput" />
                <Button variant="contained" className="subsribeButton">subsribe</Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start" style={{ borderBottom: '1px solid #707070', padding: '15px 0px' }}>
              <Grid item md={1} align="left">
                <img src={fbIcon} alt="" />
              </Grid>
              <Grid item md={1} align="left">
                <img src={twitterIcon} alt="" />
              </Grid>
              <Grid item md={1} align="left">
                <img src={instaIcon} alt="" />
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item md={9} align="left">
                <p className="copyrightText">Copyright 2021</p>
              </Grid>
              <Grid item md={3} align="left">
                <p className="copyrightText">PRIVACY POLICY</p>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
