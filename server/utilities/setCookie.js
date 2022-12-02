function setCookie(res, token) {
    let exp = new Date(Date.now() + 1000 * 3600 * 24 * 7); // 7 days
    res.cookie("token", token, {
        domain: process.env.CLIENT,
        path: "/",
        secure: true,
        expires: exp,
        sameSite: "none",
        httpOnly: true,
    });
}

export default setCookie