
import React, { useEffect, useState } from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Drawer from './Drawer';

type DrawerRoute = {
    id: number;
    label: string;
    path: string;
    element: JSX.Element;
};

describe('DrawerComponent', () => {
  const items: DrawerRoute[] = [
    {
      id: 1,
      label: 'Item 1',
      path: '/item1',
      element: <div>Item 1 Element</div>,
    },
    {
      id: 2,
      label: 'Item 2',
      path: '/item2',
      element: <span>Item 2 Element</span>,
    },
  ];

  it('renders the drawer with routes including elements', () => {
    render(
      <MemoryRouter initialEntries={['/item1']}>
        <Drawer items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 1 Element')).toBeInTheDocument();
  });

  it('navigates to the correct route and renders the element when an item is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/item1']}>
        <Drawer items={items} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Item 2'));

    expect(screen.getByText('Item 2 Element')).toBeInTheDocument();
  });
});

