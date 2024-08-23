import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewPost from './NewPost';

test('renders form and handles submission correctly', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <NewPost />
      </MemoryRouter>
    );
  });

  // Check if the form elements are rendered
  const titleInput = screen.getByLabelText(/title/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const createPostButton = screen.getByText(/create post/i);

  expect(titleInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(createPostButton).toBeInTheDocument();

  // Simulate filling out the form
  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ post: { id: 1, title: 'Test Title', description: 'Test Description' } }),
    })
  );

  // Simulate form submission
  await act(async () => {
    fireEvent.click(createPostButton);
  });

  // Check if fetch was called with correct arguments
  expect(global.fetch).toHaveBeenCalledWith('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Test Title', description: 'Test Description' }),
  });
});
