import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		// Searched for the index of incoming item
		const existingCartItemIndex = state.items.findIndex(
			item => item.id === action.item.id
		);

		// If it exists in state
		const existingCartItem = state.items[existingCartItemIndex];

		let updatedItem, updatedItems;

		// if it exists, spread the state and only increment the amount
		if (existingCartItem) {
			updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};

			// Spread the state data
			updatedItems = [...state.items];

			// locate and update the data via index to the updatedItem
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			// if new Item, populate the cart
			updatedItems = state.items.concat(action.item);
		}

		// Return state
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			item => item.id === action.id
		);

		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;

		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	// Return default state
	return defaultCartState;
};

const CartProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = item => {
		dispatchCartAction({ type: 'ADD', item: item });
	};
	const removeItemFromCartHandler = id => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
