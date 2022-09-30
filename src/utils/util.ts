export type UserDomains = { [key: string]: string}

export function convertCSVtoObject(users: any[], header: boolean): UserDomains {
    const toJson: UserDomains = {}
    const sliceHeader = header ? 1 : 0
    users.slice(sliceHeader).forEach(user => {
        if (user.length < 2 ) return;
        toJson[user[0]] = user[1]
    })

    return toJson;
}