import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectsPage from '../pages/ProjectsPage';
import { server } from './setup';
import { http, HttpResponse } from 'msw';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithClient = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('ProjectsPage', () => {
  it('renders loading state initially', () => {
    renderWithClient(<ProjectsPage />);
    expect(screen.getByText(/loading projects/i)).toBeInTheDocument();
  });

  it('renders projects after successful fetch', async () => {
    renderWithClient(<ProjectsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
  });

  it('renders empty state if no projects exist', async () => {
    server.use(
      http.get('*/api/projects', () => {
        return HttpResponse.json([]);
      })
    );

    renderWithClient(<ProjectsPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });
  });

  it('renders error state if fetch fails', async () => {
    server.use(
      http.get('*/api/projects', () => {
        return HttpResponse.error();
      })
    );

    renderWithClient(<ProjectsPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load projects/i)).toBeInTheDocument();
    });
  });
});
