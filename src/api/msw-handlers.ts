import { http, HttpResponse, delay } from 'msw';
import seed from './seed.json';

export const handlers = [
  http.get('/api/dashboard', async () => {
    await delay(500);
    return HttpResponse.json(seed);
  }),

  http.get('/api/analytics', async () => {
    await delay(300);
    return HttpResponse.json(seed.analytics);
  }),

  http.post('/api/tasks', async ({ request }) => {
    const body = await request.json() as any;
    const newTask = {
      id: `t_${Date.now()}`,
      title: body.title,
      difficulty: body.difficulty || 'normal',
      estimateMin: body.estimateMin || 30,
      tags: body.tags || [],
      status: 'todo',
      history: []
    };
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.post('/api/challenges/:id/accept', async () => {
    await delay(800);
    return HttpResponse.json({
      success: true,
      energyRemaining: 60,
      xpGained: 0, // XP is gained after completion, but we simulate acceptance here
      message: 'Challenge Accepted'
    });
  })
];