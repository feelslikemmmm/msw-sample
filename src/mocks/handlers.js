import { rest } from 'msw';

const products = [
  { title: 'outer', size: 'm' },
  { title: 'bottom', size: 's' },
];

export const handlers = [
  // 상품 목록
  rest.get('products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // 상품 목록 추가
  rest.post('products', (req, res, ctx) => {
    products.push(req.body);
    return res(ctx.status(201));
  }),
];
