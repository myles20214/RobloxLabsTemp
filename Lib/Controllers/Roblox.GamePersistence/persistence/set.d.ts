import { Request, Response } from 'express-serve-static-core';
declare const _default: {
    method: string;
    func: (req: Request, res: Response) => Promise<Response<any, number>>;
};
export default _default;
