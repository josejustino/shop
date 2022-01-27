import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';

const product = {
  title: 'Relógio bonito',
  price: '22.00',
  image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
}

const renderCartItem = () => {
  render(<CartItem product={product} />);
}

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderCartItem();

    const image = screen.getByTestId('image');

    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });
  
  it('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increase quantity by 1 when second button is clicked', async () => {
    renderCartItem();

    const [_, button] = screen.getAllByRole('button');

    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when first button is clicked', async () => {
    renderCartItem();

    const [buttonIncrease, buttonDecrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    await fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('2');

    await fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe('1');
  });
  
  it('should not go below zero in the quantity', async () => {
    renderCartItem();

    const [buttonDecrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    expect(quantity.textContent).toBe('1');

    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);

    expect(quantity.textContent).toBe('0');
  });
});