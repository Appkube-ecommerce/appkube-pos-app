import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {creatingOrder} from '../../Api/createOrder';
//  import {useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {creatingCustomer} from '../../Api/createCustomer';

// // const dispatch = useDispatch();
export const createOrder = createAsyncThunk('createOrder', async (orderData) => {
  console.log("This is items ",orderData);
  try {
    console.log('creating order async', orderData);

    const response = await creatingOrder(orderData);
    console.log('created order response ', response);

    return response;
  } catch (error) {
    console.log('error creating order', error);
  }
});
export const createCustomer = createAsyncThunk(
  'createCustomer',
  async (details) => {
    try {
      console.log('creating customer', details);

      const response = await creatingCustomer(details);
      console.log('response of customer creation', response);

      return response;
    } catch (error) {
      console.log('error creating customer', error);
    }
  },
);
const CustomerSlice = createSlice({
  name: 'CustomerSlice',
  initialState: {
    orders: [],
    cart: [],
    // customerToSend: [],
    customers: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders.push(action.payload);
      console.log('inn redux dispathing orders', action.payload);
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
      console.log('added user in slice', action.payload);
    },
    // addToCart: (state, action) => {
    //   // Find existing item with the same ID
    //   const existingItem = state.cart.find(
    //     item => item.id === action.payload.id,
    //   );

    //   // If item exists, update its quantity
    //   if (existingItem) {
    //     console.log('existing', existingItem);
    //     existingItem.quantity++;
    //     existingItem.totalPrice = existingItem.price * existingItem.quantity;
    //     console.log('existing', existingItem);

    //     // localStorage.setItem('cart', JSON.stringify(state.cart));
    //     // Modify the draft directly (Immer handles immutability)
    //   } else {
    //     // If item doesn't exist, add it with initial quantity 1
    //     // state.total++;
    //     return {
    //       ...state,
    //       cart: [
    //         ...state.cart,
    //         action.payload.hasOwnProperty('quantity')
    //           ? {...action.payload}
    //           : {
    //               ...action.payload,
    //               quantity: 1,
    //               totalPrice: action.payload.price * 1,
    //             },
    //       ],
    //     };
    //   }
    //   // AsyncStorage.setItem('cart', JSON.stringify(state.cart));
    // },

    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
    
      if (existingItem) {
        existingItem.quantity++; // Increase quantity if the item already exists
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.cart.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price }); // Add item with quantity 1
      }
    },
    

    // removeFromCart: (state, action) => {
    //   // Retrieve the ID of the item to remove from the action payload
    //   const itemIdToRemove = action.payload;

    //   // Find the index of the item in the data array
    //   const itemIndex = state.cart.findIndex(
    //     item => item.id === itemIdToRemove,
    //   );
    //   // Check if the item exists
    //   if (itemIndex !== -1) {
    //     // Immer provides a draft state for direct modification
    //     // No need to create a copy of the Data array
    //     if (state.cart[itemIndex].quantity > 1) {
    //       state.cart[itemIndex].quantity--;
    //       state.cart[itemIndex].totalPrice =
    //         state.cart[itemIndex].price * state.cart[itemIndex].quantity; // Modify draft directly
    //     } else {
    //       state.cart.splice(itemIndex, 1); // Modify draft directly
    //     }
    //   }
    //   // Immer handles returning the modified state
    //   // AsyncStorage.setItem('cart', JSON.stringify(state.cart));
    //   return; // No need to return anything explicitly
    // },

    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemIndex = state.cart.findIndex(item => item.id === itemIdToRemove);
    
      if (itemIndex !== -1) {
        if (state.cart[itemIndex].quantity > 1) {
          state.cart[itemIndex].quantity--; // Decrease quantity if greater than 1
          state.cart[itemIndex].totalPrice = state.cart[itemIndex].price * state.cart[itemIndex].quantity;
        } else {
          state.cart.splice(itemIndex, 1); // Remove item if quantity is 1
        }
      }
    },
    
    emptyCart: (state, action) => {
      state.cart = [];
    },
    // customerToSend: (state, action) => {
    //   state.cartCustomer = action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        // state.orders = action.payload

        AsyncStorage.setItem('orders', JSON.stringify(state.orders));
        state.cart = [];
        AsyncStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCustomer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        AsyncStorage.setItem('users', JSON.stringify(state.orders));
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default CustomerSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  addOrders,
  addCustomer,
  emptyCart,
  // customerToSend,
} = CustomerSlice.actions;
