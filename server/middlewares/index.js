import response from "../response";
import { parseToken } from "../jwt";
import getCookie from "../utilities/getCookie";


export function auth(req, res, next) {
    let token = getCookie("token", req);

    if (!token) {
        req.user = null;
        return response(res, "Please login first", 404);
    }
    parseToken(token)
        .then((u) => {
            req.user = {
                user_id: u.user_id,
                email: u.email,
                roles: u.roles,
            };
            next();
        })
        .catch((err) => {
            req.user = null;
            response(res, "Authorization, Please login first", 404);
        });
}
