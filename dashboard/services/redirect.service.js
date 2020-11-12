import Router from 'next/router';

export async function redirectToLogin(ctx) {
    const login = 'admin/login';
    const { res } = ctx;
    if (res) {
        res.writeHead(301, { Location: login });
        res.end();
    } else {
        await Router.push(login);
    }
}

export async function redirectToIndex(server) {
    const index = '/?redirected=true';
    if (server) {
        server.writeHead(302, {
            Location: index
        });
        server.end();
    } else {
        await Router.push(index);
    }
}

export async function redirectTo(url, server) {
    if (server) {
        server.writeHead(302, {
            Location: url
        });
        server.end();
    } else {
        await Router.push(url);
    }
}
