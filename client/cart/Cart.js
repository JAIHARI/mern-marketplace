import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import CartItems from './CartItems'
import {StripeProvider} from 'react-stripe-elements'
import config from './../../config/config'
import Checkout from './Checkout'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
}))

export default function Cart () {
  const classes = useStyles()
  const [checkout, setCheckout] = useState(false)
  const [stripe, setStripe] = useState(null)


  useEffect(() => {
    if (window.Stripe) {
      setStripe({stripe: window.Stripe(config.stripe_test_api_key)})
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        setStripe({stripe: window.Stripe(config.stripe_test_api_key)})
      })
    }
  }, [])

  const saveCheckout = val =>{
    setCheckout({checkout: val})
  }

    return (<div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <CartItems checkout={checkout}
                     setCheckout={saveCheckout}/>
        </Grid>
        {checkout &&
          <Grid item xs={6} sm={6}>
            <StripeProvider stripe={stripe}>
              <Checkout/>
            </StripeProvider>
          </Grid>}
        </Grid>
      </div>)
}
