type RequestType = {
  error?: string;
  errors?: { path: string; msg: string }[];
};
export function getErrorMessageFromReq(req: RequestType) {
  if (req.error) {
    return req.error;
  }
  if (req.errors) {
    return req.errors[0].msg;
  }
  return null;
}