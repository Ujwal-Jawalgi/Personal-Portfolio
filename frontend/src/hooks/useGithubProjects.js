import { useQuery } from '@tanstack/react-query';

export const useGithubProjects = () => {
  return useQuery({
    queryKey: ['github-projects'],
    queryFn: () => 
      fetch('https://api.github.com/users/Ujwal-Jawalgi/repos?sort=updated')
        .then(res => res.json())
        .then(data => {
          // Map GitHub repos to ProjectCard format and filter out ToDo-list
          return data
            .filter(repo => repo.name !== 'ToDo-list')
            .map(repo => {
              let liveLink = repo.homepage;
              // Manual overrides for live links
              if (repo.name === 'blockchain-carbon-registry-ujwal') {
                liveLink = 'https://ujwal-bluecarbon-registry.lovable.app/';
              } else if (repo.name === 'SmartFoot') {
                liveLink = 'http://smartfoot-liard.vercel.app';
              }

              return {
                _id: repo.id,
                title: repo.name,
                description: repo.description || 'No description provided.',
                technologies: repo.language ? [repo.language] : [],
                githubLink: repo.html_url,
                liveLink,
                imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Placeholder for GitHub repos (overridden in ProjectCard)
              };
            });
        })
  });
};
