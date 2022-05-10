import { renderHook, act as hooksAct } from '@testing-library/react-hooks';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestRenderer from 'react-test-renderer';
import { setAutoFreeze } from 'immer';

import { useCartStore } from '../store/cart';

import { makeServer } from '../miragejs/server';

import Cart from './cart';

const { act: componentsAct } = TestRenderer

setAutoFreeze(false);

describe('Cart', () => {
  let server;
  let result;
  let spy;
  let add;

  result = renderHook(() => useCartStore()).result;
  
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    add = result.current.actions.add;
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should add css class "hidden" in the component', () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should remove css class "hidden" in the component', async () => {
    await componentsAct(async () => {
      render(<Cart />);
  
      await userEvent.click(screen.getByTestId('close-button'));
  
      expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
    });
  });

  it('should call store toggle() twice', async () => {
    await componentsAct(async () => {
      spy = jest.spyOn(result.current.actions, 'toggle');

      render(<Cart />);

      const button = screen.getByTestId('close-button');
  
      await userEvent.click(button);
      await userEvent.click(button);
  
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  it('should display 2 products cards', () => {
    const products = server.createList('product', 2);

    hooksAct(() => {
      for(const product of products) {
         add(product);
      }
    });

    render(<Cart />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });
});
