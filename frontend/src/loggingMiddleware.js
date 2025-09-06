// loggingMiddleware.js
import axios from 'axios';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjcwMWEwNWY4QGFpdHNyYWphbXBldC5hYy5pbiIsImV4cCI6MTc1NzE1NjI5MiwiaWF0IjoxNzU3MTU1MzkyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODMxYWEzYWEtZDkyNC00MDg1LTg5ZTctYjYyNDY5OWE2MDEyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZHVkZWt1bGEgcmFqYSBodXNzYWluaSIsInN1YiI6ImJiZDBiNDIzLWZiYWQtNGFiZi05MzM0LWI1MWM5NWIzZWVkZSJ9LCJlbWFpbCI6IjIyNzAxYTA1ZjhAYWl0c3JhamFtcGV0LmFjLmluIiwibmFtZSI6ImR1ZGVrdWxhIHJhamEgaHVzc2FpbmkiLCJyb2xsTm8iOiIyMjcwMWEwNWY4IiwiYWNjZXNzQ29kZSI6Inl6WnZnRyIsImNsaWVudElEIjoiYmJkMGI0MjMtZmJhZC00YWJmLTkzMzQtYjUxYzk1YjNlZWRlIiwiY2xpZW50U2VjcmV0IjoidVRicVpoemFndlJXeUdjWiJ9.6J8sfkUkgZ82akbX4bvmzbW471mAQY4kiPPlw8akMQA';

export async function Log(stack, level, packageName, message) {
  try {
    const body = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: packageName.toLowerCase(),
      message: message,
    };

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    await axios.post('http://20.244.56.144/evaluation-service/logs', body, { headers });
    console.info(`Log sent: ${message}`);
  } catch (error) {
    console.error(`Failed to send log: ${error.message}`);
  }
}
