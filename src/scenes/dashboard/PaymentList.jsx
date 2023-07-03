import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';

import { Box, Typography } from '@mui/material';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51KqLOTI2Ss65cmsQMQMDdJWRNWPrBE8qwCDMUbKP6WYWAS9QBaIYyaSkyPEIMKJM5YmfnMetgmhP9Hs0YD0E4Ri200L2pKV9G8");

const StripePayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentIntents = await stripe.paymentIntents.list();
        setPayments(paymentIntents.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <Box>
      <Typography color="#96D232" variant="h5" fontWeight="600">
        Recent Transactions
      </Typography>
      {payments.map((payment) => (
        <Box key={payment.id} sx={{ mt: 2, p: 2, border: '1px solid #ccc', backgroundColor:"#FFF" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Payment ID: {payment.id}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Amount"
                value={payment.amount}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Currency"
                value={payment.currency}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Status"
                value={payment.status}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Created"
                value={new Date(payment.created * 1000).toLocaleString()}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Customer ID"
                value={payment.customer}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Payment Method"
                value={payment.payment_method}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Receipt Email"
                value={payment.receipt_email}
                fullWidth
                disabled
              />
            </Grid>
            {/* Render other payment details as needed */}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default StripePayments;
