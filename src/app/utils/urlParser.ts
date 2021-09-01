export function parseUrl(url: string) {
    const result = url.match(/((?<protocol>\w+)\:\/\/)?((?<hostname>([\wА-Яа-яЁё\-]+\.)+[\wА-Яа-яЁё\-]+)(\:(?<port>[\d]+))?)?(?<pathName>[^#?]+)?(\?(?<queryParams>[^#]*))?(#(?<hash>.*))?/);

    const queryParamsValues: { [key: string]: string } = {};
    if (result.groups.queryParams) {
        result.groups.queryParams.split("&").filter((item) => item).forEach((item) => {
            const delimiterIdx = item.indexOf("=");
            if (delimiterIdx !== -1 && delimiterIdx !== 0) {
                queryParamsValues[decodeURIComponent(item.substring(0, delimiterIdx))] = decodeURIComponent(item.substring(delimiterIdx + 1));
            }
        })
    }

    return {
        url,
        protocol: result.groups.protocol,
        hostname: result.groups.hostname,
        port: result.groups.port,
        pathName: result.groups.pathName,
        queryParams: result.groups.queryParams || undefined,
        hash: result.groups.hash || undefined,
        pathValues: !result.groups.pathName ? [] : result.groups.pathName.split("/").filter((item) => item).map((item) => decodeURIComponent(item)),
        queryParamsValues
    }
}

export function deleteQueryParam(url: string, name: string) {
    return url.replace(new RegExp(`[?&]${name}=[^&#]*`), "");
}